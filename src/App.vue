<template>
  <div id="app" :style="appStyle">
    <NavigatorBar class="navigator" v-show="navigatorFlag"/>
    <MainContent class="main-content"/>
  </div>
</template>

<script>
import NavigatorBar from "@/components/NavigatorBar.vue";
import MainContent from "@/components/MainContent.vue";
import {mapState} from "vuex";

export default {
  name: 'App',
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

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  position: absolute;
}

* {
  word-wrap: break-word;
  box-sizing: border-box;
  text-size-adjust: 100%;
  font-family: ui-sans-serif, -apple-system, system-ui, Segoe UI, Helvetica, Apple Color Emoji, Arial, sans-serif, Segoe UI Emoji, Segoe UI Symbol;
}

button {
  cursor: pointer; /* 鼠标悬停时显示手型光标 */
}

.navigator {
  display: flex;
  flex-direction: column;
  height: 100%; /* 填充整个屏幕高度 */
  width: 280px;
}

.main-content {
  height: 100%;
}

#app {
  display: grid;
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

</style>
