<template>
  <div class="detail">
    <detail-nav-bar/>
  </div>
</template>

<script>
import DetailNavBar from "views/detail/childComponents/DetailNavBar";

import { getDetail } from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null
    }
  },
  components: {
    DetailNavBar
  },
  activated() {
    this.iid = this.$route.params.iid

    // 请求数据
    this.getDetailData()
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
