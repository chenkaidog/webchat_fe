import Vue from 'vue'
import Vuex from 'vuex'
import {deleteLocalChatRecord, getModelList} from "@/assets/js/content";
import {initRecordList, storeRecordList} from "@/assets/js/navigator";

Vue.use(Vuex)

const accountInfo = {
    namespaced: true,
    state: {
        isLogin: false,
        id: '',
        name: ''
    },
    actions: {},
    mutations: {
        login(state, account) {
            state.id = account.id
            state.name = account.name
            state.isLogin = true
        },
        logout(state) {
            state.id = ''
            state.name = ''
            state.isLogin = false
        }
    },
    getters: {}
}

const modelInfo = {
    namespaced: true,
    state: {
        selectedId: '',
        selectedName: '沒有可选模型',
        modelList: []
    },
    actions: {},
    mutations: {
        selectModel(state, model) {
            state.selectedId = model.id
            state.selectedName = model.name
        },
        setModelList(state, accountId) {
            state.modelList = getModelList(accountId) || []
            if (state.modelList.length > 0) {
                state.selectedId = state.modelList[0].id
                state.selectedName = state.modelList[0].name
            }
        },
        cleanupModelList(state) {
            state.selectedId = ''
            state.selectedName = '沒有可选模型'
            state.modelList = []
        }
    },
    getters: {}
}

const chatRecordDirectory = {
    namespaced: true,
    state: {
        recordList: []
    },
    actions: {},
    mutations: {
        selectChatRecord(state, chatId) {
            state.recordList.forEach(item => {
                item.isSelected = item.id === chatId
            })
        },

        deleteChatRecord(state, userIds) {
            state.recordList = state.recordList.filter((item) => {
                if (item.id === userIds.chatId) {
                    if (item.isSelected) {
                        // todo: 创建新会话窗口
                    }

                    return false
                }

                return item.id !== userIds.chatId
            })

            deleteLocalChatRecord(userIds.chatId);
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
        }
    },
    getters: {}
}

// 0：用户编辑，1：等待回调，2：响应中
const stateInput = 0;
const statePending = 1;
const stateResponding = 2

const globalInfo = {
    namespaced: true,
    state: {
        navigatorFlag: true,
        interaction: stateInput,
    },
    actions: {
        setStateInput(context) {
            context.commit('setState', stateInput)
        },
        setStatePending(context) {
            if (context.state.interaction === stateInput) {
                return context.commit('setState', statePending);
            }
        },
        setStateResponding(context) {
            if (context.state.interaction === statePending) {
                return context.commit('setState', stateResponding)
            }
        },
        openNavigator(context) {
            context.commit('setNavigator', true)
        },
        closeNavigator(context) {
            context.commit('setNavigator', false)
        }
    },
    mutations: {
        setNavigator(state, payload) {
            state.navigatorFlag = payload
        },
        setState(state, payload) {
            state.interaction = payload
        }
    },
    getters: {
        isInputting(state) {
            return state.interaction === stateInput
        },
        isPending(state) {
            return state.interaction === statePending
        },
        isResponding(state) {
            return state.interaction === stateResponding
        }
    }
}

export default new Vuex.Store({
    modules: {
        accountInfo,
        modelInfo,
        globalInfo,
        chatRecordDirectory
    }
})