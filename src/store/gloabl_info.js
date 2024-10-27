// 0：用户编辑，1：等待回调，2：响应中
const stateInput = 0;
const statePending = 1;
const stateResponding = 2

export default  {
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