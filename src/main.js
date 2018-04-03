import Vue from 'vue';
import FastClick from 'fastclick';
import VueRouter from 'vue-router';
import App from './App';
import routes from './router';

import RegisterFilters from './lib/RegisterFilters';
import RegisterComponent from './lib/RegisterComponent';
import RegisterHttpService from './lib/HttpService';

Vue.use(VueRouter);

const router = new VueRouter({
  routes
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
