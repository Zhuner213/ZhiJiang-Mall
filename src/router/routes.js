// 引入路由组件
// 优化为路由懒加载

export default [
    {
        name: 'home',
        path: '/home',
        component: () => import('../pages/Home'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        }
    },
    {
        path: '/login',
        component: () => import('../pages/Login'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: false, // 在当前路由是否展示 Header组件
        }
    },
    {
        path: '/register',
        component: () => import('../pages/Register'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: false, // 在当前路由是否展示 Header组件
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: () => import('../pages/Search'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: () => import('../pages/Detail'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess/:skuid/:skuNum',
        component: () => import('../pages/AddCartSuccess'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true // 在当前路由是否展示 Header组件
        },
        beforeEnter: (to, from, next) => {
            // 在用户已登录的情况下
            // 成功加入购物车页面只应由商品详情页过来
            if(from.path.indexOf('/detail') != -1) {
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: '/shopcart',
        component: () => import('../pages/ShopCart'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true // 在当前路由是否展示 Header组件
        }

    },
    {
        name: 'trade',
        path: '/trade',
        component: () => import('../pages/Trade'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        },
        beforeEnter: (to, from, next) => {
            // 订单交易页只能由点击购物车页面的结算进来
            if(from.path.indexOf('/shopcart') != -1) {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'pay',
        path: '/pay',
        component: () => import('../pages/Pay'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        },
        beforeEnter: (to, from, next) => {
            // 支付页只能由订单交易页面进来
            if(from.path.indexOf('/trade') != -1) {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: () => import('../pages/PaySuccess'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        },
        beforeEnter: (to, from, next) => {
            // 支付成功页只能由支付页面进来
            if(from.path.indexOf('/trade') != -1) {
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'center',
        path: '/center',
        component: () => import('../pages/Center'),
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
            showHeader: true, // 在当前路由是否展示 Header组件
        }
    },
    // 进行路由的重定向，使页面一进去就是主页
    {
        path: '/',
        redirect: '/home'
    },
    // 进行路由的重定向，用户输入单纯的detail不带商品id会 重定向到home页面
    {
        path: '/detail',
        redirect: '/home'
    }
]