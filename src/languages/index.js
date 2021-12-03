/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-23 18:41:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-01 18:31:44
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLocale from './en'
import cnLocale from './zh-CN'
import Cookies from 'js-cookie'
var Base64 = require('js-base64').Base64
// import reportzhCN from 'vxe-table/lib/locale/lang/zh-CN'
// import reportenUS from 'vxe-table/lib/locale/lang/en-US'
Vue.use(VueI18n)
/* eslint-disable */
if (process.env.NODE_ENV === 'production') {
  g_lng = JSON.parse(Base64.decode(g_lng))
  var enLocale_py = g_lng['en']
  var zhLocale_py = g_lng['zh']
}
const messages = {
  en: {
    ...(enLocale_py||enLocale),
    ...elementEnLocale
    // ...reportenUS
  },
  'zh-CN': {
    ...(zhLocale_py||cnLocale),
    ...elementZhLocale
    // ...reportzhCN
  }
}
export function getLanguage() {
  let curLanguage = Cookies.get('language')
  if (!curLanguage) { curLanguage = localStorage.getItem('language') }
  if (curLanguage) return curLanguage

  // if has not choose language
  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (let locale of locales) {
    if (language.indexOf(locale) > -1) {
      if (locale === 'zh-cn') {
        locale = 'zh-CN'
      }
      return locale
    }
  }
  return 'en'
}
const i18n = new VueI18n({
  // set locale
  // options: en | cn
  locale: getLanguage(),
  // set locale messages
  messages,
  silentTranslationWarn: true
})
export default i18n
