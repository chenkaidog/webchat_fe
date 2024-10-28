import {deleteLocalChatRecord} from "@/assets/js/content";
import {initRecordList, storeRecordList} from "@/assets/js/navigator";

export default {
    namespaced: true,
    state: {
        accountId: '',
        recordList: [], // 会话记录列表，左侧菜单栏
    },
    actions: {},
    mutations: {
        setChatRecord(state, accountId) {
            state.accountId = accountId
            state.recordList = initRecordList(accountId) || []
            state.recordList.sort((a, b) => b.timestamp - a.timestamp)
        },

        deleteChatRecord(state, chatId) {
            state.recordList = state.recordList.filter((item) => {
                return item.id !== chatId
            })

            deleteLocalChatRecord( state.accountId, chatId);
            storeRecordList( state.accountId, state.recordList);
        },

        appendChatRecord(state, chatItem) {
            let extraction = chatItem.msg.trim().replaceAll('\n', ' ')
            if (extraction.length > 20) {
                extraction = extraction.substring(0, 20)
            }

            let exist = false
            state.recordList.forEach(item => {
                if (item.id === chatItem.chatId) {
                    item.latestMsg = extraction
                    item.timestamp = Date.now()
                    exist = true
                }
            })

            if (!exist) {
                state.recordList.push({
                    id: chatItem.chatId,
                    timestamp: Date.now(),
                    latestMsg: extraction,
                })
            }

            state.recordList.sort((a, b) => b.timestamp - a.timestamp)

            storeRecordList( state.accountId, state.recordList)
        },

        cleanupChatRecord(state) {
            state.recordList = []
            state.accountId = ''
        },
    },
    getters: {}
}