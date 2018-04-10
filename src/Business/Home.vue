<template>
  <div class="gm-goods-list">
    <div class="empty-text" v-if="goodsList.length === 0">
      暂无数据
    </div>
    <div class="goods-item" v-for="goods in goodsList">
      <div class="goods-info" @click="doShowDetail(goods)">
        <p>{{goods.start_place}} — {{goods.end_place}}</p>
        <p>{{goods.car_long}} / {{goods.car_type}}</p>
        <p>{{goods.username}} / {{getTime(goods.create_time)}}</p>
      </div>
      <a class="phone" :href="`tel:${goods.publish_man}`">
        <svg slot="icon" class="svg-icon" aria-hidden="true">
          <use xlink:href="#icon-phone"></use>
        </svg>
      </a>
    </div>
    <div v-transfer-dom>
      <x-dialog v-model="showDetail" class="goods-info-dialog" hide-on-blur>
        <div class="goods-info-detail">
          <div class="goods-detail-title" slot="title">
            货物详情
          </div>
          <group class="goods-detail-container" label-width="5em" gutter="0">
            <cell title="发布人">{{goodsInfo.username}}</cell>
            <cell title="货物名">{{goodsInfo.goods_name}}</cell>
            <cell title="起始地">{{goodsInfo.start_place}}</cell>
            <cell title="起始地详细">{{goodsInfo.start_place_detail}}</cell>
            <cell title="目的地">{{goodsInfo.end_place}}</cell>
            <cell title="目的地详细">{{goodsInfo.end_place_detail}}</cell>
            <cell title="车长要求">{{goodsInfo.car_long}}</cell>
            <cell title="车型要求">{{goodsInfo.car_type}}</cell>
            <cell v-if="goodsInfo.goods_weight" title="重货">{{goodsInfo.goods_weight}}吨</cell>
            <cell v-if="goodsInfo.goods_volume" title="泡货">{{goodsInfo.goods_volume}}立方米</cell>
            <cell v-if="goodsInfo.price_source" title="报价方">{{goodsInfo.price_source}}</cell>
            <cell v-if="goodsInfo.load_type" title="装卸方式">{{goodsInfo.load_type}}</cell>
            <cell v-if="goodsInfo.load_time" title="装车时间">{{getTime(goodsInfo.load_time)}}</cell>
            <cell v-if="goodsInfo.pay_type" title="支付方式">{{goodsInfo.pay_type}}</cell>
            <cell v-if="goodsInfo.price" title="货物运费">{{goodsInfo.price}}</cell>
            <cell v-if="goodsInfo.comment" title="备注">{{goodsInfo.comment}}</cell>
          </group>
          <flexbox class="btn-container">
            <flexbox-item v-if="userType === 2">
              <x-button type="primary" @click.native="takeOrder">接单</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button type="warn" @click.native="showDetail=false">关闭</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { getLocalStorageCache } from '../components/utils/CacheService';

  export default {
    name: 'home',
    data() {
      const userType = getLocalStorageCache('userType');

      return {
        userType,
        goodsList: [],
        goodsInfo: {},
        showDetail: false
      };
    },
    mounted() {
      this.getGoods();
    },
    methods: {
      getTime(timestamp) {
        return moment(timestamp).format('YYYY-MM-DD HH:mm');
      },
      doShowDetail(goods) {
        this.showDetail = true;
        this.goodsInfo = goods;
      },
      takeOrder() {
        const user = getLocalStorageCache('user');

        const params = {
          status: 1,
          orderTaker: user,
          id: this.goodsInfo.id
        };

        this.$http.post('/goods/takeOrder', params)
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              this.getGoods();
              this.showDetail = false;
              this.goodsInfo = {};
              this.$vux.toast.show({
                type: 'success',
                width: '7.6em',
                text: data.message || '接单成功'
              });
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '接单失败，请重试'
              });
            }
          });
      },
      getGoods() {
        this.$http.get('/goods/getGoods?status=0')
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              this.goodsList = data.data;
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询货源失败'
              });
            }
          });
      }
    }
  };
</script>

<style>
  .gm-goods-list {
    height: 100%;
    overflow: scroll;
  }

  .gm-goods-list .empty-text {
    text-align: center;
    color: #999;
    margin-top: 100px;
  }

  .gm-goods-list .goods-item {
    padding: 10px 15px;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    background-color: #fff;
  }

  .gm-goods-list .goods-item .goods-info {
    flex: 1;
    font-size: 12px;
    color: #333;
  }

  .gm-goods-list .goods-item .phone {
    font-size: 12px;
    color: #333;
  }

  .goods-info-detail {
    text-align: left;
    font-size: 12px;
  }

  .goods-info-detail .goods-detail-container {
    max-height: 400px;
    overflow: scroll;
  }

  .goods-info-detail .goods-detail-title {
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: #000;
  }

  .goods-info-detail .btn-container {
    padding: 15px 15px;
    box-sizing: border-box;
  }

  .goods-info-detail button {
    font-size: 14px;
  }

  .goods-info-detail .weui-cells {
    font-size: 14px;
  }

  .goods-info-detail .weui-cells .weui-cell {
    padding: 5px 15px;
  }
</style>
