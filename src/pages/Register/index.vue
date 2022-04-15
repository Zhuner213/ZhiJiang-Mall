<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">我有账号，去 <a href="login.html" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input type="text" placeholder="请输入你的手机号" v-model="phone">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>昵称:</label>
        <input type="text" placeholder="请输入昵称" v-model="nickName">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>验证码:</label>
        <input type="text" placeholder="请输入验证码" v-model="code">
        <button class="get-code"  @click="sendCode">获取验证码</button>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input type="password" placeholder="请输入你的登录密码" v-model="password">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input type="password" placeholder="请输入确认密码" v-model="confirmPassword">
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgreed">
        <span>同意协议并注册《枝江商城用户协议》</span>
        <!-- <span class="error-msg">错误提示信息</span> -->
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'Register',
    data() {
      return {
        // 记录表单中的信息
        phone: '', // 用户手机号
        nickName: '', // 用户的昵称
        code: '', // 验证码
        password: '', // 用户密码
        confirmPassword: '', // 确认密码
        // 用户是否同意注册协议（默认为不同意）
        isAgreed: false
      }
    },
    methods: {
      // 点击按钮给当前用户发送专属的验证码
      async sendCode() {
        // 首先要判断用户是否正确输入了手机号
        if(this.phone == '') {
          alert('手机号不能为空！')
          return
        }
        // 然后要向服务器发请求获取验证码
        try {
          const code = await this.$store.dispatch('users/getCode',this.phone)
          alert('您的验证码是'+code)
        } catch (error) {
          alert(error.message)
        }
             
      },
      // 用户点击按钮完成注册
      async userRegister() {
        // 手机号、验证码、登陆密码、确认密码任一为空则不能完成注册
        if(this.phone&&this.code&&this.password&&this.confirmPassword){
          // 两次输入的密码不一致也不能完成注册
          if(this.password !== this.confirmPassword) {
            alert('两次输入的密码不一致！')
            return
          }
          // 没有同意注册协议也不能完成注册
          if(!this.isAgreed) {
            alert('请先同意用户协议！')
            return
          }

          // 向服务器发请求提交用户注册信息
          // 将用户信息用一个对象接收起来
          const infoObj = {
            phone: this.phone,
            password: this.password,
            code: this.code,
            nickName: this.nickName
          }

          try {
            await this.$store.dispatch('users/userRegister',infoObj)
            alert('注册成功！')
            this.$router.push('/login')
          } catch (error) {
            alert(error.message)
          }
          
        }else{
          alert('您的信息不全')
        }
      }
    },
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        .get-code {
          height: 38px;
          padding: 0 2px;
        }

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }
  }
</style>