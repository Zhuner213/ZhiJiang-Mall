<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="imgs in bannerList" :key="imgs.id">
              <img :src="imgs.imgUrl" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
      <div class="right">
        <!-- 登录模块 -->
        <div class="login">
          <div class="login-top clearfix">
            <div v-if="!userInfo" class="user-avatar fl">
              <router-link to="/login">
                <img src="./images/avatar.jpg" />
              </router-link>
            </div>
            <div v-else class="user-avatar fl">
                <img src="./images/avatar-login.jpg" />
            </div>
            <div v-if="!userInfo" class="login-button fr">
              <router-link to="/login">Hi~欢迎光临小狼堡！</router-link>
              <p>
                <router-link to="/login">登录</router-link>|<router-link to="/register">注册</router-link>
              </p>
            </div>
            <div v-else class="login-button fr">
              <a>Hi~欢迎你！{{userInfo.nickName}}</a>
              <p>
                <a @click="userLogout" style="cursor:pointer">退出登录</a>
              </p>
            </div>
          </div>
          <div class="login-bottom">
            <a class="welfare">新人福利</a>
            <a class="vip">啵啵会员</a>
          </div>
        </div>
        <!-- 新闻快报板块 -->
        <div class="news">
          <h4>
            <span class="fl">枝江快报</span>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="news-tag">最新</span>风吹月光打湿了我，不必闪躲
            </li>
            <li>
              <span class="news-tag">热议</span>星星都在为我唱歌，还怕什么
            </li>
            <li><span class="news-tag">热门</span>字节跳动黑心企业压榨员工</li>
            <li><span class="news-tag">热门</span>请朝夕光年管理层正面回应</li>
          </ul>
        </div>
        <!-- 生活服务板块 -->
        <ul class="lifeservices">
          <li class="life-item">
            <i class="iconfont icon-huafei"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-jipiao"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-dianyingpiao_line"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-youxi"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-caipiao"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-didaomeishi"></i>
            <span class="service-intro">美食</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-guojijiudian"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-huochepiao"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-jingdongzhongchou"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-licaishouyi"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-lipinka"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="iconfont icon-A"></i>
            <span class="service-intro">枝江</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import { mapState } from "vuex";
export default {
  name: "ListContainer",
  computed: {
    ...mapState("home", ["bannerList"]),
    ...mapState('users',['userInfo'])
  },
  methods: {
    // 用户退出登录
    userLogout() {
      // 向服务器发请求退出登录，
      this.$store.dispatch('users/userLogout')
    }
  },
  watch: {
    bannerList: {
      handler() {
        this.$nextTick(() => {
          new Swiper(".swiper-container", {
            loop: true, // 循环模式选项
            autoplay: true,

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;

      .swiper-container {
        width: 730px;
        height: 455px;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }

    .right {
      margin-top: 5px;
      background: white;
      float: left;
      width: 250px;

      .login {
        height: 102px;
        padding: 10px 20px;

        .login-top {
          .user-avatar {
            width: 50px;
            height: 50px;
            border: 2px solid #fff;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 15%);

            a {
              display: block;
              width: 50px;
              height: 50px;
            }
            img {
              width: 50px;
              height: 50px;
              border-radius: 50%;
              // display: block;
            }
          }

          .login-button {
            width: 150px;
            height: 50px;
            font-size: 12px;
            margin-top: 5px;


            a {
              color: #666666;
              transition: all 0.3s ease;
            }

            p {
              color: #333333;
              padding: 10px 0;

              a {
                margin: 0 4px;
                color: #333333;
              }
            }

            a:hover {
              color: #c81623;
            }
          }
        }

        .login-bottom {
          text-align: center;
          margin-top: 15px;

          a {
            cursor: pointer;
            display: inline-block;
            margin: 0 5px;
            width: 75px;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            color: #fff;
            border-radius: 13px;
            background: #e1251b;
            -webkit-transition: background 0.3s ease, color 0.3s ease;
            transition: background 0.3s ease, color 0.3s ease;
          }

          .vip {
            background: #363634;
            color: #e5d790;
          }

          .vip:hover {
            background-color: #c81623;
            color: #fff;
          }

          .welfare:hover {
            background-color: #C81623;
          }
        }
      }

      .news {
        h4 {
          padding: 0px 10px;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
            color: #333333;
          }

          .fr {
            float: right;
            color: #999999;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;
          font-size: 12px;
          color: #666666;


          li {
            transition: all 0.3s ease;
            cursor: pointer;
          }

          li:hover {
            color: #c81623;
          }

          .news-tag {
            display: inline-block;
            position: relative;
            font-size: 12px;
            height: 16px;
            width: 35px;
            line-height: 16px;
            text-align: center;
            vertical-align: 0;
            color: #e1251b;
            background-color: rgba(225, 37, 27, 0.08);
            margin-right: 6px;
          }
        }
      }

      .lifeservices {
        padding-top: 6px;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          i {
            color: #666666;
            font-size: 24px;
            transition: all 0.2s ease;
          }

          i:hover {
            font-size: 28px;
            color: #333333;
          }

          span {
            font-size: 12px;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>