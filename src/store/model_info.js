import {ModelListFetch} from "@/assets/js/content";

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
        setModelList(state) {
            ModelListFetch()
                .then(body => {
                    if (!body.success) {
                        state.modelList = []
                        return alert(body.message)
                    }

                    state.modelList = body.data.models || []
                    if (state.modelList.length > 0) {
                        state.selectedId = state.modelList[0].id
                        state.selectedName = state.modelList[0].name
                    }
                })
                .catch(error => {
                    state.modelList = []
                    alert(error.message)
                })
        },

        cleanupModelList(state) {
            state.selectedId = ''
            state.selectedName = '沒有可选模型'
            state.modelList = []
        }
    },
    getters: {}
}