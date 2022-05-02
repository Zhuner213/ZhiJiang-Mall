<template>
    <div>
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <Rank/>
        <Like/>
        <Floor v-for="floorData in floorList" :key="floorData.id" :floorData="floorData"/>
        <!-- <Floor  :floorData="floorList[0]"/>
        <Floor  :floorData="floorList[1]"/> -->
        <Brand/>
    </div>
</template>

<script>
// 引入相关组件
    import ListContainer from './ListContainer'
    import Recommend from './Recommend'
    import Rank from './Rank'
    import Like from './Like'
    import Floor from './Floor'
    import Brand from './Brand'

    import {mapState} from 'vuex'

    export default {
        name: 'Home',
        components: {ListContainer,Recommend,Rank,Like,Floor,Brand},
        computed:{
            ...mapState('home', ['floorList'])
        },
        mounted() {
            // home组件挂载完毕就向服务器发请求获取登录用户的信息
            this.$store.dispatch('users/getUserInfo')
        },
    }
</script>

<style>
body {
    background: #f5f5f5;
}
</style>