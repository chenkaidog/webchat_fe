<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "HeaderModel",
  data() {
    return {
      showModelOptList: false,
    }
  },
  computed: {
    ...mapState('modelInfo', ['modelList', 'selectedId', 'selectedName'])
  },
  methods: {
    ...mapMutations('modelInfo', ['selectModel']),
  },
}
</script>

<template>
  <div class="select-div">
    <div class="model-selector-div">
      <button class="model-selector-button" @click="showModelOptList = !showModelOptList">
        <svg class="robot-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M17.5 15.5C17.5 16.61 16.61 17.5 15.5 17.5S13.5 16.61 13.5 15.5 14.4 13.5 15.5 13.5 17.5 14.4 17.5
              15.5M8.5 13.5C7.4 13.5 6.5 14.4 6.5 15.5S7.4 17.5 8.5 17.5 10.5 16.61 10.5 15.5 9.61 13.5 8.5 13.5M23
              15V18C23 18.55 22.55 19 22 19H21V20C21 21.11 20.11 22 19 22H5C3.9 22 3 21.11 3 20V19H2C1.45 19 1 18.55 1
              18V15C1 14.45 1.45 14 2 14H3C3 10.13 6.13 7 10 7H11V5.73C10.4 5.39 10 4.74 10 4C10 2.9 10.9 2 12 2S14 2.9
              14 4C14 4.74 13.6 5.39 13 5.73V7H14C17.87 7 21 10.13 21 14H22C22.55 14 23 14.45 23 15M21 16H19V14C19 11.24
              16.76 9 14 9H10C7.24 9 5 11.24 5 14V16H3V17H5V20H19V17H21V16Z" />
        </svg>
        <span>
          {{ selectedName }}
        </span>
        <svg class="option-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
        </svg>
      </button>
    </div>

    <div class="model-option-div" v-show="showModelOptList" @mouseleave="showModelOptList = false"
      @click="showModelOptList = false">
      <button class="model-btn" v-for="model in modelList" :key="model.id" @click="selectModel(model)">
        {{ model.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.robot-svg {
  height: 25px;
  width: 25px;
}

.option-svg {
  height: 20px;
  width: 20px;
}

.model-selector-button {
  height: 40px;
  margin: 0;
  padding: 0 10px;
  display: flex;
  align-items: center;
  background: none;
  border: none;
  outline: none;
  border-radius: 15px;
}

.model-selector-button:hover {
  background-color: #e0e0e0;
}

.model-selector-button span {
  font-size: 18px;
  max-width: 100px;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 10px;
}

.model-option-div {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 45px;
  left: 0;
  width: 100%;
  padding: 10px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 15px;
}

.model-btn {
  border: none;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  margin: 0;
  padding: 5px;
}

.model-btn:hover {
  background-color: #e0e0e0;
}
</style>