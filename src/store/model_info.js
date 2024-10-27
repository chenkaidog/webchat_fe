import {getModelList} from "@/assets/js/content";

export default {
    namespaced: true,
    state: {
        selectedId: '',
        selectedName: '选择模型',
        modelList: [
            {
                name: '文心一言'
            },
            {
                name: '通义千问'
            }
        ]
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