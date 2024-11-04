<script>
import MarkdownIt from '@/pages/chat/content/MarkdownIt'
import {mapMutations, mapState} from "vuex";
import {v4 as uuidv4} from "uuid";
import PubSub from "pubsub-js";

export default {
  name: "ContentView",
  components: {
    MarkdownIt
  },
  data() {
    return {
      fixToBottom: true,
    }
  },

  computed: {
    ...mapState('accountInfo', {accountId: state => state.id}),
    ...mapState('assistantResp', ['chatList']),

    currentChatId() {
      let chatId = this.$route.params.chatId;
      if (chatId) {
        return chatId
      }

      return uuidv4();
    }
  },

  watch: {
    currentChatId(newId) {
      this.selectRecord(newId)
    },

    chatList() {
      // 收到用户请求
      this.fixToBottom = true
      this.scrollToBottom()
      if (this.$route.params.chatId !== this.currentChatId) {
        this.$router.replace({
          name: 'chat',
          params: {chatId: this.currentChatId}
        })
      }
    },
  },

  methods: {
    ...mapState('modelInfo', ['selectedName']),
    ...mapMutations('chatRecordDirectory', ['appendChatRecord']),
    ...mapMutations('assistantResp', ['appendUserRequest', 'setChatList', 'setResponding', 'storeResponding']),

    selectRecord(chatId) {
      this.setChatList(
          {
            accountId: this.accountId,
            chatId: chatId
          }
      )
      this.scrollToBottom()
    },

    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.contentView.scrollTop = this.$refs.contentView.scrollHeight;
      })
    }
  },

  created() {
    this.pubId = PubSub.subscribe('assistant_responding', (_, responding) => {
      if (responding.isUserRequest) {
        return this.appendUserRequest({
              selectedName: this.selectedName,
              userInput: responding.userInput,
            }
        )
      }

      if (responding.isEnd) {
        // 响应被关闭
        const n = this.chatList.length
        if (n > 0 && this.chatList[n - 1].assistant !== '...') {
          this.appendChatRecord({
            chatId: this.currentChatId,
            msg: this.chatList[n - 1].assistant
          })

          this.storeResponding()
        }

        return
      }

      this.setResponding(responding.content)

      // 持续接收响应
      if (this.fixToBottom) {
        this.scrollToBottom();
      }
    })
  },

  beforeDestroy() {
    PubSub.unsubscribe(this.pubId)
  }
}
</script>

<template>
  <div class="content-view" ref="contentView" @wheel="fixToBottom = false">
    <ul class="chat-list">
      <li class="single-chat-li" v-for="record in chatList" :key="record.id">
        <div class="content">
          <MarkdownIt class="user-content" :content="record.user"/>
        </div>

        <div class="content">
          <p class="assistant-model" v-text="record.model"/>
          <MarkdownIt class="assistant-content" :content="record.assistant"/>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.content-view {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.content-view * {
  max-width: 100%;
}

.chat-list {
  height: 100%;
  margin: 0;
  padding: 0 10px;
  width: 800px;
  max-width: 95%;
}

.single-chat-li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 10px 0;
}

.content {
  padding: 0;
  margin: 0;
}

.user-content {
  float: right;
  border-radius: 20px;
  border: none;
  background-color: #f0f0f0;
  text-size-adjust: 100%;
  display: flex;
  align-items: center;
  /* 实现文本的垂直居中 */
  padding: 10px 15px;
}

.assistant-content {
  float: left;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}
</style>