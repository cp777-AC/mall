<template>
  <div class="bottom-bar">
    <div class="content" @click="changeSelectAll">
      <check-button class="check-button" :is-check="isSelectAll"></check-button>
      <span class="text">全选</span>
    </div>
    <div class="price">合计¥：{{ totalPrice }}</div>
    <div class="calculate">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottomBar",
  data() {
    return {
      checkSum: false,
    };
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.isCheck === true;
        })
        .reduce((pre, item) => {
          return pre + item.count * item.price;
        }, 0);
    },
    checkLength() {
      return this.cartList.filter((item) => {
        return item.isCheck === true;
      }).length;
    },
    isSelectAll() {
      // return this.cartList.length === this.checkLength;
      if (this.cartList.length === 0) return false;
      return !this.cartList.some((item) => !item.isCheck);
    },
  },
  methods: {
    changeSelectAll() {
      // if (this.isSelectAll) {
      //   this.cartList.forEach((item) => {
      //     item.isCheck = false;
      //   });
      // } else {
      //   this.cartList.forEach((item) => {
      //     item.isCheck = true;
      //   });
      // }
      // 不行，item.isCheck在变化时会影响isSelectAll的值
      // this.cartList.forEach(item => item.isCheck = !this.isSelectAll)
      let tmp = this.isSelectAll;
      this.cartList.forEach(item => item.isCheck = !tmp)

    },
  },
  components: {
    CheckButton,
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.content {
  display: flex;
  width: 40px;
  height: 40px;
  align-items: center;
}
.check-button,
.text {
  width: 40px;
  height: 20px;
  white-space: nowrap;
  margin-left: 5px;
}

.bottom-bar {
  background-color: #eee;
  position: relative;
  height: 40px;
}

.price {
  /* flex:1 */
}

.calculate {
  width: 90px;
  height: 40px;
  color: #fff;
  background-color: red;
  line-height: 40px;
  text-align: center;
}
</style>
