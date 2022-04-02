<template>
  <div class="detail">
    <detail-nav-bar/>
    <detail-swiper :topImages="topImages" class="detail-swiper"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid

    // 请求数据
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        console.log(res)
        this.topImages = res.result.itemInfo.topImages
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
