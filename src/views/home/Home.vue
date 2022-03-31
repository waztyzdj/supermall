<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend :recommend="recommend"></recommend>
    <feature/>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>

  </div>
</template>

<script>
import NavBar from 'components/common/navBar/NavBar';
import HomeSwiper from './childComponents/HomeSwiper'
import Recommend from "./childComponents/Recommend";
import Feature from "./childComponents/Feature";

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
    Recommend,
    Feature
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
  #home {
    padding-top: 44px;
  }
  .home-nav-bar {
    text-align: center;
    background: var(--color-tint);
    color: #fff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
</style>
