import {
  INCRE_COUNT,
  ADD_TO_CART
} from './mutations-type'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid);
      if (product) {
        context.commit(INCRE_COUNT, product)
        resolve('商品数加一');
      } else {
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加到购物车')
      }
    })
  }
}
