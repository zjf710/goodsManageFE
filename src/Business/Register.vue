<template>
  <view-box>
    <x-header slot="header">注册</x-header>
    <div class="gm-register">
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
            v-if="type === 1"
            ref="company"
            required
            title="公司名称"
            v-model="company"
            @on-change="setRegisterDisabled"
            placeholder="请输入公司名称"
          />
          <x-input
            ref="idCard"
            required
            :is-type="idCardValidate"
            title="身份证号"
            v-model="idCard"
            @on-change="setRegisterDisabled"
            placeholder="请输入身份证号"
          />
          <x-input
            ref="username"
            required
            :is-type="idCardValidate"
            title="名字"
            v-model="username"
            @on-change="setRegisterDisabled"
            placeholder="请输入您的名字"
          />
          <x-input
            ref="mobile"
            required
            is-type="china-mobile"
            title="手机号"
            v-model="mobile"
            @on-change="setRegisterDisabled"
            placeholder="请输入手机号码"
          />
          <x-input
            ref="password"
            required
            type="password"
            title="密码"
            v-model="password"
            @on-change="setRegisterDisabled"
            placeholder="请输入密码"
          />
          <x-input
            ref="confirmPassword"
            required
            type="password"
            title="确认密码"
            v-model="confirmPassword"
            @on-change="setRegisterDisabled"
            placeholder="请再次输入密码"
          />
        </group>
        <div class="register-btn">
          <x-button
            type="primary"
            action-type="submit"
            :disabled="registerDisabled"
          >
            注册
          </x-button>
        </div>
      </form>
    </div>
  </view-box>
</template>

<script>
  import _ from 'lodash';
  import { md5 } from 'vux';

  export default {
    name: 'register',
    data() {
      return {
        selectIndex: 0,
        mobile: '',
        company: '',
        idCard: '',
        password: '',
        confirmPassword: '',
        username: '',
        type: 1,
        registerDisabled: true
      };
    },
    methods: {
      idCardValidate() {
        return {
          valid: this.idCard && /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(this.idCard),
          msg: '身份证格式错误'
        };
      },
      validateMsg() {
        if (this.password !== this.confirmPassword) {
          return '两次输入的密码不同，请确认';
        }
        return null;
      },
      onSubmit(e) {
        e.preventDefault();

        const msg = this.validateMsg();

        if (msg) {
          this.$vux.toast.show({
            text: msg
          });
          return;
        }

        const params = {
          mobile: this.mobile,
          company: this.company,
          idCard: this.idCard,
          username: this.username,
          password: md5(this.password),
          confirmPassword: md5(this.confirmPassword),
          type: this.type
        };

        this.$http.post('/user/register', params)
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              this.$vux.toast.show({
                type: 'success',
                width: '7.6em',
                text: '成功注册，请登录'
              });
              this.$router.push(`/login/${this.type}`);
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '注册失败'
              });
            }
          });
      },
      setRegisterDisabled() {
        if (!(this.mobile && this.password && this.username &&
            this.confirmPassword && this.idCard &&
            (this.company || this.type === 2))) {
          this.registerDisabled = true;
        } else {
          this.registerDisabled = !(
            this.$refs.mobile.valid &&
            this.$refs.idCard.valid
          );
        }
      },
      selectTab(index) {
        this.type = index + 1;
        this.selectIndex = index;
      }
    }
  };
</script>


<style scoped>
  .gm-register {
    padding-top: 20px;
  }

  .gm-register .form-items {
    margin-bottom: 20px;
  }

  .register-btn {
    padding: 0 15px;
  }
</style>
