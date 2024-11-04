import {GetCsrfToken} from "./account_info"
import {fetchEventSource} from '@microsoft/fetch-event-source';

export async function ModelListFetch() {
    const response = await fetch('/api/v1/model/list', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Csrf-Token': GetCsrfToken(),
        }
    })

    if (!response.ok) {
        if (response.status === 401) {
            return [];
        }
        if (response.status === 429) {
            throw new Error('请求过于频繁，稍后再重试')
        }

        throw new Error('网络异常，请刷新模型列表');
    }

    return await response.json()
}

export function storeChatRecord(accountId, chatId, recordList) {
    localStorage.setItem(`chat_record_${accountId}_${chatId}`, JSON.stringify(recordList))
}

export function getChatRecord(accountId, chatId) {
    return JSON.parse(localStorage.getItem(`chat_record_${accountId}_${chatId}`)) || []
}

export function deleteLocalChatRecord(accountId, chatId) {
    localStorage.removeItem(`chat_record_${accountId}_${chatId}`)
}

export function StreamChatFetch(
    model, contents, latestMsg, stopSignal,
    onOpenHandler,
    onMessageHandler,
    onErrorHandler,
) {
    let streamChatReq = parseStreamChatReq(model, contents, latestMsg)

    return fetchEventSource(
        '/api/v1/chat/stream',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Csrf-Token': GetCsrfToken(),
            },
            body: JSON.stringify(streamChatReq),

            signal: stopSignal,
            onopen: onOpenHandler,
            onmessage: onMessageHandler,
            onerror: onErrorHandler
        },
    )
}

function parseStreamChatReq(model, contents, latestMsg) {
    if (latestMsg.length > 10000) {
        throw new Error('文本长度不能大于10000字')
    }

    let streamChatReq = {
        "model_id": model,
        "messages": [],
    }
    for (let index = 0; index < contents.length; index++) {
        const assistantResp = contents[index].assistant
        if (assistantResp.length > 10) {
            streamChatReq.messages.push(
                {
                    role: "user",
                    content: contents[index].user,
                },
                {
                    role: "assistant",
                    content: contents[index].assistant,
                }
            )
        }
    }

    while (streamChatReq.messages.length > 10) {
        streamChatReq.messages.shift()
    }

    streamChatReq.messages.push({
        role: "user",
        content: latestMsg,
    })

    return streamChatReq
}