<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" :options="scrollOptions" ref="scroll" @scroll="scroll">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo" @goodsImageLoaded="goodsImageLoaded"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      scrollOptions: {
        probeType: 3,
      },
      detailInfo: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,

    Scroll
  },
  created() {
    this.iid = this.$route.params.iid

    // 请求数据
    this.getDetailData()
  },
  mounted() {
    // 将防抖函数挂载到refresh上面
    this.refresh = debounce(this.$refs.scroll.refresh, 200)
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        // 1. 获取结果
        const data = res.result
        console.log(data)

        // 2. 获取顶部轮播图信息
        this.topImages = data.itemInfo.topImages

        // 3. 获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4. 获取店铺基本信息
        this.shop = new Shop(data.shopInfo);

        // 5. 获取商品详细信息
        this.detailInfo = data.detailInfo;
      })
    },
    scroll(pos) {
      // console.log(pos)
    },
    refresh() {},

    // 商品详细信息加载完成后刷新scroll高度
    goodsImageLoaded() {
      this.refresh()
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }

  #detail {
    height: 100vh;
    position: relative;
    z-index: 12;
    background-color: #fff;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>
