// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
// 计算根元素的字体大小
import 'amfe-flexible/index.js'

// 安装全局组件
import CustomComponent from './components'

Vue.use(CustomComponent, {})

// 设置 js中可以访问 $cdn
import { $cdn } from '@config'
Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'
Vue.config.productionTip = false

// 处理点击事件延迟300ms问题
FastClick.attach(document.body)

// 开发环境下面使用vConsole进行调试
if (process.env.NODE_ENV === 'development') {
  const VConsole = require('vconsole')
  new VConsole()
}

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
