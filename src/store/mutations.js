import {INCRE_COUNT, ADD_TO_CART} from './mutations-type'
import Vue from 'vue'
export default {

  // mutations中的每一个方法完成的事件尽可能单一
    // addCart中国呢的方法做了2件事 count+1/添加到购物车  这不河里，跟踪是无法判断进行了什么操作
    // 这里包含一些判断逻辑，所以放到action中呢比较合适
    // addCart(state, payload) {
    //   let product = state.cartList.find(item => item.iid === payload.iid);
    //   if (product) {
    //     product.count++;
    //   } else {
    //     payload.count = 1;
    //     state.cartList.push(payload)
    //   }
    // }
  [INCRE_COUNT](state, payload) {
    payload.count++;
  },

  [ADD_TO_CART](state, payload) {
    payload.isCheck = true;
    state.cartList.push(payload);
  }
}
