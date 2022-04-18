// 此文件对所有的 API 进行统一管理
import myAxios from "./request"; 
import mockAxios from './mockAjax'

// mock接口

// 获取首页 banner 轮播图的 mock数据
export const reqBannerList = () => mockAxios({url:'/banner',method:'get'})

// 获取首页 Floor组件整体的 mock数据
export const reqFloorList = () => mockAxios({url:'/floor',method:'get'})

// 获取收件人信息的 mock数据
export const reqUserAddressList = () => mockAxios({url:'/userAddressList',method:'get'})

// 真实API接口

// 三级联动接口
// /api/product/getBaseCategoryList     请求方式：get   无参数
export const reqCategoryList = () => myAxios({url:'/product/getBaseCategoryList',method:'get'})

// 获取 Search组件的数据
export const reqSearchInfo = (params) => myAxios({url:'/list',method:'post',data:params})

// 获取商品详情的数据
// /api/item/{ skuId }  请求方式：get   参数：skuid
export const reqGoodInfo = (skuid) => myAxios({url:`/item/${skuid}`,method:'get'})

//将商品添加到购物车 或 对购物车中已有的商品进行数量改动
// /api/cart/addToCart/{ skuId }/{ skuNum }     请求方式：post     参数：skuid、skuNum
export const addToCartOrUpdate = (skuid,skuNum) => myAxios({url:`/cart/addToCart/${skuid}/${skuNum}`,method:'post'})

// 获取购物车列表
// /api/cart/cartList   请求方式：get   无参数
export const reqGetCartList = () => myAxios({url:'/cart/cartList',method:'get'})

// 删除购物车商品
// /api/cart/deleteCart/{skuId}     请求方式：delete    参数：skuid
export const reqDeleteCart = (skuid) => myAxios({url:`/cart/deleteCart/${skuid}`,method:'delete'})

// 切换商品选中状态
// /api/cart/checkCart/{skuID}/{isChecked}      请求方式：get   参数：skuid、isChecked
export const reqChangeCheck = (skuid,isChecked) => myAxios({url:`/cart/checkCart/${skuid}/${isChecked}`,method:'get'})

// 获取注册验证码
// /api/user/passport/sendCode/phone        请求方式：get   参数：phone（String）
export const reqGetCode = (phone) => myAxios({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 用户注册
// /api/user/passport/register      请求方式：post  参数：phone、password、code、nickName(非必要)
export const reqUserRegister = (data) => myAxios({url:`/user/passport/register`,method:'post',data})

// 用户登陆
// /api/user/passport/login     请求方式：post  参数：phone、password
export const reqUserLogin = (data) => myAxios({url:`/user/passport/login`,method:'post',data})

// 用户退出登录 注：发送此请求只是服务器清除 后台保存的token，前台的数据还需自己清除 注：在请求头中要携带用户token以识别身份
// /api/user/passport/logout        请求方式：get
export const reqUserLogout = () => myAxios({url:'/user/passport/logout',method:'get'})

// 自动登录（获取用户信息）注：在请求头中要携带用户token以识别身份
// /api/user/passport/auth/getUserInfo      请求方式：get   
export const reqGetUserInfo = () => myAxios({url:'/user/passport/auth/getUserInfo',method:'get'})

// 获取订单交易信息
// /api/order/auth/trade    请求方式：get   参数：无
export const reqGetTradeInfo = () => myAxios({url:'/order/auth/trade',method:'get'})