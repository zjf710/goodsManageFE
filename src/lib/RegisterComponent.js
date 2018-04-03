import {
  Group,
  GroupTitle,
  Cell,
  Popup,
  XInput,
  XDialog,
  XButton,
  XHeader,
  Tabbar,
  TabbarItem,
  ButtonTab,
  ButtonTabItem,
  Search,
  CheckIcon,
  ToastPlugin,
  LoadingPlugin
} from 'vux';

import ViewBox from '../components/ViewBox/ViewBox';

// 注册组件
export default (VueTemp) => {
  const Vue = VueTemp;

  // 第三方组件
  Vue.component('XButton', XButton);
  Vue.component('group', Group);
  Vue.component('groupTitle', GroupTitle);
  Vue.component('cell', Cell);
  Vue.component('XInput', XInput);
  Vue.component('popup', Popup);
  Vue.component('search', Search);
  Vue.component('checkIcon', CheckIcon);
  Vue.component('XDialog', XDialog);
  Vue.component('XHeader', XHeader);
  Vue.component('Tabbar', Tabbar);
  Vue.component('TabbarItem', TabbarItem);
  Vue.component('ButtonTab', ButtonTab);
  Vue.component('ButtonTabItem', ButtonTabItem);

  // 本地组件
  Vue.component('viewBox', ViewBox);

  // toast工具，设置默认值
  Vue.use(ToastPlugin, {
    type: 'text',
    position: 'middle',
    width: '80%',
    time: 3000
  });
  // loading工具
  Vue.use(LoadingPlugin);
};
