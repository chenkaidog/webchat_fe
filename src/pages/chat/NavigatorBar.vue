<script>
import RecordItem from "@/pages/chat/navigator/RecordItem.vue";
import NavHeader from "@/pages/chat/navigator/NavHeader.vue";
import {mapState} from "vuex";

export default {
  name: "NavigatorBar",
  components: {NavHeader, RecordItem},
  computed: {
    ...mapState('chatRecordDirectory', ['recordList'])
  },
}
</script>

<template>
  <div>
    <NavHeader/>

    <div class="nav-record-list">
      <RecordItem
          v-for="record in recordList"
          :key="record.id"
          :record="record"
      />
    </div>
  </div>
</template>

<style scoped>
.nav-record-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  margin: 0;
  background-color: #f5f5f5;
  border: none;
}

</style>