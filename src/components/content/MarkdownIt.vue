<script>
import {RenderMarkdown} from '@/assets/js/render.js'
import '@/assets/css/markdown-it-vue.css'

export default {
  name: "MarkdownIt",
  props: ['content'],
  data() {
    return {}
  },
  methods: {
    renderMarkdown(content) {
      return RenderMarkdown(content)
    }
  }
}
</script>

<template>
  <div >
    <div class="markdown-body" v-html="renderMarkdown(content)"/>
  </div>
</template>

<style scoped>

</style>