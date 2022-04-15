<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in cartInfoList" :key="good.id" v-show="cartInfoList">
          <li class="cart-list-con1">
            <input type="checkbox" :checked="good.isChecked" @change="changeCheck(good)">
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl">
            <div class="item-msg">{{good.skuName || '暂无相关信息'}}</div>
          </li>
          <li class="cart-list-con3">
            <span class="price">{{good.cartPrice || '暂无'}}</span>
          </li>
          <li class="cart-list-con4">
            <a class="mins" @click="updateOne('minus', good.skuNum, good.skuId)">-</a>
            <input :value="good.skuNum" class="itxt" @change="updateNum($event.target.value*1, good.skuNum, good.skuId)">
            <a class="plus" @click="updateOne('add', good.skuNum, good.skuId)">+</a>
          </li>
          <li class="cart-list-con5">
            <span class="sum">{{subtotal(good)}}</span>
          </li>
          <li class="cart-list-con6">
            <a class="sindelet" @click="deleteCart(good.skuId)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllCheck" @change="changeAllCheck(cartInfoList)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteCheckedCart(cartInfoList)">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>{{totalSum}}</span> 件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: 'ShopCart',
    computed: {
      ...mapGetters('shopcart', ['cartData']),
      cartInfoList() {
        return this.cartData.cartInfoList || []
      },
      // 单品的小计
      subtotal() {
        return function(good) {
          return good.cartPrice * good.skuNum
        }
      },
      // 商品数量的总计
      totalSum() {
        if(this.cartInfoList.length) {
          let sumArr = [] // 将商品的数量单独提取出为一个数组
          this.cartInfoList.forEach((item) => {
            // 进入数量统计的前提是该商品是被选中的
            if(item.isChecked) {
              sumArr.push(item.skuNum)
            }
          })
          // 然后用 reduce 计算得出数量的总计
          // 前提是 sumArr 不为空，否则返回 0
          if(sumArr.length) {
            return sumArr.reduce((pre, cur) => {
              return pre + cur
            })
          }else {
            return 0
          }
        }
        
      },
      // 购买商品的总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach((item) => {
          // 统计的前提是该商品是选中状态的
          if(item.isChecked) {
            sum += item.cartPrice * item.skuNum
          }
        })
        return sum
      },
      // 全选按钮是否选中
      isAllCheck() {
        // 这里遍历购物车商品数组，判断其每一项的isChecked属性是否为1，如有一项返回false，则函数整体就会返回false
        // 特殊情况，若当前购物车列表没有商品，返回false
        if(this.cartInfoList.length == 0) return false

        return this.cartInfoList.every(item => item.isChecked == 1)
      }
    },
    methods: {
      // 把通知vuex仓库向服务器发请求封装为一个函数
      getData() {
        this.$store.dispatch('shopcart/getCartList')
      },
      // 点击加减号修改购买商品的数量
      async updateOne(type, skuNum, skuid) {
        switch(type) {
          // 点击数量下的加号按钮购买商品数量加一
          case 'add':
            // 限制对大数量为999
            if(skuNum==999) break;
            try {
              await this.$store.dispatch('shopcart/updateCartList', {skuid,skuNum:1})
              this.getData()
            } catch (error) {
              console.log(error)
              alert('更新购物车列表失败！')
            }
            break;
          // 点击数量下的减号按钮购买商品数量减一
          case 'minus':
            //限制最小数量为1
            if(skuNum == 1) break;
            try {
              await this.$store.dispatch('shopcart/updateCartList', {skuid,skuNum:-1})
              this.getData()
            } catch (error) {
              console.log(error)
              alert('更新购物车列表失败！')
            }
            break;
        }
      },
      // 修改输入框的数量更新 cartList 的数量
      updateNum(newValue, oldValue, skuid) {
        this.$store.dispatch('shopcart/updateCartList', {skuid,skuNum:newValue - oldValue})
        this.getData()
      },
      // 删除购物车中的商品
      async deleteCart(skuid) {
        try {
          await this.$store.dispatch('shopcart/deleteCart', skuid)
          this.getData()
        } catch (error) {
          alert('删除商品失败！')
          console.log(error)
        }
      },
      // 切换商品的选中状态
      async changeCheck(good) {
        // 所有商品的默认选中都是1
        const skuid = good.skuId
        const isChecked = good.isChecked==1?0:1
        try {
          await this.$store.dispatch('shopcart/changeCheck',{skuid,isChecked})
          this.getData()
        } catch (error) {
          alert('出错了！')
          console.log(error)
        }
        
      },
      // 切换全选按钮的状态
      changeAllCheck(cartInfoList) {
        // 先判断当前状态：已经是全选的话就改成全不选，不是全选的话就改成全选
        if(this.isAllCheck) {
          // 是全选就改为全不选
          try {
            // 遍历购物车商品数组的每一项，检查其 isChecked 属性
            // 将 选中的 商品的状态修改为未选中
            cartInfoList.forEach(async (item) => {
              if(item.isChecked == 1) await this.$store.dispatch('shopcart/changeCheck',{skuid:item.skuId, isChecked:0})
              // 发请求获取最新商品的状态
              this.getData()
            })
          } catch (error) {
            alert('出错了！')
            console.log(error)
          }
        }else {
          // 不是全选就把所有商品选中
          try {
            // 遍历购物车商品数组的每一项，检查其 isChecked 属性
            // 将 未选中的 商品的状态修改为选中
            cartInfoList.forEach(async (item) => {
              if(item.isChecked == 0) await this.$store.dispatch('shopcart/changeCheck',{skuid:item.skuId, isChecked:1})
              // 发请求获取最新商品的状态
              this.getData()
            })
          } catch (error) {
            alert('出错了！')
            console.log(error)
          }
        }

        // 发请求获取最新商品的状态
        // this.getData()
      },
      // 删除选中的商品
      deleteCheckedCart(cartInfoList) {
        cartInfoList.forEach((item) => {
          // 判断：如果当前商品的状态为选中，则发请求将该商品删除
          if(item.isChecked == 1) {
            this.deleteCart(item.skuId)
          }
        })
      }
    },
    mounted() {
      this.getData()
    },
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 10%;

          }

          .cart-list-con4 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con5 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con6 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>