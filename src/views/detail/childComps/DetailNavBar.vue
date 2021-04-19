<template>
  <div>
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="" />
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div
            class="title-item"
            v-for="(item, index) in titles"
            :key="index"
            @click="itemClick(index)"
            :class="{ active: isActive(index) }"
          >
            {{ item }}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  // props:{
  //   cIndex:{
  //     type:Number,
  //     default:0
  //   }
  // },
  components: {
    NavBar,
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("navItemClick", index);
    },
    isActive(index) {
      return index === this.currentIndex;
    },
    backClick() {
      this.$router.back();
    }
  },
  computed: {
    //计算属性不传参数
    // isActive(index) {
    //   return index === this.currentIndex;
    // },
  },
  // watch: {
  //   cIndex() {
  //     this.currentIndex = this.cIndex;
  //   }
  // }
};
</script>

<style scoped>
.title {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 17px;
}

.active {
  color: var(--color-high-text);
}

.back img{
  margin-top: 10px;
}
</style>
