<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  data() {
    return {};
  },
  methods: {
    itemClick() {
      this.$router.push("/location").catch((err) => {
        console.log(err);
      });
      this.$router.replace(this.path);
      // console.log(111);
    },
  },
  computed: {
    isActive() {
      return this.$route.path.includes(this.path);
    },
    activeStyle() {
      return this.isActive == true ? {color:this.activeColor} : {}
    }
  },
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  background-color: #f6f6f6;
  font-size: 14px;
  text-align: center;
}

.tab-bar-item img {
  height: 24px;
  width: 24px;
  vertical-align: middle;
  margin-top: 3px;
  margin-bottom: 2px;
  /* height: 24px;
  width: 24px;
  margin-top: 3px;
  margin-bottom: 2px; */
  /* overflow: hidden; */
  /* vertical-align: bottom; */
  /* 图片垂直间隙：默认基线对齐 */
}
</style>
