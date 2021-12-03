/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-01-21 15:38:12
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || 'ICD Visitor Administration'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return ` ${title}` // /*${pageTitle} -*/ 设置浏览器Title
  }
  return `${title}`
}

