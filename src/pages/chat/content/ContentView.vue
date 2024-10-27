<script>
import MarkdownIt from '@/pages/chat/content/MarkdownIt.vue'
import PubSub from "pubsub-js";
import {storeChatRecord, getChatRecord} from '@/assets/js/content'
import {mapMutations, mapState} from "vuex";
import {v4 as uuidv4} from "uuid";

export default {
  name: "ContentView",
  components: {
    MarkdownIt
  },
  data() {
    return {
      chatRecords: [],
      fixToBottom: true,
    }
  },

  computed: {
    ...mapState('accountInfo', {
      isLogin: state => state.isLogin,
      accountId: state => state.id,
    }),

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
    isLogin(login) {
      if (!login) {
        this.chatRecords = [];
      }
    },
  },

  methods: {
    ...mapMutations('chatRecordDirectory', ['appendChatRecord']),

    selectRecord(chatId) {
      this.chatRecords = getChatRecord(this.accountId, chatId) || []
      this.scrollToBottom()
    },

    handleAssistantRespEvent(_, respMsg) {
      // 接收持续推送
      const n = this.chatRecords.length
      if (n > 0) {
        if (respMsg === null) {
          this.appendChatRecord({
            chatId: this.currentChatId,
            accountId: this.accountId,
            msg: this.chatRecords[n - 1].assistant
          })

          storeChatRecord(this.accountId, this.currentChatId, this.chatRecords)
          return
        }
        this.chatRecords[n - 1].assistant = respMsg
        if (this.fixToBottom) {
          this.scrollToBottom()
        }
      }
    },

    handleAppendChatEvent(_, chatItem) {
      if (this.$route.params.chatId !== this.currentChatId) {
        this.$router.replace({
          name: 'chat',
          params: {chatId: this.currentChatId}
        })
      }
      // 用户成功触发一次请求
      this.chatRecords.push(chatItem)
      this.fixToBottom = true
      this.scrollToBottom()
    },

    scrollToBottom() {
      this.$nextTick(() => {
        this.$refs.contentView.scrollTop = this.$refs.contentView.scrollHeight;
      })
    }
  },

  created() {
    this.appendChatEvent = PubSub.subscribe('appendChatEvent', this.handleAppendChatEvent)
    this.assisantRespEvent = PubSub.subscribe('assistantRespEvent', this.handleAssistantRespEvent)
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.assisantRespEvent)
    PubSub.unsubscribe(this.appendChatEvent)
  },
  mounted() {
    this.selectRecord(this.currentChatId);
  },
}
</script>

<template>
  <div
      class="content-view"
      ref="contentView"
      @wheel="fixToBottom=false"
  >
    <ul class="chat-list">
      <li
          class="single-chat-li"
          v-for="record in chatRecords"
          :key="record.id"
      >
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
  align-items: center; /* 实现文本的垂直居中 */
  padding: 10px 15px;
}

.assistant-content {
  float: left;
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}

</style>