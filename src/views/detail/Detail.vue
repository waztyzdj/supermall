<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar"/>
    <scroll class="content" :options="scrollOptions" ref="scroll" @scroll="scroll">
      <detail-swiper :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info class="detail-goods-info" :detailInfo="detailInfo" @goodsImageLoaded="goodsImageLoaded"/>
      <detail-param-info :paramInfo="paramInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <detail-recommend-info :recommendList="recommendList"/>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import DetailRecommendInfo from "./childComponents/DetailRecommendInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, getRecommend, Goods, Shop, GoodsParam } from "network/detail";
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
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,

    Scroll
  },
  created() {
    this.iid = this.$route.params.iid

    // 请求商品数据
    this.getDetailData()

    // 请求推荐数据
    this.getRecommendData()
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

        // 2. 获取顶部轮播图信息
        this.topImages = data.itemInfo.topImages

        // 3. 获取商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 4. 获取店铺基本信息
        this.shop = new Shop(data.shopInfo);

        // 5. 获取商品详细信息
        this.detailInfo = data.detailInfo;

        // 6. 获取商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

        // 7. 获取商品评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      })
    },

    getRecommendData() {
      getRecommend().then((res, error) => {
        if (error) return
        this.recommendList = res.data.list
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
    overflow: hidden;
  }

  .detail-goods-info {
    padding-left: 8px;
    padding-right: 8px;
  }
</style>
