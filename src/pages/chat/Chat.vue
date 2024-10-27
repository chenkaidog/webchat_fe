<script>
import NavigatorBar from "@/pages/chat/NavigatorBar.vue";
import MainContent from "@/pages/chat/MainContent.vue";
import {mapState} from "vuex";

export default {
  name: "Chat",
  components: {
    NavigatorBar,
    MainContent
  },
  computed: {
    ...mapState('globalInfo', ['navigatorFlag']),

    appStyle() {
      if (this.navigatorFlag)
        return {
          gridTemplateColumns: 'auto 1fr',
        }
      else
        return {
          gridTemplateColumns: '1fr',
        }
    }
  },
}
</script>

<template>
  <div id="chat" :style="appStyle">
    <NavigatorBar class="navigator" v-show="navigatorFlag"/>
    <MainContent class="main-content"/>
  </div>
</template>

<style scoped>
.navigator {
  display: flex;
  flex-direction: column;
  height: 100%; /* 填充整个屏幕高度 */
  width: 280px;
}

.main-content {
  height: 100%;
}

#chat {
  display: grid;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
}

</style>