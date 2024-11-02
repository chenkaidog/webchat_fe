import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import { mapMutations, mapState } from "vuex";
import { GetAccountInfoFetch } from './assets/js/account_info'

Vue.config.productionTip = false
Vue.use(VueRouter)

new Vue({
    render: h => h(App),
    store,
    router,

    computed: {
        ...mapState('accountInfo', {
            isLogin: state => state.isLogin,
            accountId: state => state.id,
        })
    },

    async mounted() {
        try {
            const body = await GetAccountInfoFetch()
            if (body) {
                if (body.success) {
                    return this.login({
                        id: body.data.account_id,
                        name: body.data.username,
                    })
                }

                throw new Error(body.message)
            }
        } catch (error) {
            alert(error);
        }

        if (this.isLogin) {
            return this.initUserInfoByAccount()
        }
    },

    watch: {
        isLogin(login) {
            if (login) {
                return this.initUserInfoByAccount()
            }

            return this.cleanupUserInfo()
        },
    },

    methods: {
        ...mapMutations('chatRecordDirectory', ['setChatRecord', 'cleanupChatRecord']),
        ...mapMutations('modelInfo', ['setModelList', 'cleanupModelList']),
        ...mapMutations('assistantResp', ['cleanupChatList']),
        ...mapMutations('accountInfo', ['login']),

        initUserInfoByAccount() {
            this.setChatRecord(this.accountId)
            this.setModelList()
        },

        cleanupUserInfo() {
            this.cleanupChatRecord();
            this.cleanupModelList();
            this.cleanupChatList();
            localStorage.clear();
        }
    }
}).$mount('#app')
