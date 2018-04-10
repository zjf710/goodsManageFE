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

let backButtonClicked = false;
// 硬件检测，注册事件
document.addEventListener('deviceready', () => {
  try {
    document.addEventListener('backbutton', (e) => {
      e.preventDefault();

      // 点两次退出app
      if (backButtonClicked) {
        Vue.$vux.confirm.show({
          title: '退出',
          content: '确认退出应用吗？',
          onConfirm() {
            navigator.app.exitApp();
          }
        });
        return;
      }

      backButtonClicked = true;
      setTimeout(() => {
        backButtonClicked = false;
      }, 300);

      // 首页点返回提示退出app
      if (location.hash !== '#/') {
        history.back();
      }
    }, false);
  } catch (e) {
    // eslint-disable-next-line
    console.log('设备检测失败');
  }
}, false);
