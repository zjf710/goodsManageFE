<template>
  <view-box>
    <x-header slot="header" :left-options="{showBack: false}">
      {{getTitle()}}
    </x-header>
    <router-view></router-view>
    <tabbar slot="bottom">
      <tabbar-item :selected="$route.path === '/'" link="/">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-if="userType === 1" :selected="$route.path === '/addGoods'" link="/addGoods">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-plus"></use>
        </svg>
        <span slot="label">添加货源</span>
      </tabbar-item>
      <tabbar-item :selected="$route.path === '/center'" link="/center">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>
  import { getLocalStorageCache } from '../components/utils/CacheService';

  export default {
    data() {
      const userType = getLocalStorageCache('userType');
      return {
        userType
      };
    },
    methods: {
      getTitle() {
        switch (this.$route.path) {
          case '/':
            return '首页';
          case '/addGoods':
            return '添加货源';
          case '/center':
            return '个人中心';
          default:
            return '';
        }
      }
    }
  };
</script>
