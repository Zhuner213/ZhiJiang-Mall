// 引入 Vue
import Vue from 'vue';
// 引入 Vuex
import Vuex from 'vuex'
// 应用 Vuex 插件
Vue.use(Vuex)

// 引入小仓库
import home from './home'
import search from './search'
import detail from './detail';
import shopcart from './shopcart';
import users from './users';

// 创建并暴露 Vuex仓库
export default new Vuex.Store({
    // 实现 Vuex 模块式开发
    modules: {
        home,search,detail,shopcart,users
    }
})