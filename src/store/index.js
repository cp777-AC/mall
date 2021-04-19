import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'
// 导入vuex
Vue.use(Vuex);

const state = {
  cartList: [],
}
// 创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 挂载到vue实例上
export default store;
