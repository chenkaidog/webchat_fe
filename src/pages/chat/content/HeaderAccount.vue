<script>
import { LogoutFetch } from "@/assets/js/account_info";
import { mapMutations, mapState } from "vuex";

export default {
  name: "HeaderAccount",
  data() {
    return {
      showAccountOption: false,
    }
  },

  computed: {
    ...mapState('accountInfo', ['isLogin', 'name'])
  },

  methods: {
    ...mapMutations('accountInfo', ['logout']),

    navigate2Login() {
      // 获取当前页面的完整路径
      const currentUrl = this.$route.fullPath;
      // 编码当前 URL
      const encodedUrl = encodeURIComponent(currentUrl);
      // 跳转到登录页面，并带上编码后的当前 URL 作为参数
      this.$router.push({
        path: '/login',
        query: { redirect: encodedUrl }
      });
    },

    navigate2UpdatePassword() {
      // 获取当前页面的完整路径
      const currentUrl = this.$route.fullPath;
      // 编码当前 URL
      const encodedUrl = encodeURIComponent(currentUrl);
      // 跳转到登录页面，并带上编码后的当前 URL 作为参数
      this.$router.push({
        path: '/update_password',
        query: { redirect: encodedUrl }
      });
    },

    async accountLogout() {
      if (await LogoutFetch()) {
        return this.logout()
      }

      alert('网络异常，请重试')
    }
  }
}
</script>

<template>
  <div class="account-div">
    <button class="account-button" @click="showAccountOption = !showAccountOption">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M11.5,14C15.64,14 19,15.57 19,17.5V20H4V17.5C4,15.57 7.36,14 11.5,14M18,17.5C18,16.12 15.09,
            15 11.5,15C7.91,15 5,16.12 5,17.5V19H18V17.5M11.5,5C13.43,5 15,6.57 15,8.5C15,10.43 13.43,12 11.5,
            12C9.57,12 8,10.43 8,8.5C8,6.57 9.57,5 11.5,5M11.5,6C10.12,6 9,7.12 9,8.5C9,9.88 10.12,11 11.5,
            11C12.88,11 14,9.88 14,8.5C14,7.12 12.88,6 11.5,6Z" />
      </svg>
      <span v-if="isLogin">
        {{ name }}
      </span>
      <span v-else>
        未登录
      </span>
    </button>

    <div class="account-option-div" v-show="showAccountOption" @mouseleave="showAccountOption = false"
      @click="showAccountOption = false">
      <button class="account-option-button" v-show="!isLogin" @click.prevent="navigate2Login">
        登陆
      </button>

      <span class="opt-account-name" v-show="isLogin">
        {{ name }}
        <hr />
      </span>

      <button class="account-option-button" v-show="isLogin" @click.prevent="navigate2UpdatePassword">
        修改密码
      </button>
      <button class="account-option-button" v-show="isLogin" @click="accountLogout">
        登出
      </button>
    </div>
  </div>
</template>

<style scoped>
.account-button {
  height: 40px;
  margin: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  border-radius: 15px;
}

.account-button:hover {
  background-color: #e0e0e0;
}

.account-button span {
  font-size: 18px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
}

.account-button svg {
  height: 25px;
  width: 25px;
}

.account-option-div {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45px;
  right: 0;
  min-width: 120px;
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}

.account-option-button {
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  margin: 0;
  padding: 5px;
}

.account-option-button:hover {
  background-color: #e0e0e0;
}

.opt-account-name {
  font-size: 12px;
  text-align: center;
  margin: 0;
  padding: 0;
}
</style>