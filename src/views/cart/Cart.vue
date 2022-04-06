<template>
  <div id="cart">
    <cart-nav-bar/>
    <cart-list class="content"/>
    <cart-bottom-bar/>
  </div>
</template>

<script>

import CartNavBar from "./childComponents/CartNavBar";
import CartList from "./childComponents/CartList";
import CartBottomBar from "./childComponents/CartBottomBar";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
  #cart {
    height: 100vh;
    position: relative;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 142px);
    overflow: hidden;
  }
</style>
