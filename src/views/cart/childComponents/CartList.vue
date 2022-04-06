<template>
  <scroll :options="scrollOptions" ref="scroll">
    <div>
      <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"></cart-list-item>
    </div>
  </scroll>
</template>

<script>
import CartListItem from './CartListItem'

import Scroll from "components/common/scroll/Scroll";

import { mapGetters } from 'vuex'

export default {
  name: "CartList",
  data() {
    return {
      scrollOptions: {
        click: true
      }
    }
  },
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>

</style>
