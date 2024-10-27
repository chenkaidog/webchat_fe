export function getModelList(accountId) {
    if (accountId) {
        return [
            {
                id: '1',
                name: 'gpt3.5',
                leftTime: 100,
            },
            {
                id: '2',
                name: 'gpt4o',
                leftTime: 50,
            }
        ]
    }

    return null
}

export function storeChatRecord(accountId, chatId, recordList) {
    localStorage.setItem(`chat_record_${accountId}_${chatId}`, JSON.stringify(recordList))
}

export function getChatRecord(accountId, chatId) {
    return JSON.parse(localStorage.getItem(`chat_record_${accountId}_${chatId}`)) || []
}

export function deleteLocalChatRecord(accountId,chatId) {
    localStorage.removeItem(`chat_record_${accountId}_${chatId}`)
}