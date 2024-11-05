import {ClearCsrfToken} from "@/assets/js/account_info";

export default {
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
            ClearCsrfToken()
        }
    },
    getters: {}
}