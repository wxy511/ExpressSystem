/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-21 09:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-05 14:44:59
 */
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import rights from './modules/rights'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    rights
  },
  getters
})

export default store
