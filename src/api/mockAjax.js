// 对于 axios 进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
// nprogress 是一个对象，里面含有 start 和 done 方法
// start：进度条开始    done：进度条结束


// 1.利用 axios对象 的方法 create，去创建一个 axios实例
// 2.requests 就是 axios，只不过稍微配置一下
const mockAxios = axios.create({
    // 配置对象
    // 基础路径，发请求的时候，路径会自带 /mock
    baseURL: '/mock',
    // 代表请求超时的时间 5s
    timeout: 5000
})

// 请求拦截器：在发请求之前，请求拦截器可以监测到，可以在发出请求之前做一些操作
mockAxios.interceptors.request.use((config) => {
    // config：配置对象，里面有一个很重要的属性：headers 请求头
    // 进度条开始动
    nprogress.start()
    return config
})

// 响应拦截器
mockAxios.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来后，响应拦截器可以监测到，可以进行一些操作
    // 进度条结束
    nprogress.done()
    return res.data
}, (err) => {
    // 响应失败的回调函数
    return err
})

// 对外暴露
export default mockAxios