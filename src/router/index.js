import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",

  routes: [
    {
      path: "*",
      component: () => import("@/views/404not_found")
    },
    {
      path: "/",
      name: "Index",
      redirect: "/marketingManage",
      component: () => import(/* webpackChunkName: 'index' */ "@/views/index"),
      children: [
        {
          path: "/marketingManage", //营销管理
          name: "marketingManage",
          meta: { name: "营销管理", requireAuth: true },
          component: () =>
            import(
              /* webpackChunkName: 'marketingManage' */ "@/views/marketing-manage"
            )
        },
        {
          path: "/customerManage", //客户管理
          name: "CustomerManage",
          meta: { name: "客户管理", requireAuth: true },
          component: () =>
            import(
              /* webpackChunkName: 'customerManage' */ "@/views/customer-manage"
            )
        },
        {
          path: "/customerAnalysis", //客户分析
          name: "customerAnalysis",
          meta: { name: "客户分析", requireAuth: true },
          component: () =>
            import(
              /* webpackChunkName: 'customerAnalysis' */ "@/views/customer-analysis"
            )
        },
        {
          path: "/labelManage", //标签管理
          name: "labelManage",
          meta: { name: "标签管理", requireAuth: true },
          component: () =>
            import(/* webpackChunkName: 'labelManage' */ "@/views/label-manage")
        }
      ]
    },
    {
      path: "/login",
      name: "Login",
      component: () => import(/* webpackChunkName: 'login' */ "@/views/login")
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {
      // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: "/login",
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});
export default router;
