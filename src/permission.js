/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 16:50:07
 */
import router from './router'
import store from './store'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
import i18n from './languages'
// var Base64 = require('js-base64').Base64
NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()
  // set page title
  document.title = i18n.t('Title') // getPageTitle(to.meta.title)
  // determine whether the user has logged in
  // f5回到首页？
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasRights = store.getters.userrights && store.getters.userrights !== '' // store.getters.userrights > 0     
      if (hasRights) {
        next()
      } else {
        try {
          // get user info
          const userinfo = await store.dispatch('user/getInfo')
          // console.log(window.location.href, window.location.search)
          var rights = ''

          rights = {
            username: userinfo.username
          }

          const routertest = await store.dispatch('rights/generateRoutes', rights)
          router.addRoutes(routertest)
          // 解决f5刷新回到首页与路由权限404问题
          if (from.path === '/login') {
            next({
              ...to,
              name: 'Dashboard'
            })
          } else {
            next({
              ...to,
              replace: true
            })
          }
          // next()
        } catch (error) {

          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error('generateRoutes error')

          // next(`/login?redirect=${to.path}`)  此行会导致输入错误的url后登陆异常
          next(`/login`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
