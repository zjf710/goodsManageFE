import Main from './Business/Main';
import Home from './Business/Home';
import addGoods from './Business/addGoods';
import Login from './Business/Login';
import Register from './Business/Register';
import UserCenter from './Business/UserCenter';
import UserOrders from './Business/UserOrders';

export default [{
  path: '/',
  component: Main,
  children: [{
    path: '/',
    component: Home
  }, {
    path: '/addGoods',
    component: addGoods
  }, {
    path: '/center',
    component: UserCenter
  }]
}, {
  path: '/userOrders',
  component: UserOrders
}, {
  path: '/login',
  redirect: '/login/1'
}, {
  path: '/login/:userType',
  component: Login
}, {
  path: '/register',
  component: Register
}];
