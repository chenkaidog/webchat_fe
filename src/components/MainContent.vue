<script>
import ContentHeader from "./content/ContentHeader.vue";
import ContentView from "./content/ContentView.vue";
import ContentInput from "./content/ContentInput.vue";

export default {
  name: "MainContent",
  components: {ContentInput, ContentView, ContentHeader}
}
</script>

<template>
  <div class="main-content" >
    <ContentHeader class="content-header"/>
    <ContentView class="content-view"/>
    <ContentInput class="content-input"/>
  </div>
</template>

<style scoped>
.main-content {
  display: grid;
  grid-template-rows: 60px 1fr auto; /* 第一行内容高度自适应，第二行填充剩余空间，第三行为footer */
  grid-template-columns: 1fr; /* 仅有一列 */
  height: 100vh;
  width: 100%;
  position: relative;
}

.content-header {
  border: none;
  padding: 10px;
  width: 100%;
  height: 60px;
  display: flex;
  z-index: 2;
}

.content-view {
  flex: 1;
  width: 100%;
  z-index: 1;
}

.content-input {
  width: 100%;
}

</style>