<template>
  <div class="gm-view-box">
    <div :class="`gm-view-box-header${this.$root.isiOS ? ' ios-header-top' : ''}`">
      <slot name="header" />
    </div>
    <div ref="viewBox" class="view-box-body" :style="{height: height}">
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
  export default {
    name: 'view-box',
    data() {
      return {
        height: '100%'
      };
    },
    mounted() {
      const headerHeight = document.querySelector('.gm-view-box-header').getBoundingClientRect().height;
      const buttomItem = document.querySelector('.weui-tabbar');
      const buttomHeight = buttomItem ? buttomItem.getBoundingClientRect().height : 0;

      this.height = `calc(100% - ${headerHeight + buttomHeight}px)`;
    }
  };
</script>

<style>
  .gm-view-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .gm-view-box .view-box-body {
    flex: 1;
    position: relative;
    overflow: hidden;
    height: 100%;
  }
</style>
