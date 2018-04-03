<template>
  <view-box>
    <x-header slot="header" :left-options="{showBack: false}">
      {{getTitle()}}
    </x-header>
    <router-view></router-view>
    <tabbar slot="bottom">
      <tabbar-item selected link="/">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-home"></use>
        </svg>
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="/addGoods">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-plus"></use>
        </svg>
        <span slot="label">添加货源</span>
      </tabbar-item>
      <tabbar-item>
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-user"></use>
        </svg>
        <span slot="label">个人中心</span>
      </tabbar-item>
    </tabbar>
  </view-box>
</template>

<script>

  export default {
    data() {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      };
    },
    methods: {
      getTitle() {
        console.log(this.$route);
        switch (this.$route.path) {
          case '/':
            return '首页';
          case '/addGoods':
            return '添加货源';
          default:
            return '';
        }
      }
    }
  };
</script>
