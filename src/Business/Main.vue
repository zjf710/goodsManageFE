<template>
  <view-box>
    <x-header slot="header" :left-options="{showBack: false}">
      {{getTitle()}}
    </x-header>
    <router-view></router-view>
    <tabbar class="gm-bottom-tab" slot="bottom">
      <tabbar-item :selected="$route.path === '/'" link="/" :style="{marginRight: userType === 1 ? '20px' : ''}">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item v-if="userType === 1" class="tab-item-add-goods" :selected="$route.path === '/addGoods'" link="/addGoods">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-plus"></use>
        </svg>
        <span slot="label">发货</span>
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
            return '发货';
          case '/center':
            return '个人中心';
          default:
            return '';
        }
      }
    }
  };
</script>

<style>
  .gm-bottom-tab .tab-item-add-goods {
    flex: none;
    width: 60px;
    height: 60px;
    position: absolute;
    bottom: 0;
    background: #EF0D33;
    left: 50%;
    transform: translateX(-30px);
    border-radius: 40px;
    padding-top: 10px;
    box-sizing: border-box;
    color: #fff;
    opacity: 1;
  }

  .gm-bottom-tab .tab-item-add-goods.weui-bar__item_on {
    opacity: 0.6;
  }

  .gm-bottom-tab .tab-item-add-goods .weui-tabbar__label,
  .gm-bottom-tab .tab-item-add-goods.weui-bar__item_on .weui-tabbar__label {
    color: #fff;
  }

  .gm-bottom-tab .tab-item-add-goods .weui-tabbar__icon,
  .gm-bottom-tab .tab-item-add-goods.weui-bar__item_on .weui-tabbar__icon {
    color: #fff;
    height: 22px;
  }
</style>
