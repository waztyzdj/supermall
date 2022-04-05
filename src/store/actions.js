import {
  ADD_RPODUCT_COUNT,
  ADD_RPODUCT_TO_CART
} from './mutation-types'

export default {
  addToCartList(context, product) {
    let haveProduct = context.state.cartList.find(item => item.iid === product.iid)
    if(haveProduct) {
      context.commit(ADD_RPODUCT_COUNT, haveProduct)
    } else {
      context.commit(ADD_RPODUCT_TO_CART, product)
    }
  }
}
