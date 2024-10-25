import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import {mapMutations, mapState} from "vuex";

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

    mounted() {
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

        initUserInfoByAccount() {
            this.setChatRecord(this.accountId)
            this.setModelList(this.accountId)
        },

        cleanupUserInfo() {
            this.cleanupChatRecord();
            this.cleanupModelList();
        }
    }
}).$mount('#app')
