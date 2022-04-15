<template>
  <div>
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!--面包屑标签-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 商品分类面包屑标签 -->
            <li class="with-x" v-show="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 搜索栏关键字面包屑标签 -->
            <li class="with-x" v-show="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌名面包屑标签 -->
            <li class="with-x" v-show="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 商品售卖属性屑标签 -->
            <li
              class="with-x"
              v-for="(attr, index) in searchParams.props"
              :key="index"
            >
              {{ attr.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: haveOne }" @click="changeOrder(1)">
                  <a
                    >综合
                    <span
                      v-show="haveOne"
                      class="iconfont"
                      :class="{
                        'icon-icon-test62': haveDesc,
                        'icon-icon-test60': haveAsc,
                      }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: haveTwo }" @click="changeOrder(2)">
                  <a
                    >价格
                    <span
                      v-show="haveTwo"
                      class="iconfont"
                      :class="{
                        'icon-icon-test62': haveDesc,
                        'icon-icon-test60': haveAsc,
                      }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 展示的商品的列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 
            分页器的几个核心：
              1.总页数 totalPage（可计算）
              2.当前页数 pageNo
              3.每页展示的个数 pageSize
              4.总数据有多少条 total
              5.连续的页码数 continue
           -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序 1: 综合； 2: 价格； asc: 升序； desc: 降序
        order: "1:desc",
        // 分页器用的：代表的是当前是第几页，默认第一页
        pageNo: 1,
        // 代表每一页展示数据的个数
        pageSize: 10,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  computed: {
    // 取到 vuex 中发请求收到的商品列表
    ...mapGetters("search", ["goodsList"]),

    // 取到 vuex 中发请求收到的商品总数
    ...mapState("search", {
      total: (state) => state.searchList.total,
    }),

    // 判断 order 中是否含有 1，从而决定【综合】是否拥有class active
    haveOne() {
      return this.searchParams.order.indexOf(1) !== -1;
    },
    // 判断 order 中是否含有 2，从而决定【价格】是否拥有class active
    haveTwo() {
      return this.searchParams.order.indexOf(2) !== -1;
    },
    // 判断 order 中是否含有 desc，从而决定是否显示朝下的箭头
    haveDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    // 判断 order 中是否含有 asc，从而决定是否显示朝上的箭头
    haveAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
  },
  watch: {
    // 监视 this.$route，当值发生变化就重新用新值发送请求
    $route: {
      // immediate: true,
      handler() {
        // 每次发新的请求之前要把之前遗留的 id 给清除掉
        this.searchParams.category1Id = "";
        this.searchParams.category2Id = "";
        this.searchParams.category3Id = "";
        this.searchParams.pageNo = 1;
        this.getData();
        // console.log('数据监听执行了')
      },
    },
  },
  methods: {
    // 向服务器发请求获取 search组件 的数据（根据参数的不同返回不同的数据进行展示）
    // 把这次请求封装为一个函数，当你在需要的时候调用
    getDataOrigin() {
      this.$store.dispatch("search/searchList", this.searchParams);
    },
    getData() {
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      this.getDataOrigin();
      // console.log('我发请求了')
    },
    // 点击商品分类标签面包屑后面的 x，置空 searchParams中对应的分类名字categoryName，同时面包屑标签也会消失
    // 同时还要再发一次请求，使页面显示默认的搜索数据
    removeCategoryName() {
      this.searchParams.categoryName = "";
      // 在这里进行路由跳转，从自己跳转到自己，一来使网页顶部的地址栏清除 商品分类id和name数据
      // 二来使 $route 发生变化，触发了 watch，巧妙达成了再发一次请求的需求，同时这次请求还是默认数据
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    // 点击搜索框关键字面包屑后面的 x，置空 searchParams中对应的 keyword，同时面包屑标签也会消失
    // 同时还要再发一次请求，使页面显示默认的搜索数据
    removeKeyword() {
      this.searchParams.keyword = "";
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      } else {
        this.$router.push({ name: "search" });
      }
    },
    // 只有商品分类标签面包屑和搜索框关键字面包屑 点击消失 用到了路由跳转自己跳自己
    // 因为只有这两个会影响到网页地址栏的显示，后续的商标和售卖属性不会影响到网页地址栏的属性，所以直接发请求就可以了
    // 不需要再像上面两个利用路由自己跳自己来触发watch来发请求

    // 点击品牌名关键字面包屑后面的 x，置空 searchParams中对应的 trademark，同时面包屑标签也会消失
    // 同时还要再发一次请求，使页面显示 通过searchParams中余下数据 请求回来的数据
    removeTrademark() {
      this.searchParams.trademark = "";
      this.getDataOrigin();
    },
    // 点击商品售卖属性面包屑后面的 x，删掉 props中对应index的 数组元素，同时相应的面包屑标签也会消失
    // 同时还要再发一次请求，使页面显示 通过searchParams中余下数据 请求回来的数据
    removeAttr(index) {
      this.searchParams.props.splice(index, 1);
      this.getDataOrigin();
    },
    // 点击【综合】或【价格】切换 排序依据 和 升降序
    changeOrder(flag) {
      // flag 是一个标识，用来判断是哪一个按钮触发了这个事件，区分是【综合(1)】还是【价格(2)】
      const originOrder = this.searchParams.order;
      // originFlag 用来和 flag 进行对比，判断用户是不是点击的同一个按钮
      const originFlag = originOrder.split(":")[0];
      // originSort 用来接收当前按钮点击时的升降序方法
      const originSort = originOrder.split(":")[1];
      // 创建一个变量来接收变化后的 新order值
      let newOrder = "";

      // 页面一上来默认的按钮是 综合（降序），这时用户点击【综合】则视为点击的同一个按钮，点击【价格】则视为点击的不同按钮
      if (flag == originFlag) {
        // 用户点击的是同一个按钮的情况
        // 此时应该只改变升降序的方法
        newOrder = `${originFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        // 用户点击的是不同按钮的情况
        // 此时默认的是降序排列
        newOrder = `${flag}:desc`;
      }
      // 将变化后的新值赋值，发请求
      this.searchParams.order = newOrder;
      this.getDataOrigin();
    },
  },
  mounted() {
    // 当页面挂载完毕的时候调用一次
    this.getData();
    // 定义全局事件总线的事件：从子组件收到 品牌trademark，然后发请求获取到数据
    this.$bus.$on("getTrademark", (trademark) => {
      this.searchParams.trademark = trademark.tmId + ":" + trademark.tmName;
      this.searchParams.pageNo = 1;
      this.getDataOrigin();
    });
    // 定义全局事件总线的事件：从子组件收到 商品售卖属性封装好的props，然后发请求获取到数据
    this.$bus.$on("getProps", (props) => {
      // 这里要判断一下，数组去重
      if (this.searchParams.props.indexOf(props) === -1)
        this.searchParams.props.push(props);
      this.searchParams.pageNo = 1;
      this.getDataOrigin();
    });
    // 定义全局事件总线的事件：从分页器子组件收到页码，然后发请求获取到数据
    this.$bus.$on("getPageNo", (pageNo) => {
      this.searchParams.pageNo = pageNo;
      this.getDataOrigin();
    });
  },
  updated() {
    // this.$nextTick(() => {
    //   if(!this.goodsList.length) console.log('服务器返回数据有误！！！')
    // })
  },
  beforeDestroy() {
    // 不要忘记在组件销毁之前解绑全局事件总线的自定义事件
    this.$bus.$off(["getTrademark", "getProps", "getPageNo"]);
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>