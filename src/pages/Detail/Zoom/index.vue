<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <!-- 放大镜事件区域 -->
    <div class="event" @mousemove="magnifyHandler"></div>
    <!-- 旁边展示放大效果的区域 -->
    <div class="big">
      <img :src="imgUrl" ref="bigImg"/>
    </div>
    <!-- 放大镜遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ["imgList"],
    data() {
      return {
        timer: null,
        index: 0, // 用来接收兄弟组件传来的当前应当显示的图片的索引,默认展示的图片应该是数组第一个
      }
    },  
    computed: {
      // 当前应该展示的图片的url
      imgUrl() {
        return this.imgList[this.index].imgUrl
      }
    },
    methods: {
      // 放大镜的触发函数
      magnifyHandler(event) {
        const mask = this.$refs.mask
        const bigImg = this.$refs.bigImg
        // offsetX 是鼠标距左边框的距离，offsetY 是鼠标距上边框的距离，offsetWidth offsetHeight 是遮罩层的宽和长
        // leftData 计算的是遮罩层左边 到 左边框的距离
        // topData 计算的是遮罩层上边 到 上边框的距离
        let leftData = event.offsetX - 0.5*mask.offsetWidth
        let topData = event.offsetY - 0.5*mask.offsetHeight
        mask.style.left = leftData + 'px'
        mask.style.top = topData +'px'
        bigImg.style.left = -2*leftData + 'px'
        bigImg.style.top = -2*topData + 'px'
        // 判断一下，遮罩层的移动是有界限的，不能越界了
        if(leftData <= 0) {
          mask.style.left ='0px'
        }  
        if(leftData >= mask.offsetWidth) {
          mask.style.left = mask.offsetWidth + 'px'
        }
        if(topData <= 0) {
          mask.style.top = '0px'
        }
        if(topData >= mask.offsetHeight) {
          mask.style.top = mask.offsetHeight + 'px'         
        }
      }
    },
    mounted() {
      // 定义全局事件总线的事件：从兄弟组件下方的小图接收到 对应图片的index（兄弟俩用的同一个图片数组）
      this.$bus.$on('getImgIndex',(currentIndex) => {
        this.index = currentIndex
      })
      // Zoom组件挂载完毕后5s检查一下服务器资源有没有，没有的话就给用户提示并返回上一级的路由
      this.timer = setTimeout(() => {
        if(!this.imgList[0].imgUrl) {
          alert('您要的商品似乎不存在了😢')
          this.$router.back()
        }
      }, 5000)
    },
    beforeDestroy() {
      // 组件销毁前清除定时器
      this.timer = null
      // 组件销毁前解绑全局事件总线的自定义事件
      this.$bus.$off(['getImgIndex'])
    },
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>