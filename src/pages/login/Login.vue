<script>
import {mapMutations, mapState} from "vuex";

export default {
  name: "Login",
  props: ['redirect'],
  data() {
    return {
      username: '',
      password: '',
      tips: ''
    }
  },

  watch: {
    username(newUsername) {
      if (newUsername === '') {
        this.password = '';
        this.tips = '';
      }
    },
    isLogin(login) {
      if (login) {
        this.$router.push('/')
      }
    }
  },

  computed: {
    ...mapState('accountInfo', ['isLogin'])
  },

  mounted() {
    if (this.isLogin) {
      this.$router.push('/')
    }
  },

  methods: {
    ...mapMutations('accountInfo', ['login']),

    accountLogin() {
      if (this.username === 'test_account' && this.password === '123456') {
        this.login({
          id: 'test_account_id',
          name: 'test_account'
        })

        if (this.redirect) {
          this.$router.push(decodeURIComponent(this.redirect))
        } else {
          this.$router.push('/')
        }

        return
      }

      this.tips = '账号或密码错误，请重新检查'
    },

    register() {
      alert('功能未开发')
    }
  },
}
</script>

<template>
  <div id="login">
    <div class="login-form">
      <div class="login-row-input">
        <svg class="input-icon"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 22 22">
          <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,
          8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,
          18V20H4V18C4,15.79 7.58,14 12,14Z"/>
        </svg>

        <input
            class="user-input"
            type="text"
            v-model="username"
            placeholder="输入账号...">
      </div>

      <div class="login-row-input">
        <svg class="input-icon"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 22 22">
          <path d="M7 14C5.9 14 5 13.1 5 12S5.9 10 7 10 9 10.9 9 12 8.1 14 7
          14M12.6 10C11.8 7.7 9.6 6 7 6C3.7 6 1 8.7 1 12S3.7
          18 7 18C9.6 18 11.8 16.3 12.6 14H16V18H20V14H23V10H12.6Z"/>
        </svg>

        <input
            class="user-input"
            type="password"
            v-model="password"
            placeholder="输入密码...">
      </div>

      <div class="tips">
        <label>{{ tips }}</label>
      </div>

      <div class="login-row-button">
        <span>
          <button @click="accountLogin()">
            登录
          </button>
        </span>

        <span>
          <button @click="register()">
            注册
          </button>
        </span>

        <span class="forget-password">
          <label>
            <a href="https://www.baidu.com">忘记密码?</a>
          </label>
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.login-form {
  display: grid;
  grid-template-rows: 70px 70px 20px 70px;
  border-radius: 10px;
  padding: 10px;
  border: black solid 1px;
  max-width: 90%;
  max-height: 90%;
  width: 450px;
  height: 250px;
}

.login-row-input {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  padding: 5px;
  margin: 5px 0;
}

.input-icon {
  height: 50px;
  width: 50px;
  margin: 0 5px;
  padding: 0;
}

.user-input {
  height: 50px;
  width: 100%;
  margin: 0 5px;
  padding: 0 10px;
  border-radius: 5px;
  border: gray solid 1px;
  line-height: 40px;
  font-size: 16px;
}

.tips {
  padding: 0 10px;
  height: 100%;
}

.tips label {
  height: 100%;
  float: right;
  font-size: 12px;
  color: orangered;
  font-weight: bold;
}

.login-row-button {
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 15px 10px 10px 10px;
  display: grid;
  grid-template-columns: 40% 40% 20%;
}

.login-row-button button {
  height: 100%;
  width: 80%;
  border-radius: 5px;
  border: grey solid 1px;
  cursor: pointer;
  background-color: #f5f5f5;
}

.login-row-button button:hover {
  background-color: #e0e0e0;
}

.forget-password {
  justify-content: center;
  align-items: center;
}

.forget-password label {
  font-size: 12px;
  float: right;
}

</style>