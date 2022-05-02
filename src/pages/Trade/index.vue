<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">交易序列号：{{tradeNo}}</h5>
      <h5 class="receive">收件人信息</h5>
      <!-- 收件人列表 -->
      <div class="address clearFix" v-for="(user, index) in userAddressList" :key="user.id">
        <span class="username" :class="{selected:user.isDefault}">{{user.consignee}}</span>
        <p @click="changeDefault(index)">
          <span class="s1">{{user.userAddress}}</span>
          <span class="s2">{{user.phoneNum}}</span>
          <span class="s3" v-show="user.isDefault">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <!-- 支付方式列表 -->
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>

      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="good in goodsList" :key="good.skuId">
          <li>
            <img :src="good.imgUrl" style="width:100px;height:100px">
          </li>
          <li>
            <p>
              {{good.skuName}}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>¥{{good.orderPrice}}</h3>
          </li>
          <li>x{{good.skuNum}}</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="orderComment"></textarea>

      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b>共<i>{{totalSum}}</i>件商品，总金额</b>
          <span>¥{{totalAmount}}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">应付金额:　<span>¥{{totalAmount}}</span></div>
      <div class="receiveInfo">
        寄送至:
        <span>{{userAddressObj.userAddress}}</span>
        收货人：<span>{{userAddressObj.consignee}}</span>
        手机号：<span>{{userAddressObj.phoneNum}}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
// 从这个组件开始，我们尝试不使用 vuex 进行请求的发送和数据的存储
  export default {
    name: 'Trade',
    data() {
      return {
        // 收件人信息
        userAddressList: [],
        // 交易序列号
        tradeNo: '',
        // 购买的商品的信息
        goodsList: [],
        // 订单备注留言
        orderComment: '',
        // 购买商品的总价
        totalAmount: 0
      }
    },
    computed: {
      // 计算出订单下方的应寄送的收件人的信息
      userAddressObj() {
        return this.userAddressList.find(item => item.isDefault == 1) || {}
      },
      // 计算出购买商品的总数量
      totalSum() {
        let sum = 0
        this.goodsList.forEach((item) => {
          sum += item.skuNum
        })
        return sum
      }
    },
    methods: {
      // 获取到收件人信息的 mock数据
      async getUserAddressList() {
        const response = await this.$api.reqUserAddressList()
        // 如果成功拿到 mock数据，则在data中存储收件人的信息
        if(response.code == 200) {
          // 拿到收件人的信息
          this.userAddressList = response.data
        }else {
          alert('请求收件人信息出错')
        }
      },
      // 向服务器发请求获取订单交易页信息
      async getTradeInfo() {
        const response = await this.$api.reqGetTradeInfo()
        // 如果向服务器请求数据成功，就在data中存储一下获取到的相关信息信息
        if(response.code == 200) {
          // 拿到订单号
          this.tradeNo = response.data.tradeNo
          // 拿到购买的商品信息数组
          this.goodsList = response.data.detailArrayList
          // 拿到购买商品的总价
          this.totalAmount = response.data.totalAmount
        }else {
          console.log('请求订单交易信息出错', response)
        }
      },
      // 点击收件人切换默认地址
      changeDefault(clickIndex) {
        // 这里使用的是排他思想
        this.userAddressList.forEach((item, index, arr) => {
          // 先把所有收件人的 isDefault改为0，再把点击的那个改为1
          item.isDefault = 0
          if(index == clickIndex) item.isDefault = 1
        })
      },
      // 点击提交订单
      async submitOrder() {
        // 整合要向服务器发送请求的参数对象
        const orderInfo = {
          // 收件人姓名
          consignee: this.userAddressObj.consignee,
          // 收件人电话
          consigneeTel: this.userAddressObj.phoneNum,
          // 收件地址
          deliveryAddress: this.userAddressObj.userAddress,
          // 支付方式
          paymentWay: 'ONLINE', // 默认为在线支付
          // 订单备注
          orderComment: this.orderComment,
          // 存储多个商品对象的数组
          orderDetailList: this.goodsList
        }
        const response = await this.$api.reqSubmitOrder(this.tradeNo,orderInfo)
        // 如果订单提交成功，则跳转到支付页面（且携带订单id为query参数一起跳转）
        if(response.code == 200) {
          this.$router.push(`/pay?orderId=${response.data}`)
        }else{
          // 如果订单提交失败，则不进行跳转，告诉用户失败的原因
          alert(response.message)
        }
      }
    },
    mounted() {
      // 组件挂载完毕请求收件人的 mock数据
      this.getUserAddressList()
      // 组件挂载完毕向服务器发请求获取订单交易信息
      this.getTradeInfo()
    },
  }
</script>

<style lang="less" scoped>
  .trade-container {
    .title {
      width: 1200px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 21px;
    }

    .content {
      width: 1200px;
      margin: 10px auto 0;
      border: 1px solid rgb(221, 221, 221);
      padding: 25px;
      box-sizing: border-box;
      background: #fff;

      .receive,
      .pay {
        line-height: 36px;
        margin: 18px 0;
      }

      .address {
        padding-left: 20px;
        margin-bottom: 15px;
        height: 32px;

        .username {
          float: left;
          width: 100px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          border: 1px solid #ddd;
          position: relative;
        }

        .username::after {
          content: "";
          display: none;
          width: 13px;
          height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          background: url(./images/choosed.png) no-repeat;
        }

        .username.selected {
          border-color: #e1251b;
        }

        .username.selected::after {
          display: block;
        }

        p {
          width: 610px;
          float: left;
          line-height: 30px;
          margin-left: 10px;
          padding-left: 5px;
          cursor: pointer;

          .s1 {
            float: left;

          }

          .s2 {
            float: left;
            margin: 0 5px;
          }

          .s3 {
            float: left;
            width: 56px;
            height: 24px;
            line-height: 24px;
            margin-left: 10px;
            background-color: #878787;
            color: #fff;
            margin-top: 3px;
            text-align: center;
          }
        }

        p:hover {
          background-color: #ddd;
        }
      }

      .line {
        height: 1px;
        background-color: #ddd;
      }

      .way {
        width: 1080px;
        height: 110px;
        background: #f4f4f4;
        padding: 15px;
        margin: 0 auto;

        h5 {
          line-height: 50px;
        }

        .info {
          margin-top: 20px;

          .s1 {
            float: left;
            border: 1px solid #ddd;
            width: 120px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-right: 10px;
          }

          p {
            line-height: 30px;
          }
        }
      }

      .detail {
        width: 1080px;

        background: #fff;
        padding: 15px;
        margin: 2px auto 0;

        h5 {
          line-height: 50px;
        }

        .list {
          display: flex;
          justify-content: space-between;

          li {
            line-height: 30px;

            p {

              margin-bottom: 20px;
            }

            h4 {
              color: #c81623;
              font-weight: 400;
            }

            h3 {

              color: #e12228;
            }
          }
        }
      }

      .bbs {
        margin-bottom: 15px;

        h5 {
          line-height: 50px;
        }

        textarea {
          width: 100%;
          border-color: #e4e2e2;
          line-height: 1.8;
          outline: none;
          resize: none;
        }
      }

      .bill {
        h5 {
          line-height: 50px;
        }

        div {
          padding-left: 15px;
        }
      }
    }

    .money {
      width: 1200px;
      margin: 20px auto;

      ul {
        width: 220px;
        float: right;
        margin: 0px 20px;

        li {
          line-height: 28px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;

          i {
            color: red;
            
          }
        }
      }
    }

    .trade {
      box-sizing: border-box;
      width: 1200px;
      padding: 10px;
      margin: 10px auto;
      text-align: right;
      // background-color: #f4f4f4;
      background: #fff;
      border: 1px solid #ddd;

      div {
        line-height: 30px;
      }

      .price span {
        color: #e12228;
        font-weight: 700;
        font-size: 14px;
      }

      .receiveInfo {
        color: #999;
      }
    }

    .sub {
      width: 1200px;
      margin: 0 auto 10px;

      .subBtn {
        float: right;
        width: 164px;
        height: 56px;
        font: 700 18px "微软雅黑";
        line-height: 56px;
        text-align: center;
        color: #fff;
        background-color: #e1251b;

      }
    }

  }
</style>