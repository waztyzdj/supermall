<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend :recommend="recommend"></recommend>
    <feature/>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
    />
    <goods-list :goodsList="goodsList"/>
  </div>
</template>

<script>
import HomeSwiper from './childComponents/HomeSwiper'
import Recommend from "./childComponents/Recommend";
import Feature from "./childComponents/Feature";

import NavBar from 'components/common/navBar/NavBar';
import TabControl from "components/common/tabControl/TabControl";
import GoodsList from "components/content/goodsList/GoodsList";

import { getHomeMultidata, getHomeGoods } from 'network/home';

export default {
  name: 'Home',
  data() {
    return {
      banner: null,
      recommend: null,
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      goodsList: [],
      currTabType: 'pop'
    }
  },
  components: {
    HomeSwiper,
    Recommend,
    Feature,

    NavBar,
    TabControl,
    GoodsList
  },
  created() {
    // 获取首页banner及recommend数据
    this.getHomeMultidata()

    // 获取首页列表数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    // 显示流行商品列表
    this.tabClick(0)
  },
  methods: {
    /**
     * 事件监听方法
     */
    tabClick(index) {
      if(index === 0) {
        this.currTabType = 'pop'
      } else if(index === 1) {
        this.currTabType = 'new'
      } else if(index === 2) {
        this.currTabType = 'sell'
      }
      this.goodsList = this.goods[this.currTabType].list;
    },

    /**
     * 网络请求方法
     */
    // 获取首页banner及recommend数据
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      });
    },

    // 获取首页商品数据
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page = page
      })
    }
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

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
