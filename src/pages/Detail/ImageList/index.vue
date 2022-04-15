<template>
  <div class="container">
    <div 
      class="image" 
      v-for="(img, index) in imgList" 
      :key="index"
      @mouseover="sendImgIndex(index)"
    >
      
      <img :src="img.imgUrl" :class="{active:index == defaultIndex}"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageList",
  props: ["imgList"],
  data() {
    return {
      defaultIndex: 0
    }
  },
  // 实现功能：鼠标滑过小图时，大图也切换为对应的图片（涉及到兄弟组件间的通信）
  // 实现功能：页面进来小图高亮边框默认第一张，随后鼠标经过谁谁就亮，别的不亮（排他？）
  methods: {
   // 当鼠标滑过图片，向兄弟组件 Zoom 传递鼠标经过的图片的 index
   // 这里再将 data 中的 defaultIndex 改为 鼠标经过的图片的 index
    sendImgIndex(index) {
      this.$bus.$emit('getImgIndex', index)
      this.defaultIndex = index
    }
  }

};
</script>

<style lang="less" scoped>
.container {
  margin-top: 20px;
  height: 56px;
  width: 400px;
  display: flex;
  justify-content: space-around;

  .image {
    width: 56px;
    height: 56px;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #000;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #000;
        padding: 1px;
      }
    }
  }
}
</style>