import VueRouter from 'vue-router'
import Chat from "@/pages/chat/Chat";
import Login from "@/pages/login/Login";
import UpdatePassword from "@/pages/update_password/UpdatePassword";

export default new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/login',
            component: Login,
            meta: { title: '登录' },
            props({query: {redirect}}) {
                return {redirect}
            }
        },
        {
            path: '/update_password',
            component: UpdatePassword,
            meta: { title: '修改密码' },
            props({query: {redirect}}) {
                return {redirect}
            }
        },
        {
            path: '/',
            alias: '/chat',
            component: Chat,
            meta: { title: '首页' }
        },
        {
            name: 'chat',
            path: '/chat/:chatId',
            component: Chat,
            meta: { title: '首页' }
        },
    ]
})