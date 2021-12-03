/*
 * @Descripttion: 对路由以及用户权限处理
 * @version: 
 * @Author: Bing
 * @Date: 2021-01-06 11:57:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2021-07-01 17:14:34
 */
import i18n from '@/languages'
/**
     * 获取当前路由表
     */
export function FormatRoutes(routes) {
  const res = []
  let stri18n = ''
  routes.forEach(route => {
    const tmp = { ...route }
    if (!tmp.hidden && typeof (tmp.meta) !== 'undefined') {
      if (tmp.children) {
        tmp.children = FormatRoutes(tmp.children)
      }
      if (tmp.meta.title !== '') {
        stri18n = 'Route.' + tmp.meta.title
      }
      tmp['i18n'] = stri18n
      tmp['title'] = i18n.t(stri18n)// ShowRoutes[i].meta.title
      tmp['check'] = []
      tmp['disable'] = true
      res.push(tmp)
    }
  })
  return res
}
/**
 * 
 * 将权限转为icon格式
 * class: "permission-full"
 * icon: "table_RegionOptions"
 * r_key: "RegionOptions"
 * tiptext: "城市/地区"
 * @returns icon格式数组
 */
export function FormatRightsIcon(routers, rights) {
  let res = []
  if (rights === 'admin') {
    routers.forEach(routers => {
      const tmp = { ...routers }
      const right_icon = {}
      if (!tmp.hidden && typeof (tmp.meta) !== 'undefined') {
        if (tmp.children) {
          res = res.concat(FormatRightsIcon(tmp.children, rights))
        }
        if (tmp.meta.icon && tmp.meta.rights && JSON.stringify(tmp.meta.rights) !== '{}') {
          right_icon['class'] = 'permission-full'
          right_icon['icon'] = tmp.meta.icon
          right_icon['r_key'] = tmp.name
          right_icon['tiptext'] = tmp.i18n
          res.push(right_icon)
        }
      }
    })
  } else {
    routers.forEach(routers => {
      const tmp = { ...routers }
      const right_icon = {}
      let flag = true
      if (!tmp.hidden && typeof (tmp.meta) !== 'undefined') {
        if (tmp.children) {
          res = res.concat(FormatRightsIcon(tmp.children, rights))
        }
        if (tmp.meta.icon && tmp.meta.rights && JSON.stringify(tmp.meta.rights) !== '{}' && rights[tmp.path]) {
          for (const i in tmp.meta.rights) {
            if (!rights[tmp.path][i]) {
              flag = false
              break
            }
          }
          if (flag) {
            right_icon['class'] = 'permission-full'
            right_icon['icon'] = tmp.meta.icon
            right_icon['r_key'] = tmp.name
            right_icon['tiptext'] = tmp.i18n
          } else {
            right_icon['class'] = 'permission-half'
            right_icon['icon'] = tmp.meta.icon
            right_icon['r_key'] = tmp.name
            right_icon['tiptext'] = tmp.i18n
            flag = true
          }
          res.push(right_icon)
        } 
      }
    })
  }

  return res
}
/**
 * 
 * 将rights中的权限写入到routes中
 */
export function FormatRoutesRights(routes, rights) {
  const res = []
  if (rights === 'admin') {
    routes.forEach(route => {
      const tmp = { ...route }
      if (tmp.children) {
        tmp.children = FormatRoutesRights(tmp.children, rights)
      }
      tmp['check'] = []
      if (typeof (tmp.meta.rights) === 'undefined') {
        tmp.meta.rights = {}
      } 
      if (tmp.meta.rights.V !== '' && typeof (tmp.meta.rights.V) !== 'undefined') {
        tmp['check'].push('V')
      }
      if (tmp.meta.rights.Ex !== '' && typeof (tmp.meta.rights.Ex) !== 'undefined') {
        tmp['check'].push('Ex')
      }
      if (tmp.meta.rights.U !== '' && typeof (tmp.meta.rights.U) !== 'undefined') {
        tmp['check'].push('U')
      }
      if (tmp.meta.rights.D !== '' && typeof (tmp.meta.rights.D) !== 'undefined') {
        tmp['check'].push('D')
      }
      if (tmp.meta.rights.C !== '' && typeof (tmp.meta.rights.C) !== 'undefined') {
        tmp['check'].push('C')
      }
      if (tmp.meta.rights.VPic !== '' && typeof (tmp.meta.rights.VPic) !== 'undefined') {
        tmp['check'].push('VPic')
      }
      if (tmp.meta.rights.UPrint !== '' && typeof (tmp.meta.rights.UPrint) !== 'undefined') {
        tmp['check'].push('UPrint')
      }
    
      res.push(tmp)
    })
  } else {
    routes.forEach(route => {
      const tmp = { ...route }
      tmp['check'] = []
      if (typeof (rights[tmp.path]) !== 'undefined' && typeof (rights[tmp.path].V) !== 'undefined') {
        if (tmp.children) {
          tmp.children = FormatRoutesRights(tmp.children, rights)
        }
        if (typeof (tmp.meta.rights) === 'undefined') {
          tmp.meta.rights = {}
        } 
        // 子集权限不能超过父级，admin能赋予所有权限
        // tmp.meta.rights.V = ''
        // tmp.meta.rights.Ex = ''
        // tmp.meta.rights.U = ''
        // tmp.meta.rights.D = ''
        // tmp.meta.rights.C = ''

        if (rights[tmp.path].V !== '' && typeof (rights[tmp.path].V) !== 'undefined') {
          tmp.meta.rights.V = rights[tmp.path].V
          tmp['check'].push('V')
          tmp['disable'] = false
        }
        if (rights[tmp.path].Ex !== '' && typeof (rights[tmp.path].Ex) !== 'undefined') {
          tmp.meta.rights.Ex = rights[tmp.path].Ex
          tmp['check'].push('Ex')
        }
        if (rights[tmp.path].U !== '' && typeof (rights[tmp.path].U) !== 'undefined') {
          tmp.meta.rights.U = rights[tmp.path].U
          tmp['check'].push('U')
        }
        if (rights[tmp.path].D !== '' && typeof (rights[tmp.path].D) !== 'undefined') {
          tmp.meta.rights.D = rights[tmp.path].D
          tmp['check'].push('D')
        }
        if (rights[tmp.path].C !== '' && typeof (rights[tmp.path].C) !== 'undefined') {
          tmp.meta.rights.C = rights[tmp.path].C
          tmp['check'].push('C')
        }
        if (rights[tmp.path].VPic !== '' && typeof (rights[tmp.path].VPic) !== 'undefined') {
          tmp.meta.rights.VPic = rights[tmp.path].VPic
          tmp['check'].push('VPic')
        }
        if (rights[tmp.path].UPrint !== '' && typeof (rights[tmp.path].UPrint) !== 'undefined') {
          tmp.meta.rights.UPrint = rights[tmp.path].UPrint
          tmp['check'].push('UPrint')
        }

        res.push(tmp)
      } else {
        res.push(tmp)
      }
    })
  }
  return res
}

/**
 * 根据所给权限动态生成列表
 */

export function CreateRightsList(routes, rights) {  
  const res = []
  let stri18n = ''
  routes.forEach(route => {
    const tmp = { ...route }
    if (!tmp.hidden && typeof (tmp.meta) !== 'undefined') {
      if (typeof (rights[tmp.path]) !== 'undefined') {
        if (tmp.meta.title !== '') {
          stri18n = 'Route.' + tmp.meta.title
        }
        tmp['title'] = i18n.t(stri18n)// ShowRoutes[i].meta.title
        tmp['check'] = []
        tmp['disable'] = true

        if (typeof (rights[tmp.path].V) !== 'undefined') {
          if (typeof (tmp.meta.rights) === 'undefined') {
            tmp.meta.rights = {}
          } 
          // 子集权限不能超过父级，admin能赋予所有权限
          tmp.meta.rights.V = ''
          tmp.meta.rights.Ex = ''
          tmp.meta.rights.U = ''
          tmp.meta.rights.D = ''
          tmp.meta.rights.C = ''
          tmp.meta.rights.VPic = ''
          tmp.meta.rights.UPrint = ''
    
          if (rights[tmp.path].V !== '' && typeof (rights[tmp.path].V) !== 'undefined') {
            tmp.meta.rights.V = rights[tmp.path].V
          }
          if (rights[tmp.path].Ex !== '' && typeof (rights[tmp.path].Ex) !== 'undefined') {
            tmp.meta.rights.Ex = rights[tmp.path].Ex
          }
          if (rights[tmp.path].U !== '' && typeof (rights[tmp.path].U) !== 'undefined') {
            tmp.meta.rights.U = rights[tmp.path].U
          }
          if (rights[tmp.path].D !== '' && typeof (rights[tmp.path].D) !== 'undefined') {
            tmp.meta.rights.D = rights[tmp.path].D
          }
          if (rights[tmp.path].C !== '' && typeof (rights[tmp.path].C) !== 'undefined') {
            tmp.meta.rights.C = rights[tmp.path].C
          }
          if (rights[tmp.path].VPic !== '' && typeof (rights[tmp.path].VPic) !== 'undefined') {
            tmp.meta.rights.VPic = rights[tmp.path].VPic
          }
          if (rights[tmp.path].UPrint !== '' && typeof (rights[tmp.path].UPrint) !== 'undefined') {
            tmp.meta.rights.UPrint = rights[tmp.path].UPrint
          }
    
          res.push(tmp)
        } else {
          res.push(tmp)
        }
      } 
      if (tmp.children) {
        tmp.children = CreateRightsList(tmp.children, rights)
      }
    }
  })
  return res
}

/**
 * 
 * 根据类型修改权限
 * type:true 全选所有权限
 * type:false 全选所有查看权限
 */
export function ModifyRoutesRights(routes, type) {
  const res = []
  if (type === true) {
    routes.forEach(route => {
      const tmp = { ...route }
      if (tmp.children) {
        tmp.children = ModifyRoutesRights(tmp.children, type)
      }
      tmp['disable'] = false
      tmp['check'] = []
      if (typeof (tmp.meta.rights) === 'undefined') {
        tmp.meta.rights = {}
      } 
      if (tmp.meta.rights.V !== '' && typeof (tmp.meta.rights.V) !== 'undefined') {
        tmp['check'].push('V')
      }
      if (tmp.meta.rights.Ex !== '' && typeof (tmp.meta.rights.Ex) !== 'undefined') {
        tmp['check'].push('Ex')
      }
      if (tmp.meta.rights.U !== '' && typeof (tmp.meta.rights.U) !== 'undefined') {
        tmp['check'].push('U')
      }
      if (tmp.meta.rights.D !== '' && typeof (tmp.meta.rights.D) !== 'undefined') {
        tmp['check'].push('D')
      }
      if (tmp.meta.rights.C !== '' && typeof (tmp.meta.rights.C) !== 'undefined') {
        tmp['check'].push('C')
      }
      if (tmp.meta.rights.VPic !== '' && typeof (tmp.meta.rights.VPic) !== 'undefined') {
        tmp['check'].push('VPic')
      }
      if (tmp.meta.rights.UPrint !== '' && typeof (tmp.meta.rights.UPrint) !== 'undefined') {
        tmp['check'].push('UPrint')
      }
      res.push(tmp)
    })
  } else {
    routes.forEach(route => {
      const tmp = { ...route }
      if (tmp.children) {
        tmp.children = ModifyRoutesRights(tmp.children, type)
      }
      tmp['check'] = []
      tmp['disable'] = false
      tmp['check'].push('V')
      res.push(tmp)
    })
  }
  return res
}

/**
 * 对比子与父得权限，根据父得权限修改子权限
 */
export function RoutesRightsComper(rightsA, rightsB) {
  const res = {}
  for (const i in rightsA) {
    if (typeof (rightsB[i]) !== 'undefined') {
      const rights = {}
      if (rightsB[i].V) {
        if (rightsA[i].V) {
          rights['V'] = rightsB[i].V 
        }
      }
      if (rightsB[i].Ex) {
        if (rightsA[i].Ex) {
          rights['Ex'] = rightsB[i].Ex 
        }
      }
      if (rightsB[i].C) {
        if (rightsA[i].C) {
          rights['C'] = rightsB[i].C 
        }
      }
      if (rightsB[i].D) {
        if (rightsA[i].D) {
          rights['D'] = rightsB[i].D
        }
      }
      if (rightsB[i].U) {
        if (rightsA[i].U) {
          rights['U'] = rightsB[i].U 
        }
      }
      if (rightsB[i].VPic) {
        if (rightsA[i].VPic) {
          rights['VPic'] = rightsB[i].VPic 
        }
      }
      if (rightsB[i].UPrint) {
        if (rightsA[i].UPrint) {
          rights['UPrint'] = rightsB[i].UPrint 
        }
      }
      res[i] = rights
    }
  }
  return res
}
