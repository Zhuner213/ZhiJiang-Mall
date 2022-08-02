<template>
  <div class="type-nav">
    <div class="container">
      <!-- 这里利用事件委托，让鼠标即使移动到【全部商品分类】标签，一级分类的背景颜色也不会消失，除非从他们共同的父元素身上移出 -->
      <div @mouseleave="recoverIndex">
        <h2 class="all" @mouseenter="show">全部商品分类</h2>
        <!-- 定义过渡动画 -->
        <transition name="sort">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <!-- 这里是三级联动列表环环嵌套 -->
              <!-- 我是第一级 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                @mouseenter="changeIndex(index)"
                :class="{ cur: index === currentIndex }"
              >
                <h3 v-if="index < 15">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <!-- 通过v-show来控制二级列表的显示与隐藏，鼠标移入哪个一级，哪个一级对应的二级就显示 -->
                <div v-show="index === currentIndex" class="item-list clearfix">
                  <div class="subitem">
                    <!-- 我是第二级 -->
                    <dl
                      class="fore clearfix"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dt>
                        <a>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                          >
                            {{ c2.categoryName }}
                          </a>
                          <i class="iconfont icon-icon-test63"></i>
                        </a>
                      </dt>

                      <dd>
                        <!-- 我是第三级 -->
                        <a
                          v-for="c3 in c2.categoryChild"
                          :key="c3.categoryId"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >
                          {{ c3.categoryName }}
                        </a>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a>服装城</a>
        <a>美妆馆</a>
        <a>枝江超市</a>
        <a>枝江生鲜</a>
        <a>闪购</a>
        <a>团购</a>
        <a>枝江国际</a>
        <a>秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1, // 存储用户鼠标移上了哪一个一级分类
      isShow: true, // 控制商品列表显示还是隐藏
    };
  },
  methods: {
    // 用户的鼠标移入哪一个一级分类，就把 currentIndex 的值修改为那个一级分类的 index
    changeIndex(index) {
      // index：鼠标移上的某一个一级分类的元素的索引值
      // 正常情况（用户慢慢的操作）：鼠标进入每一个一级分类都会触发鼠标进入事件
      // 非正常情况（用户操作过快）：本应该全部的一级分类都触发鼠标进入事件，但实际上只有部分触发了
      // 就是因为用户行为过快，导致浏览器反应不过来。如果当前回调函数中有大量业务，有可能出现卡顿现象
      this.currentIndex = index;
    },
    // 当用户的鼠标从某一个一级分类移出的时候，将 currentIndex 的值复原
    recoverIndex() {
      this.currentIndex = -1;
      // 并且在这里判断一下，如果当前不是在 home 路由下，鼠标移出的同时还会让商品列表消失哦
      if (this.$route.name !== "home") {
        this.isShow = false;
      }
    },
    // 进行路由跳转的方法
    goSearch(event) {
      // 最好的解决方案：编程式导航 + 事件委托
      // 但有一些问题要解决：事件委托，是把全部子节点的事件交给父节点去触发
      // 要让点击 a标签 的时候，路由才会发生跳转，【怎么能确定用户点击的一定是 a标签 呢？】
      // 并且，就算用户点击的是 a标签，【又怎么确定点击的是几级的 a标签 呢？】

      // 解决方案：给 a标签 添加上自定义属性 data-categoryName，其他标签没有
      const element = event.target;
      // 我们可以获取到当前触发这个路由跳转事件的节点，带有 data-categoryName 属性的节点一定是 a标签
      // 通过 dataset 属性，可以获取到当前节点的自定义属性与属性值
      const { categoryname, category1id, category2id, category3id } =
        element.dataset;

      if (categoryname) {
        // 如果点击的是 a标签
        const location = { name: "search" };
        const query = { categoryName: categoryname };

        if (category1id) {
          // 如果点击的是一级标签
          query.category1Id = category1id;
        } else if (category2id) {
          // 如果点击的是二级标签
          query.category2Id = category2id;
        } else {
          // 如果点击的是三级标签
          query.category3Id = category3id;
        }

        // 如果当前页面还有 params参数 的话，跳转的时候还要带上 params参数
        location.params = this.$route.params;

        // 将参数整理好，动态给 location 对象添加 query属性
        location.query = query;
        // 路由跳转
        this.$router.push(location);
      }
    },
    // 当鼠标移入【全部商品分类】时，将商品列表展示出来 （前提是不在 home 路由下）
    show() {
      if (this.$route.name !== "home") {
        this.isShow = true;
      }
    },
  },
  computed: {
    // 拿到 home仓库 state 中的数据
    ...mapState("home", ["categoryList"]),
  },
  mounted() {
    // 组件挂载完毕判断一下，如果当前不是在主页的话，就将商品列表隐藏起来
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>

<style lang="less">
.type-nav {
  background: #fff;
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 15px;
      font-weight: bold;
    }

    .nav {
      a {
        cursor: pointer;
        font: 12px/1.5 Microsoft YaHei, Heiti SC, tahoma, arial;
        height: 45px;
        margin: 0 25px;
        line-height: 45px;
        font-size: 15px;
        color: #333;
        transition: all 0.3s ease;
      }

      a:hover {
        color: #C81623;
      }
    }

    .sort {
      left: 0;
      top: 52px;
      width: 210px;
      height: 455px;
      position: absolute;
      background: #fefefe;
      color: #636363;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              cursor: pointer;
              transition: color 0.2s ease;
            }

            a:hover {
              color: #c81623;
            }
          }

          .item-list {
            // display: none;
            position: absolute;
            width: 750px;
            min-height: 453px;
            background: #fff;
            left: 210px;
            border: 1px solid #f7f7f7;
            box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 734px;
              padding: 0 4px 0 8px;
              font-size: 12px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 85px;
                  text-align: right;
                  font-weight: 700;
                  white-space: nowrap;

                  a {
                    display: inline-flex;
                    justify-content: flex-end;
                    cursor: pointer;
                    transition: color 0.2s ease;
                  }

                  a:hover {
                    color: #c81623;
                  }
                }

                dd {
                  margin-top: 2px;
                  float: left;
                  width: 600px;

                  a {
                    margin-bottom: 10px;
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    color: #666;
                    transition: color 0.2s ease;
                    cursor: pointer;
                  }

                  a:hover {
                    color: #c81623;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background: #d9d9d9;
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    // 过渡动画结束状态（进入）
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>