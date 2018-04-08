import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';

import RegisterFilters from './lib/RegisterFilters';
import RegisterComponent from './lib/RegisterComponent';
import RegisterHttpService from './lib/HttpService';
import { getLocalStorageCache } from './components/utils/CacheService';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

// 全局守卫，监听路由变化
router.beforeEach((to, from, next) => {
  // 路由变化之前处理
  const user = getLocalStorageCache('user');

  if ((to.path.indexOf('/login') < 0 && to.path !== '/register') && !user) {
    next('/login/1');
  } else if (to.matched.length === 0) {
    // 如果未匹配到路由
    if (from.path) {
      // 如果上级也未匹配到路由则跳转首页，如果上级能匹配到则不跳转
      next(false);
    } else {
      next('/');
    }
  } else {
    next();
  }
});

FastClick.attach(document.body);

Vue.config.productionTip = false;

// 注册普通组件
RegisterComponent(Vue);
// 注册过滤器
RegisterFilters(Vue);
// 注册http组件
RegisterHttpService(Vue);

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box');
