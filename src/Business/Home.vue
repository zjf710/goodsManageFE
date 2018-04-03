<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1></h1>
    </div>
    <group title="cell demo">
      <cell title="VUX" value="cool" is-link />
    </group>
  </div>
</template>

<script>
  export default {
    name: 'home'
  };
</script>

<style>
  .vux-demo {
    text-align: center;
  }

  .logo {
    width: 100px;
    height: 100px
  }
</style>
