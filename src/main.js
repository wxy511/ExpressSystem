/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-23 18:41:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-16 15:10:35
 */
import 'babel-polyfill'
import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
// import ElementUI from 'element-ui'
import ElementUI, { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 加载element-ui自定义主题
import '@/styles/element-#0F6349/index.css'
import '@/styles/element-variables.scss'

// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

import i18n from './languages'
// import tinymce from 'tinymce'
// import VueTinymce from '@packy-tang/vue-tinymce'
import x2js from 'x2js'
import inputFilter from '@/utils/input'
import md5 from 'js-md5'
import 'default-passive-events'
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

/**
 * 重置message，防止重复点击重复弹出message弹框
 */
let messageInstance = null
const resetMessage = (options) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message(options)
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})

// 本地化
export function InitVue() {
  // set ElementUI lang to EN
  // Vue.use(ElementUI, { locale })
  // 如果想要中文版 element-ui，按如下方式声明
  // Vue.use(ElementUI)
  Vue.use(ElementUI, {
  //  size: Cookies.get('size') || 'medium', // set element-ui default size
    i18n: (key, value) => i18n.t(key, value)
  })
  // Vue.use(VueQuillEditor)
  // Vue.prototype.$tinymce = tinymce // 将全局tinymce对象指向给Vue作用域下
  // Vue.use(VueTinymce) // 安装vue的tinymce组件
  Vue.config.productionTip = false
  // eslint-disable-next-line
  Vue.prototype.$x2js = new x2js()
  Vue.prototype.$md5 = md5
  Vue.directive('inputFilter', inputFilter)
  Vue.prototype.$message = resetMessage
  
  new Vue({
    el: '#app',
    router: router,
    store: store,
    i18n: i18n,
    render: h => h(App)
  })
}

InitVue()
currentPage()
// getConfig().then((config) => {
//   console.log(config)
// })

/**
 * 判断页面是否隐藏
 */
function currentPage() {
  var hiddenProperty = 'hidden' in document ? 'hidden'
    : 'webkitHidden' in document ? 'webkitHidden'
      : 'mozHidden' in document ? 'mozHidden'
        : null
  var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
  var onVisibilityChange = function() {
    if (!document[hiddenProperty]) {
      store.state.app.hiddenProperty = false
    } else {
      store.state.app.hiddenProperty = true
    }
  }
  document.addEventListener(visibilityChangeEvent, onVisibilityChange)
}

// async function getConfig() {
//   return new Promise((resolve, reject) => {
//     console.log(process.env.VUE_APP_BUILD_VERSION)
//     const pathConfig = '@/custom/' + process.env.VUE_APP_BUILD_VERSION + '/js/config.js'
//     // const location_config = import (`@/custom/${process.env.VUE_APP_BUILD_VERSION}/js/config.js`)
//     const location_config = import (pathConfig)
//     location_config.then((res) => {
//       console.log(res)
//       // if (process.env.NODE_ENV === 'development') {
//       //   sys_config = res.default.test_py_config
//       // } else {
//       //   sys_config = JSON.parse(sys_config)
//       // }
//       // resolve(res.default.location_config)
//     })
//   })
// }

