import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '/',
    meta: {
      title: ''
    },
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: 'Dashboard',
        icon: 'dashboard',
        rights: {
          V: '1',
          U: '1',
          VPic: '1',
          UPrint: '1'
        }
      },
    }, ]
  }
]
export const asyncRoutes = [
  //快递类型配置
  {
    path: '//',
    component: Layout,
    redirect: '/expressType',
    name: 'expressType',
    meta: {
      title: 'expressType',
      icon: 'configuration'
    },
    children: [{
      path: 'expressType',
      component: () => import('@/views/expressType/index'),
      name: 'ExpressType',
      meta: {
        title: 'ExpressType',
        icon: 'visitplace',
        rights: {
          V: '1',
          VPic: '1',
          Ex: '1'
        },
        keepAlive: true
      }
    }],
  },
  //公司位置配置 
  {
    path: '',
    component: Layout,
    redirect: '/locationConf',
    name: 'locationConf',
    meta: {
      title: 'locationConf',
      icon: 'el-icon-s-order'
    },
    children: [{
      path: 'locationConf',
      component: () => import('@/views/locationConf/index'),
      name: 'LocationConf',
      meta: {
        title: 'LocationConf',
        icon: 'visitor-record',
        rights: {
          V: '1',
          VPic: '1',
          Ex: '1'
        },
        keepAlive: true
      }
    }],
  },
  //历史记录查询
  {
    path: '/history',
    component: Layout,
    redirect: '/Record',
    name: 'history',
    meta: {
      title: 'Record',
      icon: 'el-icon-s-order'
    },
    children: [{
      path: 'Record',
      component: () => import('@/views/history/record'), // Parent router-view
      name: 'Record',
      meta: {
        title: 'Record',
        icon: 'visitor-record',
        rights: {
          V: '1',
          VPic: '1',
          Ex: '1'
        },
        keepAlive: true
      }
    }],
  },
  // {
  //   path: '/history',
  //   component: Layout,
  //   redirect: '/history/record',
  //   name: 'History',
  //   meta: {
  //     title: 'History',
  //     icon: 'el-icon-s-order'
  //   },
  //   children: [{
  //     path: 'record',
  //     component: () => import('@/views/history/record'), // Parent router-view
  //     name: 'Record',
  //     meta: {
  //       title: 'Record',
  //       icon: 'visitor-record',
  //       rights: {
  //         V: '1',
  //         VPic: '1',
  //         Ex: '1'
  //       },
  //       keepAlive: true
  //     }
  //   }],
  // },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
