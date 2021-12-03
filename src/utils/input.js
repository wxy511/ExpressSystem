/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2021-03-02 15:28:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-17 18:00:34
 */

const addListener = function(el, type, fn) {
  el.addEventListener(type, fn, false)
}
  
// const debounce = (fn, delay) => {
//   // eslint-disable-next-line
//   var delay = delay || 10
//   var timer
//   return function() {
//     var th = this
//     var args = arguments
//     if (timer) {
//       clearTimeout(timer)
//     }
//     timer = setTimeout(function() {
//       // timer = null
//       fn.apply(th, args)
//     }, delay)
//   }
// }
  
// 通用限制
// const commonFilter = function(el) {
//   console.log(el)

//   // el.value = el.value.replace(/[`~!#$^*=|':;',\\\[\]\<>\/?~！#￥……&*|【】'；：""'。，、？]/g, '')
//   // console.log(el.value)
//   addListener(el, 'input', debounce(() => { // 添加防抖 防止反复触发事件导致内存溢出
//     const valueInput = el.value
//     console.log(valueInput, 1111)
//     // el.value = el.value.replace(/[`~!#$^*=|':;',\\\[\]\<>\/?~！#￥……&*|【】'；：""'。，、？]/g, '') || null
//     // if (isNaN(el.value)) {
//     //   el.value = valueInput
//     // }
//     // 触发input事件
//     el.dispatchEvent(new Event('input'))
//   }))
// }

const commonFilter = function(el) {
  addListener(el, 'blur', () => {
    el.value = el.value.replace(/[`~!#$^*=|':;',\\\[\]\<>\/?~！#￥……&*|【】'；：""'。，、？]/g, '')
    //  触发input事件
    el.dispatchEvent(new Event('input'))
  })
}

// 密码限制
const passwordFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[%\\\[\]\<>\/]/g, '')
    // el.dispatchEvent(new Event('input'))
  })
}

// 短信模板限制
const SMSFilter = function(el) {
  addListener(el, 'blur', () => {
    el.value = el.value.replace(/[%\\\[\]\<>\/]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

// 证件号限制
const IDFilter = function(el) {
  addListener(el, 'blur', () => {
    el.value = el.value.replace(/[^\w\.\/]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

// 限制名称
const nameFilter = function(el) {
  addListener(el, 'blur', () => {
    // el.value = el.value.replace(/[`~!#$^&*()=|{}':;',\\\[\]\<>\/?~！#￥……&*（）——|{}【】'；：""'。，、？+]/g, '')
  })
}

// 限制邮箱
const emailFilter = function(el) {
  addListener(el, 'input', () => {
    el.value = el.value.replace(/[`~!#$^&*()=|{}':;',\\\[\]\<>\/?~！#￥……&*（）——|{}【】'；：""'。，、？+]/g, '')
    // el.dispatchEvent(new Event('input'))
  })
}
  
// 限制只能输入整数和小数 IP
const priceFilter = function(el) {
//   addListener(el, 'input', debounce(() => { // 添加防抖 防止反复触发事件导致内存溢出
//     el.value = (el.value.match(/^\d*(\.?\d{0,2})/g)[0]) || null
//     if (isNaN(el.value)) {
//       el.value = ''
//     }
//     // 触发input事件
//     el.dispatchEvent(new Event('input'))
//   }))
  addListener(el, 'blur', () => {
    el.value = el.value.replace(/[^\d.]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}

// 限制只能数字
const numFilter = function(el) {
  addListener(el, 'blur', () => {
    el.value = el.value.replace(/[^\d]/g, '')
    el.dispatchEvent(new Event('input'))
  })
}
  
export default {
  bind(el, binding) {
    if (el.tagName.toLowerCase() !== 'input') {
      el = el.getElementsByTagName('input')[0]
    }
    switch (binding.arg) {
      case 'price':
        priceFilter(el)
        break
      case 'common':
        commonFilter(el)
        break
      case 'num':
        numFilter(el)
        break
      case 'name':
        nameFilter(el)
        break
      case 'email':
        emailFilter(el)
        break
      case 'pwd':
        passwordFilter(el)
        break
      case 'sms':
        SMSFilter(el)
        break
      case 'id':
        IDFilter(el)
        break
      default:
        console.warn('未知指令类型', binding.arg)
        break
    }
  }
}
