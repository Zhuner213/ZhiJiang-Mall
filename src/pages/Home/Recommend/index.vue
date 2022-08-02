<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock">
          <div class="time">
            <img src="./images/yugui.jpg">
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner clearfix">
          <img src="./images/today01.jpg" class="fl"/>
          <p class="fl">
            <span class="title">阿草U型枕</span>
            <br>
            <span class="price">¥79</span>
          </p>
        </li>
        <li class="banner clearfix">
          <img src="./images/today02.jpg" class="fl"/>
          <p class="fl">
            <span class="title">很方很好rua阿草抱枕</span>
            <br>
            <span class="price">¥104</span>
          </p>
        </li>
        <li class="banner clearfix">
          <img src="./images/today03.jpg" class="fl"/>
          <p class="fl">
            <span class="title">高达1米的阿草抱枕</span>
            <br>
            <span class="price">¥199</span>
          </p>
        </li>
        <li class="banner clearfix">
          <img src="./images/today04.jpg" class="fl"/>
          <p class="fl">
            <span class="title">阿草解压玩偶</span>
            <br>
            <span class="price">¥59</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
};
</script>

<style lang="less">
    .today-recommend {
        .py-container {
            width: 1200px;
            margin: 0 auto;

            .recommend {
                height: 165px;
                background-color: #ffffff;
                margin: 10px 0;
                display: flex;

                .clock {
                    width: 16.67%;
                    background-color: #ffffff;
                    color: #333333;
                    font-size: 18px;
                    text-align: center;

                    .time {                  

                        img {
                          width: 120px;
                          height: 120px;
                        }
                    }

                    h3 {
                        font-weight: 200;
                        font-size: 22px;
                    }
                }

                .banner {
                    width: 20.83%;
                    
                    img {
                        cursor: pointer;
                        height: 100%;
                        display: block;
                        transition: all 400ms;
                        margin-right: 5px;

                        &:hover {
                            opacity: 0.8;
                        }
                    }

                    p {
                      width: 30%;
                      padding-top: 50px;

                    
                      .title {
                        font-size: 12px;
                      }

                      .price {
                        font-size: 14px;
                        color: #E1251B;
                      }
                    }
                }
            }
        }
    }
</style>