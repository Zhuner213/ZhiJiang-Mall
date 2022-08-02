<template>
  <div>
    <Header v-if="$route.meta.showHeader"/>
    <router-view></router-view>  
    <Footer v-show="$route.meta.showFooter" :class="{atHome:$route.name=='home'}"/>
  </div>
</template>

<script>
  import Header from './components/Header/index.vue'
  import Footer from './components/Footer/index.vue'

  export default {
    name: 'App',
    components: {Header, Footer},
    mounted() {
      // 当 APP组件 挂载完毕，Vuex 的 actions 去向服务器发送请求获取数据，然后把数据存放在 state 中
      // 将请求放在 APP组件 中的好处就是保证请求只发送一次
      // 放在别的里面来回切换路由显示的时候会一直发请求，这样不好
      this.$store.dispatch("home/categoryList");
      this.$store.dispatch("home/bannerList");
      this.$store.dispatch("home/floorList")
    },
  }
</script>

<style scoped>
.atHome {
  background: #f4f4f4;
}
</style>