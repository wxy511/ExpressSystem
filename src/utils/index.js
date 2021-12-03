/**
 * Created by PanJiaChen on 16/11/18.
 */
import store from '@/store'
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string')) {
      if ((/^[0-9]+$/.test(time))) {
        // support "1548221490638"
        time = parseInt(time)
      } else {
        // support safari
        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

export function generateTitle(title) {
  const hasKey = this.$te('Route.' + title)

  if (hasKey) {
    // $t :this method from vue-i18n, inject in @/lang/index.js
    const translatedTitle = this.$t('Route.' + title)

    return translatedTitle
  }
  return title
}

/**
 * 获取当天的时间，YYYY-MM-DD
 */
export function getNowFormatDate() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate

  return currentdate
}
/**
 * 获取当天时间 精确到min
 * @returns 
 */
export function getNowFormatDateMin() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let strHour = date.getHours()
  let strMinute = date.getMinutes()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = '0' + strHour
  }
  if (strMinute >= 0 && strMinute <= 9) {
    strMinute = '0' + strMinute
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + strHour + ':' + strMinute

  return currentdate
}
//add
/**
 * 获取当天时间 精确到秒
 * @returns 
 */
export function getNowFormatDateMiao() {
  const date = new Date()
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  let strHour = date.getHours()
  let strMinute = date.getMinutes()
  let strSeconds = date.getSeconds()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  if (strHour >= 0 && strHour <= 9) {
    strHour = '0' + strHour
  }
  if (strMinute >= 0 && strMinute <= 9) {
    strMinute = '0' + strMinute
  }
  if (strSeconds >= 0 && strSeconds <= 9) {
    strSeconds = '0' + strSeconds
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + strHour + ':' + strMinute + ':' + strSeconds

  return currentdate
}
//end

export function getCurMonthDate() {
  const date = new Date()
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date
}

export function getTodayStartDate() {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date
}

export function getTodayEndDate() {
  const date = new Date()
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  date.setMilliseconds(999)
  return date
}

export function getNextFormatDate() {
  const date = new Date()
  date.setTime(date.getTime() + 3600 * 1000 * 24 * 1) // 后一天
  const seperator1 = '-'
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate

  return currentdate
}

// eslint-disable-next-line
Date.prototype.format = Date.prototype.format || function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份 
    'd+': this.getDate(), // 日 
    'h+': this.getHours(), // 小时 
    'm+': this.getMinutes(), // 分 
    's+': this.getSeconds(), // 秒 
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度 
    'f': this.getMilliseconds() // 毫秒 
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
  }
  return fmt
}

// timezone utc 转换
export function getTimeZoneString(TimezoneOffset) {
  var strpm = '-'
  if (TimezoneOffset < 0) {
    strpm = '+'
    TimezoneOffset = 0 - TimezoneOffset
  }
  var hours = Math.floor(TimezoneOffset / 60).toString()
  var minutes = (TimezoneOffset % 60).toString()
  return ('(UTC' + strpm + (hours.length < 2 ? '0' + hours : hours) + ':' + (minutes.length < 2 ? '0' + minutes : minutes) + ')')
}
// 统一格式
export function showTimeZone(time, TimezoneOffset, ignoreLocal = true) {
  // eslint-disable-next-line
  if (ignoreLocal && (!TimezoneOffset || TimezoneOffset == store.getters.timezone)) {
    return time
  }
  return time + ' ' + getTimeZoneString(TimezoneOffset)
}

// 证件号加*
export function icdDocumentCode(value) {
  if (!value) {
    return ''
  }
  const _str = String(value)
  let _return = _str

  const re_str = '*******************************'
  if (_str.length >= 11) {
    _return = _str.slice(0, 3) + re_str.slice(0, _str.length - 7) + _str.slice(-4)
  } else if (_str.length >= 6) {
    _return = _str.slice(0, 2) + re_str.slice(0, _str.length - 4) + _str.slice(-2)
  } else if (_str.length >= 2) {
    _return = _str.slice(0, 1) + re_str.slice(0, _str.length - 2) + _str.slice(-1)
  }
  return _return
}
