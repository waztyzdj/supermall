<template>
  <nav-bar class="cart-nav-bar">
    <div slot="center">购物车({{cartListLength}})</div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import { mapGetters } from 'vuex'

export default {
  name: "CartNavBar",
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartList', 'cartListLength'])
  }
}
</script>

<style scoped>
  .cart-nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
