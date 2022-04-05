<template>
  <div class="cart-bottom-bar">
    <check-button/>
    <div class="title">全选&nbsp;&nbsp;合计￥{{totalAmt}}</div>
    <div class="to-calc">去结算</div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";

export default {
  name: "CartBottomBar",
  props: {
    isAll: {
      type: Boolean,
      default() {
        return true
      }
    },
    totalAmt: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  components: {
    CheckButton
  }
}
</script>

<style scoped>
  .cart-bottom-bar {
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 49px;
    z-index: 16;
    height: 49px;
    line-height: 49px;
    display: flex;
  }

  .to-calc {
    background-color: orangered;
    color: #fff;
    width: 35%;
    text-align: center;
  }

  .title {
    background-color: #f2f2f2;
    color: #666666;
    width: 65%;
  }

  .is-all {
    color: var(--color-tint);
  }
</style>
