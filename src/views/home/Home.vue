<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navBar/NavBar";
import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  data() {
    return {
      banner: null,
      recommend: null
    }
  },
  components: {
    NavBar,
  },
  created() {
    getHomeMultidata().then(res => {
      this.banner = res.data.banner
      this.recommend = res.data.recommend
    });
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