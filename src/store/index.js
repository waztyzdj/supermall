import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addToCartList(state, product) {
      let haveProduct = state.cartList.find(item => item.iid === product.iid)
      if(haveProduct) {
        haveProduct.count++
      } else {
        state.cartList.push(product)
      }
    }
  }
})

export default store
