<template>
  <div id="detail">
    <detail-nav-bar
      ref="nav"
      class="detail-nav"
      @navItemClick="navItemClick"
    ></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="param"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <good-list ref="recommend" :goods="recommends"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackUp"></back-top>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DeatilGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll.vue";
import GoodList from "components/content/goods/GoodList";
import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import { mapActions } from "vuex";

import {
  getGoodsDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";
export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,

    Scroll,
    GoodList,
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0,
    };
  },
  created() {
    // 1.保存传入的id
    this.iid = this.$route.params.id;
    // console.log(this.iid);

    // 2.根据iid请求数据
    getGoodsDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;
      // 1.获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages;
      // 1.创建商品信息的对象
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品详细数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      /**
       * 值不对的原因，this.$refs.param.$el没有渲染
       */
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      // console.log(this.themeTopYs);
      // 7.推荐商品
      getRecommend().then((res) => {
        this.recommends = res.data.list;
      });

      // 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
      // this.$nextTick(() => {
      //   // 根据最新的数据，对应的DOM已经被渲染出来了，
      //   // 但是图片依旧是没有加载出来的（目前的offsetTop不包含图片高度）
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      //   console.log(this.themeTopYs);
      // });

      this.getThemeTopYs = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
        this.themeTopYs.push(Number.MAX_VALUE); //奇淫巧技 -- 多加一个值
        // console.log(this.themeTopYs);
      }, 100);
    });
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListener);
  },
  updated() {},
  methods: {
    ...mapActions(["addCart"]),
    navItemClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    // 监听详情图片加载完成
    detailImageLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();

      this.getThemeTopYs();
    },

    contentScroll(position) {
      // this.getThemeTopYs();
      const positionY = -position.y;
      // if(positionY < this.themeTopYs[1]) {
      //   this.currentIndex = 0;
      // }
      // else if(positionY < this.themeTopYs[2]) {
      //   this.currentIndex = 1;
      // }
      // else if(positionY < this.themeTopYs[3]) {
      //   this.currentIndex = 2;
      // }
      // else {
      //   this.currentIndex = 3;
      // }
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        i = parseInt(i);
        if (
          // (this.currentIndex !== i &&
          //   i < length - 1 &&
          //   positionY >= this.themeTopYs[i] &&
          //   positionY < this.themeTopYs[i + 1]) ||
          // (i === length - 1 && positionY > this.themeTopYs[i])
          this.currentIndex !== i &&
          positionY > this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          // 赋值过于频繁 解决 this.currentIndex !== i
          this.currentIndex = i;
          this.$refs.nav.currentIndex = i;
        }
      }

      this.listenBackup(positionY);
    },
    addToCart() {
      // 1.获取购物车需要的信息
      const product = {};
      product.iid = this.iid;
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;

      // 2.将商品添加到购物车中

      // this.$store.commit('addCart', product)
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      this.addCart(product).then((res) => console.log(res));
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>
