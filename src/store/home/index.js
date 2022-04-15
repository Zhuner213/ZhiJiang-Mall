// home组件的小仓库
// 引入我们自己封装的发送请求的函数
import {reqCategoryList,reqBannerList,reqFloorList} from '../../api'

const state = {
    categoryList: [], // 三级联动菜单列表数据
    bannerList: [], // 首页轮播图数据
    floorList: [], // Floor组件整体数据
}

const actions = {
    // 向服务器发送请求，获取三级联动的菜单列表
    async categoryList(context) {
        const response = await reqCategoryList()
        if(response.code === 200) {
            context.commit('CATEGORYLIST', response.data)
        }else {
            console.log(response.message)
        }
    },
    // 发送请求，从 mock 获取首页轮播图的图片数据
    async bannerList(context) {
        const response = await reqBannerList()
        if(response.code === 200) {
            context.commit('BANNERLIST', response.data)
        }
    },
    // 发送请求，从 mock 获取首页 Floor组件 轮播图的图片数据
    async floorList(context) {
        const response = await reqFloorList()
        if(response.code === 200) {
            context.commit('FLOORLIST', response.data)
        }
    }
}

const mutations = {
    // 接收到从 actions 传来的列表数据，并存储于 state 中
    CATEGORYLIST(state, value) {
        state.categoryList = value
    },
    BANNERLIST(state, value) {
        state.bannerList = value
    },
    FLOORLIST(state, value) {
        state.floorList = value
    }
}

const getters = {}

export default {
    namespaced: true, // 开启命名空间
    state,
    actions,
    mutations,
    getters
}