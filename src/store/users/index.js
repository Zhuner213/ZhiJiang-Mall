// 登录与注册 组件的小仓库
// 引入我们自己封装的 请求注册验证码、用户注册、用户登录、退出登录、自动登录 的函数
import { reqGetCode,reqUserLogin,reqUserRegister,reqGetUserInfo,reqUserLogout } from "../../api";
// 引入路由文件
import {router} from '../../router'

const state = {
    userInfo:null // 登录用户的信息（这里初始值不设为{}的原因是 {}转为布尔值是true，不符合逻辑判断要求） 
}
const actions = {
    // 获取注册验证码
    async getCode(context, phone) {
        const response = await reqGetCode(phone)
        if(response.code == 200) {
            return response.data
        }else {
            throw new Error('出错了！')
        }
    },
    // 用户注册
    async userRegister(context, infoObj) {
        const response = await reqUserRegister(infoObj)
        if(response.code == 200) {
            return 'ok'
        }else{
            throw new Error(response.message)
        }
    },
    // 用户登录
    async userLogin(context,infoObj) {
        const response = await reqUserLogin(infoObj)
        if(response.code == 200) {
            console.log('登录成功')
            // 将登录成功用户的 token 进行本地存储
            localStorage.setItem('token',response.data.token)
            return response.data
        }else {
            throw new Error(response.message)
        }
    },
    // 用户退出登录
    async userLogout({commit}) {
        // 向服务器发请求清除登录用户的token
        const response = await reqUserLogout()
        if(response.code == 200) {
            // 若服务器那边清除成功，则我们前台这边也要清除相关数据（ 本地存储的token 和 仓库中的userInfo ）
            alert('退出成功！')
            localStorage.clear('token')
            commit('USERLOGOUT')
        }
    },
    // 获取登录用户信息（自动登录）
    // 自动登录的前提是本地存储有用户token，然后你本地有的话发请求的请求头中的 token才不为 null
    // 若是本地没有存储用户token，则不应判断进入自动登录的流程
    async getUserInfo({commit}) {
        const response = await reqGetUserInfo()
        if(response.code == 200) {
            commit('GETUSERINFO',response.data)
            console.log('获取用户信息成功')
        }else {
            //走else说明可能是两种情况：（分为 本地存储着token 和 本地未存储token）
            //  1.（本地未存储token）用户以游客状态进入，还未进行过登录操作 或 用户退出了登录
            if(!localStorage.getItem('token')) {
                console.log('你现在是游客状态或你已经退出了登录',response)
            }else {
            //  2.（本地存储着token）用户已经登录过了，
                // 返回code208，显示'未登录'，这是服务器那边你的token已经失效了
                // PS：之前的问题是，假如用户以游客身份进来，我这里提醒用户登录过期需重新登录并跳转到登录页了
                // 这时要提醒用户登录过期了，并删除本地存储的token，
                console.log('你已经登录了但服务器显示你未登录',response)
                localStorage.clear('token')
                alert('登录已过期，请重新登录')
            }
            
        }
    } 
}
const mutations = {
    // 将发请求获取到的 登录的用户信息 存储于仓库中
    GETUSERINFO(state,value) {
        state.userInfo = value
    },
    // 清除仓库中的 userInfo 信息
    USERLOGOUT(state) {
        state.userInfo = null
    }
}
const getters = {}

export default {
    // 开启命名空间
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}