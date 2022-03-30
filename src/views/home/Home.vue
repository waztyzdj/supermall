<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar'

export default {
  name: "Home",
  components: {
    NavBar
  }
};
</script>

<style>
  .home-nav-bar {
    text-align: center;
    background: var(--color-tint);
    color: #fff;
  }
</style>