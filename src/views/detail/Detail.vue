<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages" class="detail-swiper"/>
    <detail-base-info :goods="goods"/>
    <detail-shop-info :shop="shop"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {}
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo
  },
  created() {
    this.iid = this.$route.params.iid

    // 请求数据
    this.getDetailData()
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
      })
    }
  }
}
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }
</style>
