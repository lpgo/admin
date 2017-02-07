import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store'
import Vuex from 'vuex'
import NProgress from 'nprogress'//页面顶部进度条
import 'nprogress/nprogress.css'

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import AddMerchant from './components/nav1/AddMerchant.vue'
import ModifyMerchant from './components/nav1/ModifyMerchant.vue'
import MerchantPay from './components/nav1/MerchantPay.vue'
import HotelInfo from './components/nav2/HotelInfo.vue'
import AddWaiter from './components/nav2/AddWaiter.vue'
import DeskConfig from './components/nav2/DeskConfig.vue'
import Statistics from './components/nav2/Statistics.vue'
import MenuConfig from './components/nav2/MenuConfig.vue'
import echarts from './components/charts/echarts.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)

const routes = [
  {
    path: '/login',
    component: Login,
    hidden: true//不显示在导航中
  },
  //admin:1,operator:2,manager:3,waiter:4,client:5,unknown:6,
  {
    path: '/',
    component: Home,
    name: '商户管理',
    iconCls: 'el-icon-message',//图标样式class
    children: [
      //{ path: '/main', component: Main },
      { path: '/addMerchant', component: AddMerchant, name: '添加商户' },
      { path: '/modifyMerchant', component: ModifyMerchant, name: '商户修改' },
      { path: '/merchantPay', component: MerchantPay, name: '商户续费' },
    ],
    role:1
  },
  {
    path: '/',
    component: Home,
    name: '饭店管理',
    iconCls: 'fa fa-id-card-o',
    children: [
      { path: '/menuConfig', component: MenuConfig, name: '菜单配置' },
      { path: '/hotelInfo', component: HotelInfo, name: '基本信息' },
      { path: '/addWaiter', component: AddWaiter, name: '添加服务员' },
      { path: '/deskConfig', component: DeskConfig, name: '餐桌配置' },
      { path: '/statistics', component: Statistics, name: '消费统计' },
    ],
    role:3
  },
  {
    path: '/',
    component: Home,
    name: 'Charts',
    iconCls: 'fa fa-bar-chart',
    children: [
      { path: '/echarts', component: echarts, name: 'echarts' }
    ],
    role:1
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next()
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(Login)
}).$mount('#app')

//router.replace('/login')

