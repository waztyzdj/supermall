<template>
  <div class="bottom-menu">
    <check-button class="select-all" v-model="isAll" @checkBtnClick="selectAll"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalAmt}}</span>
    <span class="buy-product">去结算({{totalCount}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

import { mapGetters } from 'vuex'

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  data(){
    return {
      isAll: true
    }
  },
  methods: {
    selectAll() {
      this.isAll = !this.isAll
      this.cartList.map(item => {
        item.checked = this.isAll
      })
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartListLength']),
    totalAmt() {
      let totalAmt = 0
      this.cartList.filter(item => item.checked).forEach(item => totalAmt += item.count * item.price)
      return totalAmt
    },
    totalCount() {
      this.isAll = this.cartList.filter(item => item.checked).length === this.cartListLength
      return this.cartList.filter(item => item.checked).length
    }
  }
}
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 50px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  }
</style>
