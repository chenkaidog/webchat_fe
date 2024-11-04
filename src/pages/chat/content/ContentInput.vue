<script>
import {StreamChatFetch} from '@/assets/js/content';
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "ContentInput",
  data() {
    return {
      userInput: '',
      signal: new AbortController(),
    }
  },

  computed: {
    ...mapState('modelInfo', ['selectedId', 'selectedName']),
    ...mapGetters('globalInfo', ['isInputting', 'isPending', 'isResponding']),
    ...mapState('assistantResp', ['chatList']),
  },

  methods: {
    ...mapActions('globalInfo', ['setStateInput', 'setStatePending', 'setStateResponding']),
    ...mapMutations('assistantResp', ['appendUserRequest', 'setResponding', 'closeResponding']),

    uploadAttachment() {
      console.log("Upload Attachment");
    },

    async sendMsg() {
      const userInput = this.userInput.trim().replaceAll('\n', '\n\n')
      if (userInput.length <= 0) {
        // 无效文本
        alert('输入内容无效')
        return
      }
      this.setStatePending();

      let respBuffer = ''
      const vueModel = this
      this.signal = new AbortController()

      const onopen = response => {
        if (response.ok) {
          vueModel.appendUserRequest({
            id: Date.now().toString(),
            model: this.selectedName,
            user: userInput,
            assistant: '...'
          })
          vueModel.setStateResponding()
          vueModel.userInput = ''
          return
        }

        if (400 <= response.status && response.status <= 500) {
          if (response.status === 400 || response.status === 404) {
            throw new Error('请求异常，请联系管理员')
          }
          if (response.status === 401) {
            throw new Error('请先登录')
          }
          if (response.status === 429) {
            const body = response.json()
            switch (body.code) {
              case 10005:
              case 30002:
                throw new Error('请求过于频繁，稍后再重试')
              case 30003:
                throw new Error('平台余额不足，请联系管理员')
            }
          }
        }

        throw new Error('网络异常，请重试')
      }
      const onmessage = msg => {
        if (!msg || !msg.data) {
          return
        }
        const data = JSON.parse(msg.data)

        if (msg.event === 'data') {
          if (data.content && data.content.length > 0) {
            respBuffer += data.content
            vueModel.setResponding(respBuffer)
          }
        } else if (msg.event === 'error') {
          throw new Error(data.content)
        }

        if (data.isEnd) {
          vueModel.signal.abort()
        }
      }
      const onerror = err => {
        throw new Error(err)
      }
      try {
        await StreamChatFetch(
            this.selectedId,
            this.chatList,
            this.userInput,
            this.signal.signal,
            onopen,
            onmessage,
            onerror
        )
      } catch (error) {
        alert(error)
      } finally {
        this.setStateInput()
        this.closeResponding()
      }
    },

    stopGenerating() {
      this.signal.abort();
      this.setStateInput();
    },
  },

  watch: {
    userInput(newText) {
      if (newText === '') {
        this.$refs.userInputArea.style.height = '35px';
        this.$refs.inputView.style.height = '50px';
        return
      }
      this.$refs.userInputArea.style.height = '35px';
      this.$refs.inputView.style.height = '50px';
      this.$refs.userInputArea.style.height = this.$refs.userInputArea.scrollHeight + 'px';
      this.$refs.inputView.style.height = this.$refs.userInputArea.scrollHeight + 15 + 'px';
    }
  }
}
</script>

<template>
  <div class="content-input" ref="inputView">
    <div class="input-body">
      <div class="attachment-div">
        <button class="control-btn" @click="uploadAttachment">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>上传附件</title>
            <path d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401
                22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614
                20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12
                16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569
                13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"/>
          </svg>
        </button>
      </div>

      <div class="input-div">
        <textarea class="input-text" placeholder="给AI发送消息(ctrl+↵)" v-model="userInput" :disabled="isPending"
                  ref="userInputArea" @keydown.ctrl.enter="sendMsg"/>
      </div>

      <div class="control-div">
        <button class="control-btn" v-show="isInputting || isPending" @click="sendMsg" :disabled="isPending">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>发送</title>
            <path
                d="M12 2C17.5 2 22 6.5 22 12C22 17.5 17.5 22 12 22C6.5 22 2 17.5 2 12C2 6.5 6.5 2 12 2ZM16 17V15H8V17H16ZM16 10L12 6L8 10H10.5V14H13.5V10H16Z"/>
          </svg>
        </button>

        <button class="control-btn" v-show="isResponding" @click="stopGenerating">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <title>停止生成</title>
            <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M9,9H15V15H9"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-input {
  min-height: 50px;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.input-body {
  display: flex;
  padding: 5px;
  margin: 0;
  border: none;
  border-radius: 20px;
  background-color: #f0f0f0;
  text-size-adjust: 100%;
  position: absolute;
  top: 0;
  bottom: 5px;
  width: 800px;
  max-width: 95%;
}

.control-btn {
  height: 35px;
  width: 35px;
  padding: 0;
  border: none;
  margin: 0 5px;
  background: none;
}

.attachment-div {
  position: absolute;
  left: 5px;
  bottom: 0;
}

.input-div {
  position: absolute;
  left: 50px;
  right: 50px;
  top: 5px;
  bottom: 5px;
  padding: 0;
  margin: 0;
  max-height: 300px;
}

.input-text {
  box-sizing: border-box;
  background: none;
  resize: none;
  border: none;
  outline: none;
  padding: 5px;
  margin: 0;
  overflow-y: auto;
  height: 35px;
  max-height: 100%;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
}

.control-div {
  position: absolute;
  right: 5px;
  bottom: 0;
}
</style>