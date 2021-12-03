/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-17 12:31:20
 */
import Cookies from 'js-cookie'

const TokenKey = '_V494344'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  // return sessionStorage.setItem(TokenKey, token)
  // var millisecond = new Date().getTime()
  // var expiresTime = new Date(millisecond + 60 * 1000 * 1)
  return Cookies.set(TokenKey, token, { expires: 1 })
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

