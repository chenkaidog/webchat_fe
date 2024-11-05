<script>
import {UpdatePassword, UpdatePasswordFetch} from "@/assets/js/account_info";

export default {
  name: "UpdatePassword",
  props: ['redirect'],
  data() {
    return {
      password: '',
      passwordNew: '',
      passwordConfirm: '',
      tips: '',
      waiting: false,
    }
  },
  methods: {
    cancel() {
      this.$router.back();
    },

    async updatePassword() {
      if (this.passwordNew !== this.passwordConfirm) {
        this.tips = '两次密码不一致，请重新确认'
        return
      }
      const regex = /^\S{5,64}$/;
      if (!regex.test(this.passwordNew)) {
        this.tips = '密码必须8到64位且不包含空格';
        return
      }
      if (this.password === '') {
        this.tips = '请输入当前登录密码'
        return
      }
      this.waiting = true

      try {
        const body = await UpdatePasswordFetch(
            this.password,
            this.passwordNew,
        )
        if (!body.success) {
          if (body.code === 20001) {
            this.tips = '密码错误'
          } else {
            this.tips = body.message;
          }
          return
        }


        // 修改成功，重新登录
        let pushBody = {
          path: '/login',
          query: {redirect: this.redirect}
        }
        if (this.redirect) {
          pushBody.query={redirect: this.redirect}
        }
        this.$router.push(pushBody)

      } catch (error) {
        this.tips = error.message
      } finally {
        this.waiting = false
      }
    }
  }
}
</script>

<template>
  <div class="update_password">
    <div class="update-form">

      <div class="update-row-input">
        <svg class="input-icon"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
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

      <div class="update-row-input">
        <svg class="input-icon"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <path d="M7.5 2C9.5 2 11.1 3.2 11.7
          5H21V8H18V11H15V8H11.7C11.1 9.8 9.4 11 7.5
          11C5 11 3 9 3 6.5S5 2 7.5 2M7.5 5C6.7 5 6 5.7 6 6.5S6.7
          8 7.5 8 9 7.3 9 6.5 8.3 5 7.5 5M7.5 13C9.5 13 11.1 14.2 11.7
          16H21V19H20V22H18V19H16V22H13V19H11.7C11.1 20.8 9.4 22 7.5
          22C5 22 3 20 3 17.5S5 13 7.5 13M7.5 16C6.7 16 6 16.7 6 17.5S6.7
          19 7.5 19 9 18.3 9 17.5 8.3 16 7.5 16Z"/>
        </svg>

        <input
            class="user-input"
            type="password"
            v-model="passwordNew"
            placeholder="输入新密码...">
      </div>

      <div class="update-row-input">
        <svg class="input-icon"
             xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24">
          <path d="M7.5 2C9.5 2 11.1 3.2 11.7
          5H21V8H18V11H15V8H11.7C11.1 9.8 9.4 11 7.5
          11C5 11 3 9 3 6.5S5 2 7.5 2M7.5 5C6.7 5 6 5.7 6 6.5S6.7
          8 7.5 8 9 7.3 9 6.5 8.3 5 7.5 5M7.5 13C9.5 13 11.1 14.2 11.7
          16H21V19H20V22H18V19H16V22H13V19H11.7C11.1 20.8 9.4 22 7.5
          22C5 22 3 20 3 17.5S5 13 7.5 13M7.5 16C6.7 16 6 16.7 6 17.5S6.7
          19 7.5 19 9 18.3 9 17.5 8.3 16 7.5 16Z"/>
        </svg>

        <input
            class="user-input"
            type="password"
            v-model="passwordConfirm"
            placeholder="确认新密码...">
      </div>

      <div class="tips">
        <label>{{ tips }}</label>
      </div>


      <div class="update-row-button">
        <button @click="updatePassword" :disabled="waiting">
          修改
        </button>

        <button @click="cancel" :disabled="waiting">
          取消
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.update_password {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  width: 100%;
  height: 100%;
}

.update-form {
  display: grid;
  grid-template-rows: 70px 70px 70px 20px 70px;
  border-radius: 10px;
  padding: 10px;
  border: black solid 1px;
  max-width: 90%;
  max-height: 90%;
  width: 450px;
  height: 320px;
}

.update-row-input {
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

.update-row-button {
  width: 100%;
  height: 70px;
  margin: 0;
  padding: 15px 0 10px 0;
  display: flex;
  justify-content: center;
}

.update-row-button button {
  height: 100%;
  width: 100%;
  border-radius: 5px;
  border: grey solid 1px;
  cursor: pointer;
  background-color: #f5f5f5;
  margin: 0 10px;
}

.update-row-button button:hover {
  background-color: #e0e0e0;
}

</style>