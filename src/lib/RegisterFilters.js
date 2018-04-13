import _ from 'lodash';

export default (Vue) => {
  // 过滤货物列表
  Vue.filter('goodsFilterA', (goodsList, conditions) => {
    const startCityId = conditions.startPlace.city_id;

    const endCityId = conditions.endPlace.city_id;

    return _.filter(goodsList, goods => (
      goods.start_city === startCityId &&
      goods.end_city === endCityId
    ));
  });
};
