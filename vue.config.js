const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pages: {
    index: {
      entry: './src/main.js',
      template: './public/index.html',
      title: '对话机器人',
    },
    login: {
      entry: './src/pages/login/login.js',
      template: './public/login.html',
      title: '登陆'
    },
  }
})
