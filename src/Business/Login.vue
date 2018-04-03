<template>
  <view-box>
    <x-header slot="header" :left-options="{showBack: false}">登录</x-header>
    <div class="gm-login">
      <button-tab v-model="selectIndex">
        <button-tab-item
          :selected="selectIndex === 0"
          @on-item-click="selectTab"
        >
          货主
        </button-tab-item>
        <button-tab-item
          :selected="selectIndex === 1"
          @on-item-click="selectTab"
        >
          司机
        </button-tab-item>
      </button-tab>
      <form @submit="onSubmit">
        <group class="form-items">
          <x-input
            ref="mobile"
            required
            is-type="china-mobile"
            title="手机号"
            v-model="mobile"
            @on-change="setLoginDisabled"
            placeholder="请输入手机号码"
          />
          <x-input
            ref="password"
            required
            type="password"
            title="密码"
            v-model="password"
            @on-change="setLoginDisabled"
            placeholder="请输入密码"
          />
        </group>
        <div class="login-btn">
          <x-button
            type="primary"
            action-type="submit"
            :disabled="loginDisabled"
          >
            登录
          </x-button>
          <x-button action-type="button" link="/register">
            注册
          </x-button>
        </div>
      </form>
    </div>
  </view-box>
</template>

<script>
  import _ from 'lodash';

  export default {
    name: 'login',
    data() {
      return {
        selectIndex: this.$route.params.userType - 1,
        mobile: '',
        password: '',
        type: this.$route.params.userType,
        loginDisabled: true
      };
    },
    props: {
      userType: {
        type: Number,
        default: 1
      },
    },
    methods: {
      onSubmit(e) {
        e.preventDefault();

        const params = {
          mobile: this.mobile,
          password: this.password,
          type: this.type
        };

        this.$http.post('/user/login', params)
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              this.$router.push('/');
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '登录失败'
              });
            }
          });
      },
      setLoginDisabled() {
        if (!(this.mobile && this.password)) {
          this.loginDisabled = true;
        } else {
          this.loginDisabled = !(
            this.$refs.mobile.valid && this.$refs.password.valid
          );
        }
      },
      selectTab(index) {
        console.log(this);
        this.type = index + 1;
        this.selectIndex = index;
      }
    }
  };
</script>

<style scoped>
  .gm-login {
    padding-top: 20px;
  }

  .gm-login .form-items {
    margin-bottom: 20px;
  }

  .login-btn {
    padding: 0 15px;
  }
</style>
