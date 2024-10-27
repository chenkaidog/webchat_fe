import VueRouter from 'vue-router'
import Chat from "@/pages/chat/Chat";
import Login from "@/pages/login/Login";

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: Login,
            props({query: {redirect}}) {
                return {redirect}
            }
        },
        {
            path: '/',
            alias: '/chat',
            component: Chat
        },
        {
            name: 'chat',
            path: '/chat/:chatId',
            component: Chat,
        },
    ]
})