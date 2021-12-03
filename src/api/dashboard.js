/*
 * @Descripttion: 首页消息
 * @version: 
 * @Author: Bing
 * @Date: 2020-12-14 10:12:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 10:20:39
 */
import request from '@/utils/request'

// export function exampleFunc(data) {
//   return request({
//     url: '/2049/',
//     method: 'post',
//     data
//   })
// } 
export function dashboardSJ(data) {
  return request({
    url: '/2049/',
    method: 'post',
    data
  })
}
