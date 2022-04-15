// detail组件的小仓库
// 引入自己封装的请求商品详情信息的函数
import { reqGoodInfo } from "../../api";

const state = {
    goodInfo: {} // 商品的详情信息对象
}
const actions = {
    // 向服务器发请求，获取商品的详情
    async goodInfo({commit}, skuid) {
        const response = await reqGoodInfo(skuid)
        if(response.code === 200){
            commit('GOODINFO', response.data)
        }
    }
}
const mutations = {
    GOODINFO(state, value) {
        state.goodInfo = value
    }
}
// getters存在的作用就是简化数据
const getters = {
    // 提取出 goodInfo 中的页面左上角的面包屑信息
    categoryView(state) {
        // 这里返回空对象防止没数据时报错
        return state.goodInfo.categoryView || {}
    },
    // 提取出 goodInfo 中的 skuInfo（对商品的一些具体描述）
    skuInfo(state) {
        // 这里返回空对象防止没数据时报错
        return state.goodInfo.skuInfo || {}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}