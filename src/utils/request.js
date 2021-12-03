/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 16:46:47
 */
import axios from 'axios'
import {
  MessageBox,
  Message
} from 'element-ui'
import store from '@/store'
import {
  getToken
} from '@/utils/auth'
import i18n from '@/languages'

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

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // '/api',  // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

var aes_key = null
// request interceptor
service.interceptors.request.use(

  config => {
    // do something before request is sent
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['_V494344'] = getToken()
    }
    if (!aes_key) {
      // eslint-disable-next-line
      aes_key = process.env.NODE_ENV === 'development' ? CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_KEY) : CryptoJS.enc.Utf8.parse(ACCESS_TOKEN)
    }
    config.method = config.method.toUpperCase()
    if (config.method === 'POST') {
      // console.log("config是", config)
      if (typeof (config.data) === 'undefined') {
        config.data = ''
        config.data = JSON.stringify({})
      } else if (typeof (config.data) === 'object') {
        config.data = JSON.stringify(config.data)
      }
      // config.data = code_aes(config.data)
      // config.url = config.url + getSign(config.data || {})
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error, 'request') // for debug
    return Promise.reject(error)

  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // eslint-disable-next-line
    let res = response.data
    if (response.config.method === 'post' || response.config.method === 'POST') {
      //res = decode_aes(response.data) ////111
      // console.log("服务器response是", response)
    }
    if (res.error !== 0) {
      // Message({
      //   message: res.message || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      // console.log(res.error, 'response')
      switch (res.error) {
        case 500: {
          MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          })
          break
        }
        case 2: {
          resetMessage({
            message: i18n.t('Error.FailedConnectSQL'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 3: {
          resetMessage({
            message: i18n.t('Error.FailedOperateSQL'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 5: {
          resetMessage({
            message: i18n.t('Error.VisitorBlack'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 6: {
          resetMessage({
            message: i18n.t('Error.HostBlack'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 7: {
          resetMessage({
            message: i18n.t('Error.NoRecord'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 10: {
          resetMessage({
            message: i18n.t('Error.ErrorDataFormat'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 13: {
          resetMessage({
            message: i18n.t('Error.AlreadyExists'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 18: {
          resetMessage({
            message: i18n.t('Error.VisitorNoSignin'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 30: {
          resetMessage({
            message: i18n.t('Error.InvalidData'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        case 39: {
          resetMessage({
            message: i18n.t('Error.AlreadyExistsDefault'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          break
        }
        // 20210305 增加密码错误次数过多
        case 140: {
          resetMessage({
            message: i18n.t('Error.InputPswTooMany'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          break
        }
        // 20210304 增加python踢出类型
        case 1099: {
          resetMessage({
            message: i18n.t('Error.InvalidData'),
            type: 'error',
            center: true,
            duration: 5 * 1000
          })
          // store.dispatch('user/resetToken').then(() => {
          //   location.reload()
          // })
          break
        }

        default: {
          return res
        }
      }
    } else {
      return res
    }
  },
  error => {
    console.log('err1  ' + error) // for debug
    resetMessage({
      message: error.message,
      center: true,
      type: 'error'
    })
    return Promise.reject(error)
  }
)
// const CryptoJS = require('crypto-js')
/* eslint-disable */
function getSign(data) {
  if (process.env.NODE_ENV === 'development') {
    var aes_key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_AES_KEY) // ACCESS_TOKEN +fvyy-c0n*2j_$_9
  } else {
    var aes_key = CryptoJS.enc.Utf8.parse(ACCESS_TOKEN) // ACCESS_TOKEN
  }
  var timestamp = new Date().getTime()
  var bodydata = data + '.' + String(timestamp)
  bodydata = CryptoJS.enc.Utf8.parse(bodydata)
  var encrypted = CryptoJS.AES.encrypt(bodydata, aes_key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext.toString()
  // console.log(ACCESS_TOKEN)
  var sha256 = CryptoJS.SHA256(encrypted).toString()
  return '?timestamp=' + String(timestamp) + '&sign=' + sha256.toLowerCase()
}

function code_aes(data) {
  return CryptoJS.AES.encrypt(data, aes_key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  }).ciphertext.toString()
}

function decode_aes(data) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(data);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decodedata = CryptoJS.AES.decrypt(srcs, aes_key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  decodedata = decodedata.toString(CryptoJS.enc.Utf8)

  return JSON.parse(decodedata)
}

export default service
