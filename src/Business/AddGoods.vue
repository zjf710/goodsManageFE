<template>
  <div class="gm-add-goods">
    <div class="gm-add-goods-container">
      <group label-width="6em" label-margin-right="1em" label-align="justify">
        <popup-picker
          title="选择起始地*"
          placeholder="请选择起始地"
          :data="areas"
          :columns="3"
          v-model="startPlace"
          :display-format="formatAreas"
        />
        <x-input
          required
          title="详细地址*"
          v-model="startPlaceDetail"
          placeholder="请输入起始地详细地址"
        />
        <popup-picker
          title="选择目的地*"
          placeholder="请选择目的地"
          :data="areas"
          :columns="3"
          v-model="endPlace"
          :display-format="formatAreas"
        />
        <x-input
          required
          title="详细地址*"
          v-model="endPlaceDetail"
          placeholder="请输入目的地详细地址"
        />
        <cell
          title="车长/车型*"
          placeholder="请选择车长和车型"
          :value="`${carLong.join(' ')}${carLongInput ? ` ${carLongInput}` : ''}/${carType}`"
          is-link
          @click.native="carPropertyShow = true"
        />
        <div class="goods-type">
          <span>重货/泡货至少填写一项</span>
          <div>
            <input type="number" @change="(e)=>{goodsWeight = e.target.value}" placeholder="填写重货">吨
            <input type="number" @change="(e)=>{goodsVolume = e.target.value}" placeholder="填写泡货">立方米
          </div>
        </div>
      </group>
      <group class="goods-info" label-width="6em" label-margin-right="1em" label-align="justify">
        <group-title slot="title" class="goods-info-title">填写以下信息，节省电话时间</group-title>
        <x-input title="货物名称*" v-model="goodsName" placeholder="最多填写10个字" :max="10" />
        <popup-picker
          title="报价方"
          placeholder="请选择报价方"
          :data="priceSourceList"
          v-model="priceSource"
        />
        <popup-picker
          title="装卸方式"
          placeholder="请选择装卸方式"
          :data="loadTypeList"
          v-model="loadType"
          :display-format="(v) => `${v[0]}/${v[1]}`"
        />
        <datetime title="装车时间" v-model="loadTime" format="YYYY-MM-DD HH" />
        <popup-picker
          title="支付方式"
          placeholder="请选择支付方式"
          :data="payTypeList"
          v-model="payType"
        />
        <x-input title="货物运费" v-model="price" placeholder="请输入期望运价（单位：元）" />
        <x-textarea title="备注" v-model="comment" placeholder="最多填写140字" :max="140" :height="70" />
      </group>
      <div v-transfer-dom>
        <popup v-model="carPropertyShow">
          <div class="car-long-container">
            <h4>车长（最多选择三个）</h4>
            <checker
              v-model="carLong"
              type="check-box"
              default-item-class="car-check-item"
              selected-item-class="car-check-item-selected"
              disabled-item-class="car-check-item-disabled"
              :max="3"
              radioRequired
            >
              <checker-item
                :key="longValue"
                v-for="longValue in carLongList"
                :value="longValue"
                @on-item-click="onItemClick"
              >
                {{longValue}}
              </checker-item>
            </checker>
            <x-input v-model="carLongInput" class="long-input" placeholder="手动输入其他车长（单位：米）" />
          </div>
          <div class="car-long-container">
            <h4>车型</h4>
            <checker
              v-model="carType"
              radioRequired
              default-item-class="car-check-item"
              selected-item-class="car-check-item-selected"
              disabled-item-class="car-check-item-disabled"
            >
              <checker-item
                :key="typeValue"
                v-for="typeValue in carTypeList"
                :value="typeValue"
              >
                {{typeValue}}
              </checker-item>
            </checker>
          </div>
        </popup>
      </div>
    </div>
    <x-button class="submit-goods" type="primary" @click.native="submitGoods">提 交 货 源</x-button>
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { querystring } from 'vux';
  import { getLocalStorageCache } from '../components/utils/CacheService';

  export default {
    name: 'add-goods',
    data() {
      return {
        carPropertyShow: false,
        areas: [],
        carLongList: [],
        carLong: [],
        carLongInput: '',
        carTypeList: [],
        carType: '',
        startPlace: [],
        startPlaceDetail: '',
        endPlace: [],
        endPlaceDetail: '',
        priceSourceList: [['仅专线报价', '仅司机报价', '不限']],
        priceSource: [],
        loadTypeList: [
          ['包提送', '仅提货', '仅送货', '自提送'],
          ['一装一卸', '一装两卸', '一装多卸', '两装一卸', '两装两卸', '多装多卸']
        ],
        loadType: [],
        goodsWeight: '',
        goodsVolume: '',
        goodsName: '',
        price: '',
        loadTime: '',
        comment: '',
        payType: [],
        payTypeList: [['回单结账', '货到打卡', '现付+到付']]
      };
    },
    mounted() {
      // 获取地理位置列表
      this.getProvinces();
      // 获取车型车长列表
      this.getCarProperties();
    },
    methods: {
      formatAreas(value, name) {
        return name;
      },
      onItemClick(v) {
        if (this.carLong.length === 0) {
          this.carLong = [v];
        }
      },
      // 提交货物信息
      submitGoods() {
        const msg = this.validate();
        if (msg) {
          this.$vux.toast.show({
            text: msg
          });
          return;
        }

        const startPlace = _.map(this.startPlace, v => _.find(this.areas, o => o.value === v).name);
        const endPlace = _.map(this.endPlace, v => _.find(this.areas, o => o.value === v).name);

        const params = {
          startPlace: startPlace.join(' '),
          startProvince: this.startPlace[0],
          startCity: this.startPlace[1],
          startArea: this.startPlace[2],
          startPlaceDetail: this.startPlaceDetail,
          endPlace: endPlace.join(' '),
          endProvince: this.endPlace[0],
          endCity: this.endPlace[1],
          endArea: this.endPlace[2],
          endPlaceDetail: this.endPlaceDetail,
          carLong: `${this.carLong.join(' ')}${this.carLongInput ? `${this.carLongInput}` : ''}`,
          carType: this.carType,
          goodsWeight: this.goodsWeight,
          goodsVolume: this.goodsVolume,
          goodsName: this.goodsName,
          priceSource: this.priceSource.join(''),
          loadType: this.loadType.join('/'),
          loadTime: this.loadTime ? moment(this.loadTime).valueOf() : '',
          payType: this.payType.join(''),
          price: this.price,
          comment: this.comment,
          publishMan: getLocalStorageCache('user')
        };
        this.$http.post('/goods/publish', params)
          .then((res) => {
            const result = _.get(res, 'data', {});
            if (result.status === 200) {
              this.$vux.toast.show({
                type: 'success',
                width: '7.6em',
                text: result.message || '保存成功'
              });
              this.$router.push('/');
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: result.message || '保存失败'
              });
            }
          });
      },
      // 验证数据
      validate() {
        if (this.startPlace.length === 0) {
          return '请选择起始地';
        }
        if (!this.startPlaceDetail) {
          return '请填写起始地详细地址';
        }
        if (this.endPlace.length === 0) {
          return '请选择目的地';
        }
        if (!this.endPlaceDetail) {
          return '请填写目的地详细地址';
        }
        if (!this.goodsWeight && !this.goodsVolume) {
          return '重货/泡货至少填写一项';
        }
        if (!this.goodsName) {
          return '请填写货物名称';
        }
        return null;
      },
      // 获取车型车长列表
      getCarProperties() {
        this.$http.get(`/car/getProperties?${querystring.stringify({ types: ['long', 'type'] })}`)
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              const carLongList = [];
              const carTypeList = [];
              // 组装数据
              _.get(data, 'data').forEach((item) => {
                if (item.type === 'long') {
                  carLongList.push(item.value);
                } else {
                  carTypeList.push(item.value);
                }
              });

              this.carLongList = carLongList;
              this.carLong = [carLongList[0]];
              this.carTypeList = carTypeList;
              this.carType = carTypeList[0];
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询省份失败'
              });
            }
          });
      },
      // 获取省份
      getProvinces() {
        this.$http.get('/area/provinces')
          .then((res) => {
            const data = _.get(res, 'data', {});

            if (data.status === 200) {
              _.get(data, 'data').forEach((province) => {
                this.areas.push({
                  name: province.province,
                  value: province.provinceId,
                  parent: 0
                });
              });

              this.getCities();
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询省份失败'
              });
            }
          });
      },
      // 获取城市
      getCities() {
        this.$http.get('/area/cities')
          .then((res) => {
            const data = _.get(res, 'data', []);

            if (data.status === 200) {
              _.get(data, 'data').forEach((city) => {
                this.areas.push({
                  name: city.city,
                  value: city.cityId,
                  parent: city.provinceId
                });
              });

              this.getAreas();
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询城市失败'
              });
            }
          });
      },
      // 获取区县
      getAreas() {
        this.$http.get('/area/areas')
          .then((res) => {
            const data = _.get(res, 'data', []);

            if (data.status === 200) {
              _.get(data, 'data').forEach((area) => {
                this.areas.push({
                  name: area.area,
                  value: area.areaId,
                  parent: area.cityId
                });
              });
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询失败'
              });
            }
          });
      }
    }
  };
</script>

<style>
  .gm-add-goods {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }

  .gm-add-goods-container {
    height: 100%;
    width: 100%;
    overflow: scroll;
    position: relative;
  }

  .gm-add-goods .weui-cells {
    font-size: 14px;
  }

  .gm-add-goods .submit-goods {
    position: absolute;
    font-size: 14px;
    bottom: 0;
    height: 40px;
  }

  .gm-add-goods .goods-type {
    position: relative;
    padding: 5px 15px;
    font-size: 14px;
  }

  .gm-add-goods .goods-type:before {
    content: " ";
    position: absolute;
    left: 15px;
    top: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }

  .gm-add-goods .goods-type span {
    display: block;
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
  }

  .gm-add-goods .goods-type input {
    height: 26px;
    width: 100px;
    background: #eee;
    text-align: center;
    border-radius: 5px;
    margin: 0 5px 10px 10px;
  }

  .gm-add-goods .goods-info {
    margin-bottom: 50px;
  }

  .gm-add-goods .goods-info .goods-info-title {
    text-align: center;
    font-size: 12px;
  }

  .car-long-container {
    padding: 10px 15px;
    background: #fff;
    font-size: 12px;
  }

  .car-long-container h4 {
    font-weight: normal;
    color: #999;
    margin-bottom: 10px;
  }

  .car-long-container .long-input {
    border: 1px solid #D9D9D9;
    padding: 5px 10px;
    margin-top: 5px;
  }

  .car-long-container .long-input:before {
    border: none;
  }

  .car-check-item {
    background-color: #ddd;
    color: #222;
    padding: 5px 10px;
    margin-right: 10px;
    margin-bottom: 5px;
    line-height: 14px;
    border-radius: 15px;
  }

  .car-check-item-selected {
    background-color: #FF3B3B;
    color: #fff;
  }

  .car-check-item-disabled {
    color: #999;
  }
</style>
