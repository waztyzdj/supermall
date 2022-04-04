<template>
  <div id="detail">
    <detail-nav-bar ref="detailNavBar" class="detail-nav-bar"/>
    <scroll class="content" :options="scrollOptions" ref="scroll" @scroll="scroll">
      <detail-swiper ref="detailSwiper" :topImages="topImages" class="detail-swiper"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info class="detail-goods-info" :detailInfo="detailInfo" @goodsImageLoaded="goodsImageLoaded"/>
      <detail-param-info ref="detailParamInfo" :paramInfo="paramInfo"/>
      <detail-comment-info ref="detailCommentInfo" :commentInfo="commentInfo"/>
      <detail-recommend-info ref="detailRecommendInfo" :recommendList="recommendList"/>
    </scroll>
    <detail-bottom-bar/>
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
import DetailBottomBar from "./childComponents/DetailBottomBar";

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
      recommendList: [],

      detailSwiperOffsetY: 0,
      detailParamInfoOffsetY: 0,
      detailCommentInfoOffsetY: 0,
      detailRecommendInfoOffsetY: 0
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
    DetailBottomBar,

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
      const y = -pos.y
      const currIndex = this.$refs.detailNavBar.currIndex
      let index

      if(y < this.detailParamInfoOffsetY) {
        index = 0
      } else if(y >= this.detailParamInfoOffsetY && y < this.detailCommentInfoOffsetY) {
        index = 1
      } else if(y >= this.detailCommentInfoOffsetY && y < this.detailRecommendInfoOffsetY) {
        index = 2
      } else if(y >= this.detailRecommendInfoOffsetY) {
        index = 3
      }

      if(index !== currIndex) {
        this.$refs.detailNavBar.setTabIndex(index)
      }
    },
    refresh() {},

    // 商品详细信息加载完成后刷新scroll高度
    goodsImageLoaded() {
      this.refresh()
      this.detailSwiperOffsetY = this.$refs.detailSwiper.$el.offsetTop
      this.detailParamInfoOffsetY = this.$refs.detailParamInfo.$el.offsetTop
      this.detailCommentInfoOffsetY = this.$refs.detailCommentInfo.$el.offsetTop
      this.detailRecommendInfoOffsetY = this.$refs.detailRecommendInfo.$el.offsetTop
    },

    scrollTo(index) {
      if(index === 0) {
        this.$refs.scroll.scrollTo(0, -this.detailSwiperOffsetY, 0)
      } else if(index === 1) {
        this.$refs.scroll.scrollTo(0, -this.detailParamInfoOffsetY, 0)
      } else if(index === 2) {
        this.$refs.scroll.scrollTo(0, -this.detailCommentInfoOffsetY, 0)
      } else if(index === 3) {
        this.$refs.scroll.scrollTo(0, -this.detailRecommendInfoOffsetY, 0)
      }
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
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }

  .detail-goods-info {
    padding-left: 8px;
    padding-right: 8px;
  }
</style>
