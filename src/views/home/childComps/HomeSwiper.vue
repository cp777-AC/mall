<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index.js";

export default {
  name: "HomeSwiper",
  data () {
    return {
      isLoad:false,  
    }
  },
  props:{
    banners:{
      type:Array,
      default() {
        return []
      },
      // default: []
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {   //发送一次即可（轮播图有四张，不加判断会发四次）
      if(!this.isLoad) {
        this.$emit('swiperImageLoad');
        this.isLoad = true;
      }
    }
  }
};
</script>

<style scoped>
</style>
