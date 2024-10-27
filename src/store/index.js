import Vue from 'vue'
import Vuex from 'vuex'
import accountInfo from "@/store/account_info"
import modelInfo from "@/store/model_info"
import chatRecordDirectory from "@/store/chat_record"
import globalInfo from "@/store/gloabl_info"

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        accountInfo,
        modelInfo,
        globalInfo,
        chatRecordDirectory
    }
})