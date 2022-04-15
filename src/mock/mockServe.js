// 先引入 mockjs 模块
import Mock from 'mockjs'
// 把 json 数据格式引入进来【json数据根本没有对外暴露，但是可以引入】
// webpack默认对外暴露的：图片、json数据格式
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数是：请求地址，第二个参数是：请求数据
Mock.mock('/mock/banner', {code:200,data:banner})
Mock.mock('/mock/floor', {code:200,data:floor})
