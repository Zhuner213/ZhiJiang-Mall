// 编程式路由跳转到当前路由（参数不变），多次执行会抛出 NavigationDuplicated 的错误
// vue-router 引入了 Promise，在 push 或 replace 方法里传入成功和失败的回调就可以避免这种报错
// 因此，我们可以重写 push 和 replace 方法

// 引入Vue
import Vue from 'vue'
// 引入路由插件
import VueRouter from 'vue-router'
// 引入路由的配置对象
import routes from './routes'
// 使用路由插件
Vue.use(VueRouter)



// 创建并暴露路由实例
export const router = new VueRouter({
    routes,
    scrollBehavior() {
        // 始终滚动到顶部
        document.documentElement.scrollTop = 0;
        // return { top: 0}
      },
})

// 设置全局路由前置守卫
// router.beforeEach((to, from, next) => {
//     console.log('beforeEach', to, from)
//     next()
// })

// 设置全局路由后置守卫
// router.afterEach((to, from) => {
//     console.log('afterEach', to, from)
// })

// 重写 push 方法

// 先把本来的 push 方法保存一下，虽然说是重写，但我们本质上其实是封装一下，让他带有成功和失败的回调
// 真正使用的还是 vue-router 自带的 push 方法
const originPush = VueRouter.prototype.push

VueRouter.prototype.push = function(location, resolve, reject) {
    // 如果调用 push 方法的时候自己已经传了成功和失败的回调，那么我们直接调用 原生push 即可
    if(resolve && reject) {
        originPush.call(this, location, resolve, reject)
    }else { // 否则，我们就帮他写上成功和失败的回调
        originPush.call(this, location, ()=>{}, ()=>{})
    }
}

// 重写 replace 方法（同理）
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.replace = function(location, resolve, reject) {
    // 如果调用 push 方法的时候自己已经传了成功和失败的回调，那么我们直接调用 原生push 即可
    if(resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    }else { // 否则，我们就帮他写上成功和失败的回调
        originReplace.call(this, location, ()=>{}, ()=>{})
    }
}