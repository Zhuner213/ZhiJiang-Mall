// 引入路由组件
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Search from '../pages/Search'
import Detail from '../pages/Detail'
import AddCartSuccess from '../pages/AddCartSuccess'
import ShopCart from '../pages/ShopCart'

export default [
    {
        name: 'home',
        path: '/home',
        component: Home,
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
        }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: Detail,
        meta: {
            showFooter: true, // 在当前路由是否展示 Footer组件
        }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess/:skuid/:skuNum',
        component: AddCartSuccess,
        meta: {
            showFooter: true // 在当前路由是否展示 Footer组件
        }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: {
            showFooter: true // 在当前路由是否展示 Footer组件
        }

    },
    // 进行路由的重定向，使页面一进去就是主页
    {
        path: '/',
        redirect: '/home'
    }
]