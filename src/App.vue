<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import './assets/font/iconfont.js';

  export default {
    name: 'app',
    beforeCreate() {
      // 设备判断
      const u = navigator && navigator.userAgent;
      const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      this.$root.isiOS = isiOS;
    }
  };
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  html,
  body {
    height: 100%;
    width: 100%;
    background-color: #fbf9fe;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
  }

  input {
    outline: none;
    border: none;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .svg-icon {
    display: inline-block;
    width: 18px;
    height: 18px;
    fill: currentColor;
    overflow: hidden;
  }

  .weui-tabbar {
    position: relative !important;
  }

  .ios-header-top {
    background-color: #35495e;
    /* Status bar height on iOS 10 */
    padding-top: 20px;
    /* Status bar height on iOS 11 */
    padding-top: constant(safe-area-inset-top);
    /* Status bar height on iOS 11+ */
    padding-top: env(safe-area-inset-top);
  }
</style>
