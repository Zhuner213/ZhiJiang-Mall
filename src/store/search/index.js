// search组件的小仓库
// 引入 自己封装的请求数据的方法
import { reqSearchInfo } from "../../api"
const state = {
    searchList: {} // search组件整体数据
}
const actions = {
    // 向服务器发请求获取 Search组件的信息
    async searchList(context, params={}) {
        const response = await reqSearchInfo(params)
        if(response.code === 200) {
            context.commit('SEARCHLIST', response.data)
        }
    }
}
const mutations = {
    SEARCHLIST(state, value) {
        state.searchList = value
    }
}

// 简化组件对 state中 数据的提取
const getters = {
    // 搜索到的商品的列表
    goodsList(state) {
        // state.searchList.goodsList 如果网络没问题请求成功，服务器返回来的是一个数组
        // 但如果网络不行，state.searchList.goodsList 的值则会为 undefined
        // 以防万一，这里至少给一个空数组
        return state.searchList.goodsList || []
    },
    // 各种品牌的列表
    trademarkList(state) {
        return state.searchList.trademarkList || []
    },
    // 商品属性的列表
    attrsList(state) {
        return state.searchList.attrsList || []
    }
}

export default {
    namespaced: true, // 开启命名空间
    state,
    actions,
    mutations,
    getters
}