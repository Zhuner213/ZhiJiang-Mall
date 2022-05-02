<template>
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="imgs in bannerList" :key="imgs.id">
              <img :src="imgs.imgUrl"/>
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
        <div class="news">
          <h4>
            <em class="fl">枝江快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>关注嘉然，顿顿解馋</li>
            <li><span class="bold">[公告]</span>关注嘉然，顿顿解馋</li>
            <li><span class="bold">[特惠]</span>关注嘉然，顿顿解馋</li>
            <li><span class="bold">[公告]</span>关注嘉然，顿顿解馋</li>
            <li><span class="bold">[特惠]</span>关注嘉然，顿顿解馋</li>
          </ul>
        </div>
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
            <i class="iconfont icon-jiayouzhan"></i>
            <span class="service-intro">加油站</span>
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
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
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
  }
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
      float: left;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;
          font-size: 12px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(./images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          width: 248px;
          height: 75px;
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>