/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('~/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('~/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('~/views/about/index'),
        meta: { title: '我的', keepAlive: false }
      },
      {
        path: '/clear_supervise/list',
        name: 'ClearSuperviseList',
        component: () => import('~/views/clear_supervise/list'),
        meta: { title: '清运督察', keepAlive: false }
      },
      {
        path: '/clear_supervise/detail/:id?',
        name: 'ClearSuperviseDetail',
        component: () => import('~/views/clear_supervise/detail/index'),
        meta: { title: '清运督察', keepAlive: false }
      },
      {
        path: '/code_inspection/manual',
        name: 'CodeInspectionManual',
        component: () => import('~/views/code_inspection/manual'),
        meta: { title: '扫码巡检', keepAlive: false }
      },
      {
        path: '/code_inspection/inspectionRate',
        name: 'CodeInspectionRate',
        component: () => import('~/views/code_inspection/inspectionRate'),
        meta: { title: '扫码巡检', keepAlive: false }
      },
      {
        path: '/coins_exchange',
        name: 'CoinsExchange',
        component: () => import('~/views/coins_exchange/index'),
        meta: { title: '扫码兑换', keepAlive: false }
      },
      {
        path: '/coins_exchange/callback',
        name: 'CoinsExchangeCallback',
        component: () => import('~/views/coins_exchange/callback'),
        meta: { title: '扫码兑换', keepAlive: false }
      },
      {
        path: '/coins_record/list',
        name: 'CoinsRecordList',
        component: () => import('~/views/coins_record/list'),
        meta: { title: '交易记录', keepAlive: false }
      },
      {
        path: '/coins_record/detail/:id?',
        name: 'CoinsRecordDetail',
        component: () => import('~/views/coins_record/detail/index'),
        meta: { title: '交易记录', keepAlive: false }
      },
      {
        path: '/weigh/list',
        name: 'WeighList',
        component: () => import('~/views/weigh/list'),
        meta: { title: '称重', keepAlive: false }
      },
      {
        path: '/user_query/list',
        name: 'UserQueryList',
        component: () => import('~/views/user_query/list'),
        meta: { title: '用户查询', keepAlive: false }
      },
      {
        path: '/user_query/detail',
        name: 'UserQueryDetail',
        component: () => import('~/views/user_query/detail'),
        meta: { title: '用户查询', keepAlive: false }
      },
      {
        path: '/user_query/exchange/:id?',
        name: 'UserQueryExchange',
        component: () => import('~/views/user_query/exchange/index'),
        meta: { title: '用户查询', keepAlive: false }
      },
      {
        path: '/user_query/puton/:id?',
        name: 'UserQueryPuton',
        component: () => import('~/views/user_query/puton/index'),
        meta: { title: '用户查询', keepAlive: false }
      }
    ]
  }
]
