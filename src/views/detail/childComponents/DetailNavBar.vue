<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="goback">
        <img src="~assets/img/common/back.svg">
      </div>
      <tab-control ref="tabControl" slot="center" :titles="this.titles" class="title" @tabClick="tabClick"></tab-control>
    </nav-bar>
  </div>
</template>

<script>

import NavBar from "components/common/navBar/NavBar";
import TabControl from "components/common/tabControl/TabControl";

export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐']
    }
  },
  components: {
    NavBar,
    TabControl
  },
  methods: {
    goback() {
      this.$router.back()
    },
    tabClick(index) {
      this.$parent.scrollTo(index)
    },
    setTabIndex(index) {
      this.$refs.tabControl.setTabIndex(index)
    }
  }
}
</script>

<style scoped>
  .back img {
    margin-top: 12px;
  }

  .title {
    font-size: 14px;
    margin-left: 30px;
    margin-right: 30px;
  }
</style>
