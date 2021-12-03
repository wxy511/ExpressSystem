/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2021-03-03 10:02:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-03-03 10:06:44
 */
const NameKey = 'username'
export function GetUserName() {
  return localStorage.getItem(NameKey)
}
  
export function SetUserName(name) {
  return localStorage.setItem(NameKey, name)
}
  
export function RemoveUserName() {
  return localStorage.removeItem(NameKey)
}
