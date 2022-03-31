<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend :recommend="recommend"></recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar';
import HomeSwiper from './childComponents/HomeSwiper'
import Recommend from "./childComponents/Recommend";

import { getHomeMultidata } from 'network/home';

export default {
  name: 'Home',
  data() {
    return {
      banner: null,
      recommend: null
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    Recommend
  },
  created() {
    getHomeMultidata().then(res => {
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
      console.log(res.data)
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
