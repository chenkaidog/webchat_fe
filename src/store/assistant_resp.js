import {storeChatRecord, getChatRecord} from '@/assets/js/content'

export default {
    namespaced: true,
    state: {
        accountId: '',
        chatId: '',
        chatList: [],
        responding: ''
    },
    actions: {},
    mutations: {
        // 设置当前会话的所有内容
        setChatList: (state, params) => {
            state.accountId = params.accountId
            state.chatId = params.chatId
            let chatList = getChatRecord(state.accountId, state.chatId) || []
            state.chatList = chatList.filter((item) => {
                return item.assistant && item.assistant !== '...'
            })
        },

        // 用户成功发起请求后，先记录用户的请求内容
        appendUserRequest: (state, chatItem) => {
            state.chatList.push(chatItem)
            state.responding = '...'
        },

        // 持续记录AI助手的响应
        setResponding(state, responding) {
            state.responding = responding

            const n = state.chatList.length
            if (n > 0) {
                state.chatList[n - 1].assistant = responding
            }
        },

        // 结束响应
        closeResponding(state) {
            state.responding = ''
            storeChatRecord(state.accountId, state.chatId, state.chatList)
        },

        cleanupChatList(state) {
            state.chatList = []
            state.accountId = ''
            state.chatId = ''
            state.responding = ''
        }
    },
    getters: {}
}