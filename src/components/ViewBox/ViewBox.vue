<template>
  <div class="gm-view-box">
    <div :class="this.$root.isiOS ? 'ios-header-top' : ''">
      <slot name="header" />
    </div>
    <div class="view-box-body">
      <slot />
    </div>
    <slot name="bottom" />
  </div>
</template>

<script>
  export default {
    name: 'view-box'
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
