<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
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

</style>
