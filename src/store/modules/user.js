import {
  login,
  getInfo
} from '@/api/user'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import {
  resetRouter
} from '@/router'
import {
  GetUserName,
  SetUserName
} from '@/utils/info'
var Base64 = require('js-base64').Base64
const getDefaultState = () => {
  return {
    token: getToken(),
    name: GetUserName(),
    avatar: '',
    userrights: '',
    pwdaes: '',
    visitcode: [],
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  // SET_PASSWORD: (state, password) => {
  //   state.password = password
  // },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERRIGHTS: (state, userrights) => {
    state.userrights = userrights
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  }
}

const actions = {
  // user login
  //?
  login({
    commit
  }, userInfo) {
    const {
      username,
      pwdaes,
      vefcode_img
    } = userInfo
    return new Promise((resolve, reject) => {
      login({
        username: username.trim(),
        pwdaes: pwdaes,
      }).then(response => {
        console.log("-->2", response)
        if (response.error !== 0) {
          const data = response
          throw new Error(data.error)
        }
        if (response.error === 0) {
          // /
          const data = response
          const token = "ICDTest"
          commit('SET_TOKEN', token)
          setToken(token)
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  // getInfo({
  //   commit,
  //   state
  // }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const data = response
  //       if (!data) {
  //         return reject('Verification failed, please Login again.')
  //       }
  //       let username = ''
  //       let userid = ''
  //       // let password = ''
  //       let visitbranch = []
  //       const type = ''

  //       if (typeof (data.user[0].username) !== 'undefined') {
  //         username = data.user[0].username
  //       }
  //       if (typeof (data.user[0].userid) !== 'undefined') {
  //         userid = data.user[0].userid
  //       }
  //       if (username === 'admin') {
  //         visitbranch = 'admin'
  //       } else if (type === 'system') {
  //         visitbranch = 'admin'
  //       } else {
  //         const Branch = data.user[0].branch.replace(/</g, '').replace(/>/g, ' ').split(' ')
  //         visitbranch = Branch
  //       }
  //       // 兼容权限
  //       // 21-1-11 更新权限
  //       // let userrights = ''
  //       // if (username === 'admin') {
  //       //   userrights = 'admin'
  //       // } else if (type === 'system') {
  //       //   userrights = 'system'
  //       // } else if (typeof (data.user[0].RightsEx) !== 'undefined') {
  //       //   const strRights = Base64.decode(data.user[0].RightsEx)
  //       //   userrights = JSON.parse(strRights)
  //       // } else if ((data.user[0].rights).length > 0) {
  //       //   userrights = 'vs'
  //       // }
  //       commit('SET_NAME', username)
  //       // commit('SET_USERRIGHTS', userrights)
  //       commit('SET_USERID', userid)
  //       commit('SET_VISITBRACNCH', visitbranch)
  //       SetUserName(username)

  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  getInfo({
    commit,
    state
  }) {

    return new Promise((resolve, reject) => {
      const sendData = {
        username: state.name
        //username: "admin"    这个name 是存储到浏览器中的，如果浏览器清缓存这个name就会消失，就会登录不进去   需要改
      }
      getInfo(sendData).then(response => {
        console.log("111", sendData)
        const data = response
        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        let username = ''
        let userid = ''
        const type = ''

        if (typeof (data.username) !== 'undefined') {
          username = data.username
        }
        if (typeof (data.userid) !== 'undefined') {
          userid = data.userid
        }

        // 兼容权限
        // 21-1-11 更新权限
        let userrights = ''
        if (username === 'admin') {
          userrights = 'admin'
        } else if (type === 'system') {
          userrights = 'system'
        }
        commit('SET_NAME', username)
        commit('SET_USERID', userid)
        commit('SET_USERRIGHTS', userrights)
        SetUserName(username)

        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({
    commit
  }) {
    return new Promise(resolve => {
      // 登出则清除Token与router
      // setTimeout(() => {

      // eslint-disable-next-line
      if (process.env.NODE_ENV === 'development') {
        resetRouter()
        commit('RESET_STATE')
        commit('SET_USERID')
        commit('SET_NAME')
        location.reload() // 强制刷新
      } else {
        // eslint-disable-next-line
        window.location.href = '/s_logout/'
      }
      removeToken() // must remove  token  first

      resolve()
    })
  },
  // remove token
  resetToken({
    commit
  }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
