<script>
import {mapGetters, mapMutations, mapState} from "vuex";

export default {
  name: "RecordItem",
  props: ['record'],
  data() {
    return {
      showRecordOptionBtn: false,
      showRecordOptionList: false,
    }
  },

  computed: {
    ...mapGetters('globalInfo', ['isInputting']),
    ...mapState('accountInfo', {
      accountId: state => state.id,
    }),

    isSelected() {
      return this.$route.params.chatId === this.record.id
    },

    selectedStyle() {
      return {backgroundColor: this.isSelected ? '#e0e0e0' : '#f5f5f5'}
    }
  },

  methods: {
    ...mapMutations('chatRecordDirectory', ['deleteChatRecord']),

    formDate(timestamp) {
      const date = new Date(timestamp);
      const recordDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      const today = new Date();
      const todayDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`

      if (recordDate === todayDate) {
        return '今天'
      }
      return recordDate;
    },

    selectRecord(id) {
      if (this.isInputting && !this.isSelected) {
        this.$router.push({
          name: 'chat',
          params: {
            chatId: id,
          }
        });
      }
    },

    deleteRecord(id) {
      if (this.isInputting && confirm('删除后不可恢复！')) {
        this.deleteChatRecord({
          chatId: id,
          accountId: this.accountId
        })

        if (this.isSelected) {
          this.$router.push('/');
        }
      }
    }
  },
}
</script>

<template>
  <li class="record-item" @mouseleave="showRecordOptionList=false">
    <div class="record-date-div">
      <strong>{{ formDate(record.timestamp) }}</strong>
    </div>

    <div
        class="record-content-div"
        @mouseover="showRecordOptionBtn=true"
        @mouseout="showRecordOptionBtn=false"
        @click="selectRecord(record.id)"
        :style="selectedStyle"
    >
      <span class="record-msg">
        {{ record.latestMsg }}
      </span>
      <button
          class="record-opt-btn"
          v-show="showRecordOptionBtn"
          @click.stop="showRecordOptionList=true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>选项</title>
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/>
        </svg>
      </button>
    </div>
    <div
        class="record-opt-div"
        v-show="showRecordOptionList"
    >
      <span class="record-opt-span">
        <button
            @click="deleteRecord(record.id)"
            style="color: red"
        >
          删除
        </button>
      </span>
    </div>

  </li>
</template>

<style scoped>
.record-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  padding: 5px 0;
}

.record-date-div {
  height: 18px;
  margin: 5px 0;
}

.record-content-div {
  box-sizing: border-box;
  display: flex;
  height: 45px;
  width: 260px;
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

.record-content-div:hover {
  background-color: #e0e0e0 !important;
}

.record-msg {
  height: 35px;
  width: 240px;
  overflow: hidden; /* 超出部分隐藏 */
  text-align: left; /* 文本向左对齐 */
  display: flex;
  align-items: center; /* 实现文本的垂直居中 */
}

.record-opt-btn {
  height: 33px;
  width: 33px;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
}

.record-opt-div {
  width: 260px;
  border: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 5px 0;
}

.record-opt-span {
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  border: none;
  padding: 3px;
  width: 80px;
  background-color: white;
}

.record-opt-span button {
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  margin: 5px;
  padding: 5px;
}

.record-opt-span button:hover {
  background-color: #e0e0e0;
}

</style>