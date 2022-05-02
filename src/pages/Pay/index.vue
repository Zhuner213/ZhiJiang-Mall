<template>
  <div class="pay-main">
    <div class="pay-container">
      <div class="checkout-tit">
        <h4 class="tit-txt">
          <span class="success-icon"></span>
          <span class="success-info"
            >订单提交成功，请您及时付款，以便尽快为您发货~~</span
          >
        </h4>
        <div class="paymark">
          <span class="fl"
            >请您在提交订单<em class="orange time">4小时</em
            >之内完成支付，超时订单会自动取消。订单号：<em>{{
              orderId
            }}</em></span
          >
          <!-- <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥17,654</em></span> -->
        </div>
      </div>
      <div class="checkout-info">
        <h4>重要说明：</h4>
        <ol>
          <li>
            枝江商城支付平台目前仅支持<span class="zfb">微信</span>支付方式。
          </li>
          <li>其它支付渠道正在调试中，敬请期待。</li>
        </ol>
      </div>
      <div class="checkout-steps">
        <div class="step-tit">
          <h5>支付平台</h5>
        </div>
        <div class="step-cont">
          <ul class="payType">
            <li><img src="./images/pay2.jpg" /></li>
            <li><img src="./images/pay3.jpg" /></li>
          </ul>
        </div>
        <div class="hr"></div>

        <div class="payshipInfo">
          <div class="step-tit">
            <h5>支付网银</h5>
          </div>
          <div class="step-cont">
            <ul class="payType">
              <li><img src="./images/pay10.jpg" /></li>
              <li><img src="./images/pay11.jpg" /></li>
              <li><img src="./images/pay12.jpg" /></li>
              <li><img src="./images/pay13.jpg" /></li>
              <li><img src="./images/pay14.jpg" /></li>
              <li><img src="./images/pay15.jpg" /></li>
              <li><img src="./images/pay16.jpg" /></li>
              <li><img src="./images/pay17.jpg" /></li>
              <li><img src="./images/pay18.jpg" /></li>
              <li><img src="./images/pay19.jpg" /></li>
              <li><img src="./images/pay20.jpg" /></li>
              <li><img src="./images/pay21.jpg" /></li>
              <li><img src="./images/pay22.jpg" /></li>
            </ul>
          </div>
        </div>
        <div class="hr"></div>

        <div class="submit">
          <a class="btn" @click="payNow">立即支付</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "Pay",
  computed: {
    // 从$route里面拿一下订单号
    orderId() {
      return this.$route.query.orderId;
    },
  },
  methods: {
    // 点击立即支付按钮，呼出支付弹框（elementUI），向服务器发请求获取订单支付信息
    // 从点击支付按钮的那一刻起，就应该开启一个循环定时器，循环询问服务器用户是否进行了支付，
    // 只有用户支付完成了才可以跳转到 支付成功页面，否则不进行跳转
    async payNow() {
      // 定义一个变量存一下用户的支付状态
      let payStatus = 205 // 默认是205支付中，当用户成功支付后变为200
      let timer = setInterval(async () => {
        const response = await this.$api.reqQueryPayStatus(this.orderId)
        payStatus = response.code
        console.log(payStatus)
      }, 500)
      // 这里向服务器发请求拿到订单支付的二维码的codeUrl
      const response = await this.$api.reqGetPaymentInfo(this.orderId);
      // 
      if(response.code == 200) {
        const QRcodeUrl = await QRCode.toDataURL(response.data.codeUrl)
        this.$msgbox.alert(`<img src=${QRcodeUrl}></img>`, "请使用微信扫码支付", {
          showCancelButton: true,
          confirmButtonText: "我已支付",
          cancelButtonText: "取消",
          dangerouslyUseHTMLString: true,
          center: true,
          // 如果用户没有支付且点击了我已支付，则会不关闭当前窗口且提醒用户 尚未支付
          beforeClose: (action,instance,done) => {
            if(action=='confirm' && payStatus==205) {
              alert('您还没有支付哦！')
            }else{
              done()
            }
          }
        })
        .then(() => {
          // 如果用户点击了支付成功且真的支付了，就会跳转到支付成功页面
          if(payStatus == 200) {
            alert('支付成功！')
            this.$router.push('/paysuccess')
          }else{
            // 如果用户并未支付且点击了 我已支付，则提醒用户还未支付，请用户重新支付
            // 此项功能在 beforeClose配置项 中实现
            console.log('用户尚未支付')
          }
          clearInterval(timer)
          timer = null
        }, () => {
          console.log('支付取消了')
          clearInterval(timer)
          timer = null
        })
      }  
    },
  },
};
</script>

<style lang="less" scoped>
.pay-main {
  margin-bottom: 20px;

  .pay-container {
    margin: 0 auto;
    width: 1200px;

    a:hover {
      color: #4cb9fc;
    }

    .orange {
      color: #e1251b;
    }

    .money {
      font-size: 18px;
    }

    .zfb {
      color: #e1251b;
      font-weight: 700;
    }

    .checkout-tit {
      padding: 10px;

      .tit-txt {
        font-size: 14px;
        line-height: 21px;

        .success-icon {
          width: 30px;
          height: 30px;
          display: inline-block;
          background: url(./images/icon.png) no-repeat 0 0;
        }

        .success-info {
          padding: 0 8px;
          line-height: 30px;
          vertical-align: top;
        }
      }

      .paymark {
        overflow: hidden;
        line-height: 26px;
        text-indent: 38px;

        .fl {
          float: left;
        }

        .fr {
          float: right;

          .lead {
            margin-bottom: 18px;
            font-size: 15px;
            font-weight: 400;
            line-height: 22.5px;
          }
        }
      }
    }

    .checkout-info {
      padding-left: 25px;
      padding-bottom: 15px;
      margin-bottom: 10px;
      border: 2px solid #e1251b;

      h4 {
        margin: 9px 0;
        font-size: 14px;
        line-height: 21px;
        color: #e1251b;
      }

      ol {
        padding-left: 25px;
        list-style-type: decimal;
        line-height: 24px;
        font-size: 14px;
      }

      ul {
        padding-left: 25px;
        list-style-type: disc;
        line-height: 24px;
        font-size: 14px;
      }
    }

    .checkout-steps {
      border: 1px solid #ddd;
      padding: 25px;

      .hr {
        height: 1px;
        background-color: #ddd;
      }

      .step-tit {
        line-height: 36px;
        margin: 15px 0;
      }

      .step-cont {
        margin: 0 10px 12px 20px;

        ul {
          font-size: 0;

          li {
            margin: 2px;
            display: inline-block;
            padding: 5px 20px;
            border: 1px solid #ddd;
            cursor: pointer;
            line-height: 18px;
          }
        }
      }
    }

    .submit {
      text-align: center;

      .btn {
        display: inline-block;
        padding: 15px 45px;
        margin: 15px 0 10px;
        font: 18px "微软雅黑";
        font-weight: 700;
        border-radius: 0;
        background-color: #e1251b;
        border: 1px solid #e1251b;
        color: #fff;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        user-select: none;
        text-decoration: none;
      }
    }
  }
}
</style>