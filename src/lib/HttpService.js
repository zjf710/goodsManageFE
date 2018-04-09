import { AjaxPlugin } from 'vux';
import _ from 'lodash';

import { getLocalStorageCache } from '../components/utils/CacheService';

const apiBase = 'http://192.168.0.108:8081/';
// const apiBase = 'http://localhost:8081/';

// 请求前的处理
/* eslint no-unused-vars:off */
function beforeRequest(configs) {
  const config = configs;
  config.headers.common['gm-token'] = _.get(getLocalStorageCache('token'), 'token');
  config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  this.$vux.loading.show({
    text: '加载中'
  });
}

// 请求回来后的处理
function requestComplete(response) {
  this.$vux.loading.hide();

  if (response === 'request') {
    // 请求报错
    this.$vux.toast.show({
      width: '7.6em',
      type: 'cancel',
      text: '请求失败'
    });
  } else if (!response || response.status !== 200) {
    // 响应报错
    this.$vux.toast.show({
      width: '7.6em',
      type: 'cancel',
      text: '服务异常'
    });
  }
}

export default (VueTemp) => {
  const Vue = VueTemp;
  // 注册VueResource
  Vue.use(AjaxPlugin);

  Vue.http.defaults.baseURL = apiBase;

  // 请求总线处理
  Vue.http.interceptors.request.use((config) => {
    // 发送请求前处理
    beforeRequest.bind(Vue)(config);
    return config;
  }, (error) => {
    // 请求报错处理
    requestComplete.bind(Vue)('request');
    return Promise.reject(error);
  });

  // 响应总线处理
  Vue.http.interceptors.response.use((response) => {
    // 响应成功处理
    requestComplete.bind(Vue)(response);
    return response;
  }, (error) => {
    // 响应失败处理
    requestComplete.bind(Vue)(_.get(error, 'response'));
    return Promise.reject(error);
  });
};
