<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      class="tab-control"
      :title="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <feature-view></feature-view>
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackUp"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import HomeRecommend from "./childComps/HomeRecommend";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import GoodList from "components/content/goods/GoodList.vue";
import Scroll from "components/common/scroll/Scroll.vue";

import { getMultiData, getHomeGoods } from "network/home.js";

import { itemListenerMixin, backTopMixin } from "common/mixin";
export default {
  name: "Home",
  components: {
    HomeSwiper,
    HomeRecommend,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    Scroll,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      // isShowBackUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  mixins: [itemListenerMixin, backTopMixin],
  created() {
    // 1.请求多个数据
    this.getMultiData();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  destroyed() {
    // console.log('home');
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  mounted() {},
  methods: {
    /**
     * 事件监听相关的方法
     */

    // tab点击事件
    //根据点击事件，改变当前应该展示的数据类型currentType，绑定应该展示的数据this.goods[currentType].list 传送到子组件展示
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    // 回到顶部点击事件
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    //   // this.$refs.scroll.bscroll.scrollTo(0,-1000,100);
    // },
    // 内容滚动事件
    contentScroll(position) {
      const positionY = -position.y;
      // 1.判断backTop是否显示
      this.listenBackup(positionY);
      // console.log(this.$refs.tabControl.$el.style.position);
      // 2.决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载事件
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.newRefresh();
    },
    // 轮播图图片加载完成
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /**
     * 网络请求相关方法
     */
    getMultiData() {
      getMultiData().then((res) => {
        (this.banners = res.data.banner.list),
          (this.recommends = res.data.recommend.list);
      });
    },

    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
  activated() {
    // console.log('进'+this.saveY);
    setTimeout(() => {
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    }, 0);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
    // console.log('出'+this.saveY);
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 在使用浏览器原生滚动时才用 */
  /* position: fixed; 
  left: 0;
  right: 0;
  top: 0; */
  position: relative;
  z-index: 9;
}

#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}

.tab-control {
  /* position: sticky;
  top: 44px; */
  position: relative;
  z-index: 8;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
/* .content{
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
