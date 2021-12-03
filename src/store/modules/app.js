/*
 * @Descripttion: 
 * @version: 
 * @Author: Bing
 * @Date: 2020-10-23 18:41:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-11-22 09:54:22
 */
import Cookies from 'js-cookie'
import { getLanguage } from '@/languages/index'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: getLanguage(),
  hiddenProperty: false,
  timezone: new Date().getTimezoneOffset()
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  SET_LANGUAGE: (state, language) => {
    state.language = language
    // Cookies.set('language', language)
    localStorage.setItem('language', language)
    Cookies.set('language', language)
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
