import {
  ADD_RPODUCT_COUNT,
  ADD_RPODUCT_TO_CART
} from './mutation-types'

export default {
  [ADD_RPODUCT_COUNT](state, payLoad) {
    payLoad.count++
  },
  [ADD_RPODUCT_TO_CART](state, payLoad) {
    payLoad.checked = true
    state.cartList.push(payLoad)
  }
}
