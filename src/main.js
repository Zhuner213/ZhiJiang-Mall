import Vue from 'vue'
import App from './App.vue'

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
// 把 TypeNav组件 注册为全局组件
Vue.component(TypeNav.name, TypeNav)
// 把 Pagination 分页器组件 注册为全局组件
Vue.component(Pagination.name, Pagination)

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() { // 安装全局事件总线
    Vue.prototype.$bus = this
  }
}).$mount('#app')
