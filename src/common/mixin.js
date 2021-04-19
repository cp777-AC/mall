import { debounce } from "common/utils";
import BackTop from "components/content/backTop/BackTop.vue";

export const itemListenerMixin = {
  data () {
    return {
      itemImageListener: null,
      newRefresh:null,
    }
  },
  mounted() {

    // 1.图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100); //传的是函数，不是函数返回值
    // 对监听的事件进行保存
    this.itemImageListener = () => {
      this.newRefresh();
    };

    this.$bus.$on("itemImageLoad", this.itemImageListener);
  }
}

// backtop
export const backTopMixin = {
  data () {
    return {
      isShowBackUp: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    // 回到顶部点击事件
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
      // this.$refs.scroll.bscroll.scrollTo(0,-1000,100);
    },
    listenBackup(positionY) {
      this.isShowBackUp = positionY > 1000;
    }

  }
}
