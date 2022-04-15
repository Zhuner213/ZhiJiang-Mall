<template>
  <div class="pagination">
    <!-- 分页器上部 -->
    <button @click="pageUp">上一页</button>
    <!-- 下面两个是所有奇数情况通用的公式算法 -->
    <button v-show="(pageNo > Math.ceil(continuePage / 2))&&totalPage>continuePage" @click="goPage">
      1
    </button>
    <button v-show="(pageNo >= Math.ceil(continuePage / 2) + 2)&&totalPage>continuePage" @click="goPage">
      2
    </button>
    <!-- 下面这个只适用于连续页码为5的情况 -->
    <button v-show="pageNo > continuePage + 2">···</button>

    <!-- 分页器中部 -->
    <!-- 当总页码数小于连续页码数，应当只遍历总页码数的次数 -->
    <template v-if="totalPage < continuePage">
      <button v-for="(no, index) in totalPage" :key="index" @click="goPage"  :class="{active:pageNo==no}">
        {{no}}
      </button>
    </template>

    <button
      v-for="(no, index) in continuePage"
      :key="index"
      @click="goPage"
       :class="{active:pageNo==continuePageNo(no, continuePage, pageNo)}"
      v-else
    >
      {{ continuePageNo(no, continuePage, pageNo) }}
    </button>

    <!-- 分页器下部 -->
    <button v-show="(pageNo <= totalPage - Math.ceil(continuePage / 2))&&totalPage>continuePage">
      ···
    </button>
    <!-- <button
      v-show="(pageNo < totalPage - Math.ceil(continuePage / 2) + 1)&&totalPage>continuePage"
      @click="goPage"
    >
      {{ totalPage }}
    </button> -->

    <button @click="pageDown">下一页</button>
    <button style="margin-left: 30px">共 {{ totalPage }} 页</button>
    <button>共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      continuePage: 5, // 连续的页码数
    };
  },
  props: ["pageNo", "pageSize", "total"],
  computed: {
    // 分页器的总页码数
    // 这里要向上取整
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算一下连续页码的每一个页码数
    // 先解决第一个bug：当前页码数过小或过大时连续页码的异常显示
    continuePageNo() {
      return (no, continuePage, pageNo) => {
        // 算出连续页码数的中位数
        const median = Math.ceil(continuePage / 2);
        // 算出中位数与当前 no 的差值
        const i = median - no;
        // 用当前页数减去这个差值即为应当显示的页码
        const showNo = pageNo - i;
        // 当页码数过小，则显示的页码数就是遍历 continuePage
        if (pageNo < median) return no;
        // 当页码数过大，则显示的页码数应当为最后 continuePage 个
        if (pageNo > this.totalPage - median + 1)
          return this.totalPage - continuePage + no;
        return showNo;
      };
    },
  },
  methods: {
    // 上一页
    pageUp() {
      // 触发全局事件总线，向父组件传递页码的值
      if (this.pageNo > 1) this.$bus.$emit("getPageNo", this.pageNo - 1);
    },
    // 下一页
    pageDown() {
      // 触发全局事件总线，向父组件传递页码的值
      if (this.pageNo < this.totalPage)
        this.$bus.$emit("getPageNo", this.pageNo + 1);
    },
    // 点击页码前往相应的页面
    goPage(event) {
      // 触发全局事件总线，向父组件传递页码的值
      this.$bus.$emit("getPageNo", parseInt(event.target.innerHTML));
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>