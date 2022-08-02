<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>枝江商城欢迎您！</p>
          <p v-if="!userInfo">
            <router-link to="/login">你好，请登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
          <p v-else>
            <a>{{userInfo.nickName}}</a>
            <a class="register" @click="userLogout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/home">枝江商城首页</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <router-link to="/center">我的订单</router-link>
          <a>枝江商城会员</a>
          <a>企业采购</a>
          <a>关注嘉然</a>
          <a>合作招商</a>
          <a>商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.svg"/>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button 
            class="sui-btn btn-xlarge btn-danger" 
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "Header",
  data() {
    return {
      keyword: ''
    }
  },
  computed: {
    ...mapState('users',['userInfo'])
  },
  methods: {
    // 搜索按钮的回调函数，向search路由进行跳转，点击搜索按钮跳转至搜索页面
    goSearch() {
      // 路由传递参数
      // 第一种：字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())
      
      // 第二种：模版字符串形式
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

      // 第三种：配置对象形式

      const location = {name: 'search',params: {keyword: this.keyword}}

      // 如果当前页面还有 query参数 的话，跳转的时候还要带上 query参数
      location.query = this.$route.query

      // 跳转路由
      this.$router.push(location)

      // 清空搜索框
      this.keyword = ''
     
      // 面试题 1：路由传递参数（对象写法）path 是否可以结合 params 一起使用？
      // 答：不行，params 必须结合 name 一起使用
      // this.$router.push({path: '/search',params: {keyword: this.keyword},query: {k: this.keyword.toUpperCase()}})

      // 面试题 2：如何指定 params 参数可传可不传？
      // 答：在配置路由的时候，在占位的后面加上一个问号
      // 如果路由要求传递 params 参数但你没有传，那么URL会出现问题 （http://localhost:8080/#/?k=AVA）
      // this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}})

      // 面试题 3：params 参数可传可不传，但如果传递的是空串，怎么办？
      // 答：使用 undefined 解决
      // this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}})
    },
    // 用户退出登录
    userLogout() {
      // 向服务器发请求退出登录，
      this.$store.dispatch('users/userLogout')
    }
  },
  mounted() {
    // header组件挂载完毕就向服务器发请求获取登录用户的信息
    this.$store.dispatch('users/getUserInfo')
  },
};
</script>

<style lang="less">
    .header {
        background: #fff;
        &>.top {
            background-color: #474747;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;
                font-size: 12px;
                color: #CCC;

                a {
                    color: #CCC;
                }
                
                a:hover {
                    color: #fff;
                }

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                  height: 0;
                  
                    img {
                        width: 100px;
                        // margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        // box-sizing: border-box;
                        width: 490px;
                        height: 30px;
                        padding: 0px 4px;
                        line-height: 32px;
                        border: 1px solid #CCC;
                        float: left;
                        transition: all .1s linear;

                        &:focus {
                            outline: none;
                            width: 488px;
                            height: 28px;
                            line-height: 28px;
                            border: 2px solid #e32332;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #e32332;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>