<template>
  <div class="gm-goods-filter">
    <div class="place-selector" @click="showStart = true">
      <span :class="startPlaceText ? '' : 'selector-placeholder'">
        {{startPlaceText || '起始地'}}
      </span>
      <svg slot="icon" class="svg-icon" aria-hidden="true">
        <use xlink:href="#icon-down"></use>
      </svg>
    </div>
    <div class="place-selector" @click="showEnd = true">
      <span :class="endPlaceText ? '' : 'selector-placeholder'">
        {{endPlaceText || '目的地'}}
      </span>
      <svg slot="icon" class="svg-icon" aria-hidden="true">
        <use xlink:href="#icon-down"></use>
      </svg>
    </div>
    <popup-picker
      placeholder="起始地"
      :show.sync="showStart"
      :show-cell="false"
      :data="areas"
      :columns="2"
      v-model="startPlace"
      :display-format="formatAreas(0)"
    />
    <popup-picker
      placeholder="目的地"
      :show.sync="showEnd"
      :show-cell="false"
      :data="areas"
      :columns="2"
      v-model="endPlace"
      :display-format="formatAreas(1)"
    />
  </div>
</template>

<script>
  import _ from 'lodash';
  import moment from 'moment';
  import { getLocalStorageCache, setLocalStorageCache } from '../utils/CacheService';

  // 7天过期
  const expire = moment().valueOf() + (7 * 24 * 60 * 60 * 1000);

  export default {
    name: 'goods-filter',
    data() {
      return {
        showStart: false,
        showEnd: false,
        startPlace: [],
        startPlaceText: '',
        endPlace: [],
        endPlaceText: '',
        conditions: {}
      };
    },
    beforeMount() {
      // 获取地理位置列表
      const areas = getLocalStorageCache('areas');
      if (areas) {
        this.setArea(_.filter(areas, o => o.type !== 'area'));
      } else {
        this.getProvinces();
      }
    },
    methods: {
      setArea(area) {
        const allArea = [{
          name: '所有省',
          value: '-1',
          parent: 0
        }, {
          name: '所有市',
          value: '-2',
          parent: '-1'
        }];

        this.areas = allArea.concat(area);
      },
      formatAreas(flag) {
        return (value, name) => {
          if (flag === 0) {
            this.startPlaceText = name;
          } else {
            this.endPlaceText = name;
          }

          return name;
        };
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
                  parent: 0,
                  type: 'province'
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
                  parent: city.provinceId,
                  type: 'city'
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
              const areas = _.cloneDeep(this.areas);
              _.get(data, 'data').forEach((area) => {
                areas.push({
                  name: area.area,
                  value: area.areaId,
                  parent: area.cityId,
                  type: 'area'
                });
              });

              setLocalStorageCache('areas', areas, expire);
            } else {
              this.$vux.toast.show({
                type: 'cancel',
                width: '7.6em',
                text: data.message || '查询失败'
              });
            }
          });
      }
    },
    watch: {
      startPlace(startPlace) {
        this.conditions.startPlace = {
          province_id: startPlace[0] > 0 ? startPlace[0] : 0,
          city_id: startPlace[1] > 0 ? startPlace[1] : 0
        };

        this.$emit('on-change', this.conditions);
      },
      endPlace(endPlace) {
        this.conditions.endPlace = {
          province_id: endPlace[0] > 0 ? endPlace[0] : 0,
          city_id: endPlace[1] > 0 ? endPlace[1] : 0
        };
        this.$emit('on-change', this.conditions);
      }
    }
  };
</script>

<style>
  .gm-goods-filter {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    background: #fff;
    margin-bottom: 15px;
    border-bottom: 1px solid #d9d9d9;
    font-size: 14px;
  }

  .gm-goods-filter .place-selector {
    flex: 1;
    box-sizing: border-box;
    padding: 0 15px;
    color: #666;
  }

  .gm-goods-filter .place-selector:first-child {
    border-right: 1px solid #d9d9d9;
  }

  .gm-goods-filter .place-selector .selector-placeholder {
    color: #999;
  }

  .gm-goods-filter .place-selector span {
    display: inline-block;
    width: calc(100% - 21px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .gm-goods-filter .place-selector .svg-icon {
    height: 40px;
    width: 14px;
    float: right;
  }
</style>
