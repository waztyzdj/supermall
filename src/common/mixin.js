import BackTop from "components/common/backTop/BackTop";

import { BACKTOP_DISTANCE } from './const'

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    lintenIsShowBackTop(pos) {
      this.isShowBackTop = this.$refs.scroll.getScrollY() <= -BACKTOP_DISTANCE
    }
  }
}
