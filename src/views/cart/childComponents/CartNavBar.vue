<template>
  <nav-bar class="cart-nav-bar">
    <div slot="center">购物车</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";

export default {
  name: "CartNavBar",
  components: {
    NavBar
  }
}
</script>

<style scoped>
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
