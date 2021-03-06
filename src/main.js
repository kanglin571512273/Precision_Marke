// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import 'ant-design-vue/dist/antd.css'
import router from './router'
// 引入css
import "./assets/css/reset.css";
// 移动端适配
import 'amfe-flexible/index.js'
// 引入iconfont
import "./assets/iconfont/iconfont.css"

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
