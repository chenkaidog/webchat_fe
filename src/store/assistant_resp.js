import {storeChatRecord, getChatRecord} from '@/assets/js/content'

export default {
    namespaced: true,
    state: {
        accountId: '',
        chatList: [{
            id: "123",
            model: "文心4",
            user: "嗨",
            assistant: '嗨！你好呀，有什么我可以帮助你的吗？或者我们可以聊聊你感兴趣的话题。\n\n**但是你要先登录账号哦**',
        }],
    },
    actions: {},
    mutations: {
        // 设置当前会话的所有内容
        setChatList: (state, params) => {
            state.accountId = params.accountId
            let chatList = getChatRecord(params.accountId, params.chatId) || []
            state.chatList = chatList.filter((item) => {
                return item.assistant && item.assistant !== '...'
            })
        },

        // 用户成功发起请求后，先记录用户的请求内容
        appendUserRequest: (state, chatItem) => {
            state.chatList.push({
                id: Date.now().toString(),
                model: chatItem.selectedName,
                user: chatItem.userInput,
                assistant: '...'
            })
        },

        // 持续记录AI助手的响应
        setResponding(state, responding) {
            const n = state.chatList.length
            if (n > 0) {
                state.chatList[n - 1].assistant = responding
            }
        },

        storeResponding(state, chatId) {
            state.chatList = state.chatList.filter((item) => {
                return item.assistant && item.assistant !== '...'
            })
            storeChatRecord(state.accountId, chatId, state.chatList)
        },

        cleanupChatList(state) {
            state.chatList = []
            state.accountId = ''
        }
    },
    getters: {}
}