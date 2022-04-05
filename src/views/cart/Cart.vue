<template>
  <div id="cart">
    <cart-nav-bar/>
    <scroll class="content">
    </scroll>
    <cart-bottom-bar/>
  </div>
</template>

<script>

import CartNavBar from "./childComponents/CartNavBar";
import CartBottomBar from "./childComponents/CartBottomBar";

import Scroll from "components/common/scroll/Scroll";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartBottomBar,
    Scroll
  }
};
</script>

<style>

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
