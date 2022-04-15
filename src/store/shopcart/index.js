// ShopCart组件 自己的小仓库
// 引入自己封装的请求购物车列表的函数
import { reqGetCartList } from "../../api";
// 引入自己封装的 更新购物车列表 和 删除购物车商品 和 切换商品选中状态 的函数
import {addToCartOrUpdate, reqDeleteCart, reqChangeCheck} from '../../api'

const state = {
    cartData: [] // 服务器返回的购物车列表的初始数据
}
const actions = {
    // 获取购物车列表
    async getCartList({commit}) {
        const response = await reqGetCartList()
        if(response.code == 200) {
            commit('CARTLIST', response.data)
        }
    },
    // 更新购物车列表
    async updateCartList({commit}, {skuid, skuNum}) {
        const response = await addToCartOrUpdate(skuid, skuNum)
        if(response.code == 200) {
            return 'ok'
        }else {
            throw new Error('失败了！')
        }
    },
    // 删除购物车商品
    async deleteCart({commit}, skuid) {
        const response = await reqDeleteCart(skuid)
        if(response.code == 200) {
            return 'ok'
        }else{
            throw new Error('失败了！')
        }
    },
    // 切换商品选中状态
    async changeCheck({commit},{skuid,isChecked}) {
        const response = await reqChangeCheck(skuid,isChecked)
        if(response.code == 200) {
            return 'ok'
        }else {
            throw new Error('失败了！')
        }
    }
}
const mutations = {
    CARTLIST(state, value) {
        state.cartData = value
    }
}
const getters = {
    // 简化出我们真正需要的购物车列表数据
    cartData(state) {
        return state.cartData[0] || {}
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}