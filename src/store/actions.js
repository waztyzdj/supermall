import {
  ADD_RPODUCT_COUNT,
  ADD_RPODUCT_TO_CART
} from './mutation-types'

export default {
  addToCartList(context, product) {
    return new Promise((resolve, reject) => {
      let haveProduct = context.state.cartList.find(item => item.iid === product.iid)
      if(haveProduct) {
        context.commit(ADD_RPODUCT_COUNT, haveProduct)
        resolve('该商品已在购物车，数量增加1。')
      } else {
        context.commit(ADD_RPODUCT_TO_CART, product)
        resolve('该商品已成功添加到购物车。')
      }
    })
  }
}
