<template>
  <div class="login-container">
    <!-- 顶部logo栏 -->
    <div class="header">
      <div class="logo-nav clearfix">
        <img class="fl" src="./images/logo.png" @click="goHome">
        <h1 class="fl">欢迎登录</h1>
        <div class="ask fr"><i class="iconfont icon-icon-test4"></i> 调查问卷</div>
      </div>
    </div>
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form action="##">
              <div class="input-text clearFix">
                <span>
                  <i class="iconfont icon-icon-test37"></i>
                </span>
                <input type="text" placeholder="手机号" v-model="phone">
              </div>
              <div class="input-text clearFix">
                <span>
                  <i class="iconfont icon-icon-test28"></i>
                </span>
                <input type="password" placeholder="请输入密码" v-model="password">
              </div>
              <div class="setting clearFix">
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click="userLogin">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><i class="iconfont icon-icon-test79"></i></li>
                <li><i class="iconfont icon-icon-test80"></i></li>
                <li><i class="iconfont icon-icon-test82"></i></li>
                <li><i class="iconfont icon-icon-test75"></i></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        // 用户手机号
        phone: '',
        // 用户的密码
        password: ''
      }
    },
    methods: {
      // 点击logo跳转至主页
      goHome() {
        this.$router.push('/home')
      },
      // 用户登录
      async userLogin() {
        // 封装用户登录信息的对象
        const infoObj = {
          phone: this.phone,
          password: this.password
        }
        // 点击登录按钮，向服务器发送请求获取登录数据
        try {
          await this.$store.dispatch('users/userLogin', infoObj)
          // 用户登录成功就会自动跳转到 home首页
          this.$router.push('/home')
        } catch (error) {
          alert(error.message)
        }
        
      }
    },
  }
</script>

<style lang="less" scoped>
  .login-container {
    .header {
      width: 100%;
      height: 100px;

      .logo-nav {
        width: 1000px;
        height: 100px;
        margin: 0 auto;

        img {
          width: 120px;
          cursor: pointer;
        }

        h1 {
          margin-left: 20px;
          font-size: 26px;
          margin-top: 40px;
          font-weight: 200;
        }

        .ask {
          height: 24px;
          line-height: 24px;
          color: #999999;
          margin-top: 70px;
          font-size: 12px;

          i {
            color: #B61D1D
          }
        }
      }
    }
    
    .login-wrap {
      height: 487px;
      background-color: #FEE9BE;

      .login {
        width: 990px;
        height: 475px;
        margin: 0 auto;
        background: url(./images/bkimg.jpg) no-repeat;
        // background: #e93854;
      }

      .loginform {
        // margin: 0 auto;
        width: 400px;
        height: 350px;
        box-sizing: border-box;
        background: #fff;
        float: right;
        top: 45px;
        position: relative;
        padding: 20px;

        .tab {

          li {
            width: 100%;
            text-align: center;

            a {
              width: 100%;
              display: block;
              height: 50px;
              line-height: 50px;
              font-size: 20px;
              font-weight: 700;
              color: #333;
              // border-bottom: 1px solid #ddd;
              box-sizing: border-box;
              text-decoration: none;

            }

            .current {
              border-bottom: none;
              border-top-color: #28a3ef;
              color: #e1251b;
            }
          }
        }

        .content {
          width: 355px;
          height: 200px;
          box-sizing: border-box;
          padding: 18px 18px 18px 24px;

          form {
            width: 320px;
            margin: 0 auto;
            font-size: 12px;
            line-height: 18px;

            .input-text {
              
              height: 32px;
              margin-bottom: 20px;

              span {
                float: left;
                width: 37px;
                height: 32px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                border-radius: 2px 0 0 2px;
                text-align: center;
                line-height: 32px;

                i {
                  font-size: 26px;
                  color: #cccccc;
                }
              }


              input {
                width: 280px;
                height: 32px;
                box-sizing: border-box;
                border: 1px solid #ccc;
                border-left: none;
                float: left;
                padding-top: 6px;
                padding-bottom: 6px;
                font-size: 14px;
                line-height: 22px;
                padding-right: 8px;
                padding-left: 8px;
                border-radius: 0 2px 2px 0;
                outline: none;
              }
            }

            .setting {
              label {
                float: left;
              }

              .forget {
                color: #666666;
                display: inline-block;
                float: right;
              }
            }

            .btn {
              background-color: #e1251b;
              padding: 6px;
              border-radius: 0;
              font-size: 16px;
              font-family: 微软雅黑;
              word-spacing: 4px;
              border: 1px solid #e1251b;
              color: #fff;
              width: 310px;
              height: 36px;
              margin-top: 25px;
              outline: none;
              cursor: pointer;
            }
          }

          .call {
            margin-top: 30px;

            ul {
              float: left;

              li {
                float: left;
                margin-right: 5px;

                i {
                  font-size: 22px;
                  color: #cccccc;
                  cursor:pointer;
                }

                i:hover {
                  color:#333
                }
              }
            }

            .register {
              color: #B61D1D;
              float: right;
              font-size: 15px;
            }

            .register:hover {
              text-decoration: underline;
            }
          }

        }
      }
    }


  }
</style>