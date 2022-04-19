import Vue from 'vue'
import App from './App.vue'

// 单独按需引入 elementUI 的消息弹框
import { MessageBox } from 'element-ui';
// 引入 elementUI 的样式文件
import 'element-ui/lib/theme-chalk/index.css';
// 引入 api 文件
import * as api from './api'
// 引入路由文件
import {router} from './router'
// 引入 TypeNav 组件
import TypeNav from './components/TypeNav'
// 引入 Pagination 分页器组件
import Pagination from './components/Pagination'
// 引入 Vuex 仓库
import store from './store'
// 引入 mockServe.js ---- mock数据
import './mock/mockServe'
// 引入 swiper 的样式
import 'swiper/css/swiper.css'

Vue.component(MessageBox.name, MessageBox);
Vue.prototype.$msgbox = MessageBox;

// 把 TypeNav组件 注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 把 Pagination 分页器组件 注册为全局组件
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() { 
    // 安装全局事件总线
    Vue.prototype.$bus = this
    // 在 Vue 的原型上存放我们封装的所有 api 方法
    Vue.prototype.$api = api
  }
}).$mount('#app')
