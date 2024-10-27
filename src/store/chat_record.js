import {deleteLocalChatRecord} from "@/assets/js/content";
import {initRecordList, storeRecordList} from "@/assets/js/navigator";

export default {
    namespaced: true,
    state: {
        recordList: [], // 会话记录列表，左侧菜单栏
    },
    actions: {},
    mutations: {
        deleteChatRecord(state, userIds) {
            state.recordList = state.recordList.filter((item) => {
                return item.id !== userIds.chatId
            })

            deleteLocalChatRecord(userIds.accountId, userIds.chatId);
            storeRecordList(userIds.accountId, state.recordList);
        },

        setChatRecord(state, accountId) {
            state.recordList = initRecordList(accountId) || []
            state.recordList.sort((a, b) => b.timestamp - a.timestamp)
            state.recordList.forEach(item => {
                item.isSelected = false
            })
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
                    item.isSelected = true
                    item.timestamp = Date.now()
                    exist = true
                } else {
                    item.isSelected = false
                }
            })

            if (!exist) {
                state.recordList.push({
                    id: chatItem.chatId,
                    timestamp: Date.now(),
                    latestMsg: extraction,
                    isSelected: true,
                })
            }

            state.recordList.sort((a, b) => b.timestamp - a.timestamp)

            storeRecordList(chatItem.accountId, state.recordList)
        },

        cleanupChatRecord(state) {
            state.recordList = []
        },
    },
    getters: {}
}