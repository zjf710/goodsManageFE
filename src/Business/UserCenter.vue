<template>
  <div class="gm-user-center">
    <group>
      <cell title="我的货单" is-link link="/userOrders" />
    </group>

    <div class="button-container">
      <x-button type="warn" @click.native="logout">退出登录</x-button>
    </div>
  </div>
</template>

<script>
  import { removeLocalStorageCache } from '../components/utils/CacheService';

  export default {
    name: 'user-center',
    methods: {
      logout() {
        removeLocalStorageCache('user');
        removeLocalStorageCache('type');
        removeLocalStorageCache('token');

        this.$router.push('/');
      }
    }
  };
</script>

<style>
  .gm-user-center .button-container {
    padding: 0 15px;
    margin-top: 50px;
  }
</style>
