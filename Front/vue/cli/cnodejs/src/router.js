import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/getstart',
      name: 'getstart',
      component: () => import('./views/GetStart.vue')
    },
    {
      path: '/api',
      name: 'api',
      component: () => import('./views/Api.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/setting',
      name: 'setting',
      component: () => import('./views/Setting.vue')
    },
    {
      path: '/my/message',
      name: 'message',
      component: () => import('./views/Message.vue')
    },
  ]
})

router.beforeEach(function(to, from, next) {
  const isLogin = router.app.$options.store.getters.isLogin;
  if(isLogin) {
    return next();
  }
  const needLoginRoutes = ['/my/message', '/setting'];
  if(!needLoginRoutes.includes(to.path)) {
    return next();
  } 
  next({
    path: '/login',
    name: 'login',
    replace: true,
  });
})


export default router;