import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: () => import(/* webpackChunkName: 'index' */ '@/views/index'),
      children: [
        {
          path: '/marketingManage',//营销管理
          name: 'marketingManage',
          meta: { name: '营销管理' },
          component: () => import(/* webpackChunkName: 'marketingManage' */ '@/views/marketing-manage'),
        },
        {
          path: '/customerManage',//客户管理
          name: 'CustomerManage',
          meta: { name: '客户管理' },
          component: () => import(/* webpackChunkName: 'customerManage' */ '@/views/customer-manage'),
        },
        {
          path: '/customerAnalysis',//客户分析
          name: 'customerAnalysis',
          meta: { name: '客户分析' },
          component: () => import(/* webpackChunkName: 'customerAnalysis' */ '@/views/customer-analysis'),
        },
        {
          path: '/labelManage',//标签管理
          name: 'labelManage',
          meta: { name: '标签管理' },
          component: () => import(/* webpackChunkName: 'labelManage' */ '@/views/label-manage'),
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import(/* webpackChunkName: 'login' */ '@/views/login')
    },
  ]
})
