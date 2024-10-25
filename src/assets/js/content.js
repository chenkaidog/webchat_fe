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

export function storeChatRecord(chatId, recordList) {
    localStorage.setItem(`chat_record_${chatId}`, JSON.stringify(recordList))
}

export function getChatRecord(chatId) {
    return JSON.parse(localStorage.getItem(`chat_record_${chatId}`)) || []
}

export function deleteLocalChatRecord(chatId) {
    localStorage.removeItem(`chat_record_${chatId}`)
}