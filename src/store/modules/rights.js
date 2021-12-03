import {
  asyncRoutes,
  constantRoutes
} from '@/router' //, ICDasyncRoutes
var routerKeepAlive = []
// eslint-disable-next-line
var arryRights = {
  'dashboard': 'dashboard',
  // '/history': '/history',
  // 'record': 'record',
  // 'registration': 'registration',
  'expressType': 'expressType',
  'locationConf': 'locationConf',
  'Record': 'Record',
}
// eslint-disable-next-line
var arryRoutes = {
  'dashboard': 'dashboard',
  // '/history': '/history',
  // 'record': 'record',
  // 'registration': 'registration',
  // 'basis': 'basis',
  'expressType': 'expressType',
  'locationConf': 'locationConf',
  'Record': 'Record',
}
//原
// // eslint-disable-next-line
// var arryRights = {
//   'dashboard': 'dashboard',
//   '/history': '/history',
//   'record': 'record',
//   'registration': 'registration',
//   '/configuration': '/configuration',
//   'basis': 'basis',
//   'visitplace': 'visitplace',
//   'vms': 'vms-front-end',
//   'datafield': 'datafield',
//   'nationality': 'nationality',
//   'databridge': 'data-bridge',
//   '/administrator': '/administrator',
//   'user': 'user',
//   'email': 'email',
//   'sms': 'sms',
//   '/data': '/data',
//   'visitor': 'visitor',
//   'host': 'host',
//   'database': 'database',
//   'blacklist': 'blacklist',
//   'whitelist': 'whitelist'
// }
// // eslint-disable-next-line
// var arryRoutes = {
//   'dashboard': 'dashboard',
//   '/history': '/history',
//   'record': 'record',
//   'registration': 'registration',
//   '/configuration': '/configuration',
//   'basis': 'basis',
//   'visitplace': 'visitplace',
//   'vms': 'vms-front-end',
//   'datafield': 'datafield',
//   'nationality': 'nationality',
//   'databridge': 'data-bridge',
//   '/administrator': '/administrator',
//   'user': 'user',
//   'email': 'email',
//   'sms': 'sms',
//   '/data': '/data',
//   'visitor': 'visitor',
//   'host': 'host',
//   'database': 'database',
//   'blacklist': 'blacklist',
//   'whitelist': 'whitelist'
// }

/**
 * 
 * 权限转换rights -> route
 * string type
 */
export function TransRoutes(RightsEx) {
  const strRights = JSON.parse(RightsEx)
  const Rigths = {}
  for (const i in strRights) {
    for (const j in arryRoutes) {
      // eslint-disable-next-line
      if (i == j) {
        Rigths[arryRoutes[j]] = strRights[i]
      }
    }
  }
  return Rigths
}

/**
 * 
 * 权限转换 route ->rights 
 * string type
 */
export function TransRights(Route) {
  const strRoute = JSON.parse(Route)
  const Rigths = {}
  for (const i in strRoute) {
    for (const j in arryRights) {
      // eslint-disable-next-line
      if (i == j) {
        Rigths[arryRights[j]] = strRoute[i]
      }
    }
  }
  return Rigths
}

/**
 * 解析路由权限
 */
export function EncodeRightsEx(RightsEx) {
  let rightPath = []
  const strToObj = JSON.parse(RightsEx)
  // 更换权限格式
  for (const i in strToObj) {
    if (typeof (strToObj[i].V) !== 'undefined' && strToObj[i].V !== '') {
      rightPath.push(i)
    }
  }
  rightPath = Array.from(new Set(rightPath))
  return rightPath
}

// function hasRights(rights, route) {
//     if (route.meta && route.meta.rights) {
//         let Test = route.meta.rights.includes(rights)
//         return Test
//     } else {
//         return true
//     }
//     //
// }

export function filterAsyncRoutes(routes, rights) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    for (const index in rights) {
      if (tmp.path === rights[index]) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, rights)
        }
        if (tmp.meta && tmp.meta.keepAlive && tmp.name) {
          routerKeepAlive.push(tmp.name)
        }
        res.push(tmp)
      }
    }
    if (tmp.path === '*') {
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  SET_ROUTERKEEPAlIVE: (state, routerKeepAlive) => {
    state.routerKeepAlive = routerKeepAlive
  }
}

const actions = {
  generateRoutes({
    commit
  }, rights) {
    return new Promise(resolve => {
      let accessedRoutes
      routerKeepAlive = []
      if (rights.username === 'admin') {
        accessedRoutes = asyncRoutes || []
      }
      // else {
      //   let rightPath = []
      //   // console.log(TransRights(rights))

      //   // console.log(rights)
      //   rightPath = EncodeRightsEx(rights)
      //   // rightPath = Array.from(new Set(rightPath))
      //   accessedRoutes = filterAsyncRoutes(asyncRoutes, rightPath)
      // }
      // commit('SET_ROUTERKEEPAlIVE', routerKeepAlive)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
