// 先引入 mockjs 模块
import Mock from 'mockjs'
// 把 json 数据格式引入进来【json数据根本没有对外暴露，但是可以引入】
// webpack默认对外暴露的：图片、json数据格式
// 首页轮播图的数据
import banner from './banner.json'
// 首页下方floor区的数据
import floor from './floor.json'
// 订单结算页面收货人的信息
import userAddressList from './userAddressList.json'

// mock数据：第一个参数是：请求地址，第二个参数是：请求数据
Mock.mock('/mock/banner', {code:200,data:banner})
Mock.mock('/mock/floor', {code:200,data:floor})
Mock.mock('/mock/userAddressList', {code:200,data:userAddressList})
