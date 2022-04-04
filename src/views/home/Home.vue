<template>
  <div id="home">
    <nav-bar class="home-nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control"
                 :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 v-show="isFixTabControl"
    />
    <scroll class="content" :options="scrollOptions" ref="scroll" @pullingUp="loadMore" @scroll="scroll">
      <home-swiper :banner="banner"></home-swiper>
      <recommend :recommend="recommend"></recommend>
      <feature/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"
      />
      <goods-list :goodsList="goodsList"/>
    </scroll>
    <back-top v-show="isShowBackTop" class="back-top" @click.native="backTopClick"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComponents/HomeSwiper'
import Recommend from "./childComponents/Recommend";
import Feature from "./childComponents/Feature";

import NavBar from 'components/common/navBar/NavBar';
import TabControl from "components/common/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import GoodsList from "components/content/goodsList/GoodsList";

import { getHomeMultidata, getHomeGoods } from 'network/home';
import { debounce } from 'common/utils'
import { backTopMixin } from 'common/mixin'

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
      currTabType: 'pop',
      scrollOptions: {
        probeType: 3,
        click: true,
        pullUpLoad: {
          threshold: 1000
        }
      },
      tabControlOffsetTop: 0,
      isFixTabControl: false,
      saveY: 0
    }
  },
  components: {
    HomeSwiper,
    Recommend,
    Feature,

    NavBar,
    TabControl,
    Scroll,

    GoodsList
  },
  mixins: [backTopMixin],
  created: function () {
    // 获取首页banner及recommend数据
    this.getHomeMultidata()

    // 获取首页列表数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 显示商品列表
    this.tabClick(0);

    // 增加监听图片加载时间
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    this.$bus.$on('goodsItemImgLoaded', () => {
      refresh()
    })

    // 增加延迟获取tabControl的offsetHeight
    setTimeout(() => {
      this.tabControlOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }, 1000)
  },

  activated() {
    // 页面回来时滚动到Y原来的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },

  deactivated() {
    // 页面离开时保存Y滚动的位置
    this.saveY = this.$refs.scroll.getScrollY()
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
      this.goodsList = this.goods[this.currTabType].list
      this.$refs.tabControl1.currIndex = index
      this.$refs.tabControl2.currIndex = index
    },

    // 下滑到底部加载数据
    loadMore(){
      this.getHomeGoods(this.currTabType)
    },

    // 滑动时触发
    scroll(pos) {
      this.lintenIsShowBackTop()
      this.isFixTabControl = -pos.y >= this.tabControlOffsetTop
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
        this.$refs.scroll.finishPullUp()
      })
    }
  }
};
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav-bar {
    text-align: center;
    background: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0px;
  }
</style>
