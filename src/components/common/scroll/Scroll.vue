<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import Pullup from "@better-scroll/pull-up";
import ObserveDOM from "@better-scroll/observe-dom";

BScroll.use(Pullup);
BScroll.use(ObserveDOM);

export default {
  name: "Scroll",
  data() {
    return {
      bscroll: null,
    };
  },
  props: {
    // 0/1/2/3
    probeType: {
      type: Number,
      default: 0,
    },
    //上拉加载更多
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.bscroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      observeDOM: true,
      click: true, //若为false，div中不可监听点击事件
      pullUpLoad: this.pullUpLoad,
    });
    //监听滚动事件
    if (this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on("scroll", (position) => {
        // console.log(position);
        this.$emit("scroll", position);
      });
    }
    // 监听滚动到底部
    if (this.pullUpLoad) {
      //不是每个使用滚动的组件都需要监听，需要监听时才监听
      this.bscroll.on("pullingUp", () => {
        this.$emit("pullingUp");
        this.bscroll.finishPullUp(); //可以多次监听此事件
      });
    }
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.bscroll.scrollTo(x, y, time);
    },
    refresh() {
      this.bscroll && this.bscroll.refresh();
    },
    getScrollY() {
      return this.bscroll ? this.bscroll.y : 0;
    }
  },
};
</script>

<style scoped>
</style>
