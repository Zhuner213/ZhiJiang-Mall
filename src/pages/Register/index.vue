<template>
  <div class="register-container">
    <!-- 顶部logo栏 -->
    <div class="header">
      <div class="logo-nav clearfix">
        <img class="fl" src="./images/logo.png" @click="goHome"/>
        <h1 class="fl">欢迎注册</h1>
        <div class="ask fr">
          已有账号？
          <router-link to="/login">请登录></router-link>
        </div>
      </div>
    </div>
    <!-- 注册内容 -->
    <div class="register">
      <div class="input-wrap">
        <div class="content">
          <label>手 机 号</label>
          <input type="text" placeholder="请输入你的手机号" v-model="phone" />
          <!-- <span class="error-msg">错误提示信息</span> -->
        </div>
        <div class="content">
          <label>昵 称</label>
          <input type="text" placeholder="请输入昵称" v-model="nickName" />
          <!-- <span class="error-msg">错误提示信息</span> -->
        </div>
        <div class="content">
          <label>登 录 密 码</label>
          <input
            type="password"
            placeholder="请输入你的登录密码"
            v-model="password"
          />
          <!-- <span class="error-msg">错误提示信息</span> -->
        </div>
        <div class="content">
          <label>确 认 密 码</label>
          <input
            type="password"
            placeholder="请输入确认密码"
            v-model="confirmPassword"
          />
          <!-- <span class="error-msg">错误提示信息</span> -->
        </div>
        <div class="content">
          <div class="verify fl">
            <label>验 证 码</label>
            <input type="text" placeholder="请输入验证码" v-model="code" style="width:180px"/>
          </div>
          <button class="get-code fr" @click="sendCode">获取验证码</button>
          <!-- <span class="error-msg">错误提示信息</span> -->
        </div>
      </div>
      <div class="controls">
        <input name="m1" type="checkbox" v-model="isAgreed" />
        <span>同意协议并注册《枝江商城用户协议》</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      // 记录表单中的信息
      phone: "", // 用户手机号
      nickName: "", // 用户的昵称
      code: "", // 验证码
      password: "", // 用户密码
      confirmPassword: "", // 确认密码
      // 用户是否同意注册协议（默认为不同意）
      isAgreed: false,
    };
  },
  methods: {
    // 点击logo跳转至主页
      goHome() {
        this.$router.push('/home')
      },
    // 点击按钮给当前用户发送专属的验证码
    async sendCode() {
      // 首先要判断用户是否正确输入了手机号
      if (this.phone == "") {
        alert("手机号不能为空！");
        return;
      }
      // 然后要向服务器发请求获取验证码
      try {
        const code = await this.$store.dispatch("users/getCode", this.phone);
        alert("您的验证码是" + code);
      } catch (error) {
        alert(error.message);
      }
    },
    // 用户点击按钮完成注册
    async userRegister() {
      // 手机号、验证码、登陆密码、确认密码任一为空则不能完成注册
      if (this.phone && this.code && this.password && this.confirmPassword) {
        // 两次输入的密码不一致也不能完成注册
        if (this.password !== this.confirmPassword) {
          alert("两次输入的密码不一致！");
          return;
        }
        // 没有同意注册协议也不能完成注册
        if (!this.isAgreed) {
          alert("请先同意用户协议！");
          return;
        }

        // 向服务器发请求提交用户注册信息
        // 将用户信息用一个对象接收起来
        const infoObj = {
          phone: this.phone,
          password: this.password,
          code: this.code,
          nickName: this.nickName,
        };

        try {
          await this.$store.dispatch("users/userRegister", infoObj);
          alert("注册成功！");
          this.$router.push("/login");
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("您的信息不全");
      }
    },
  },
};
</script>

<style lang="less" scoped>
body {
  background: #ffffff;
}
.register-container {
  .header {
    width: 100%;
    height: 100px;
    box-shadow: 0px 4px 10px rgb(241, 241, 241);

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
        margin-top: 35px;
        font-weight: 200;
      }

      .ask {
        height: 24px;
        line-height: 24px;
        color: #999999;
        margin-top: 50px;

        a {
          color: #ee2222;
        }

        a:hover {
          color: #c81623;
          text-decoration: underline;
        }
      }
    }
  }
  .register {
    width: 1200px;
    height: 445px;
    margin: 0 auto;
    margin-bottom: 60px;

    .input-wrap {

      width: 400px;
      margin: 0 auto;
      margin-top: 40px;
    }

    .content {
      border: 1px solid #999999;
      width: 400px;
      height: 52px;
      line-height: 52px;
      margin-bottom: 18px;
      position: relative;

      // 获取验证码按钮 
      .get-code {
        width: 97px;
        border: 0;
        height: 52px;
        background: #ffffff;
        padding: 0;
        border-left: 1px solid #999999;
        cursor: pointer;
      }

      label {
        font-size: 14px;
        width: 96px;
        text-align: left;
        padding-left: 20px;
        display: inline-block;
        color: #666666;
      }

      input {
        border: 0 none;
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        font-size: 16px;
      }

      input::placeholder {
        color: #cccccc;
        font-size: 14px;
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
      color: #666666;
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
      margin-top: 20px;

      button {
        border: 0;
        outline: none;
        width: 400px;
        height: 54px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
      }

      button:hover {
        background: #C81623;
      }
    }
  }
}
</style>