<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    }
  },
  props: {
    options : {
      type: Object,
      default() {
        return {}
      }
    }
  },
  components: {
    BScroll
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, this.options)

    // 滑动时触发
    this.scroll.on('scroll', pos => {
      this.$emit('scroll', pos)
    })

    // 下滑到底部加载新数据
    this.scroll.on('pullingUp', () => {
      this.$emit('pullingUp')
    })

    // 上拉到顶部时刷新
    this.scroll.on('pullingDown', () => {
      this.$emit('pullingDown')
    })
  },
  methods: {
    scrollTo(x ,y, time = 800) {
      this.scroll.scrollTo(x, y, time)
    },
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    refresh() {
      this.scroll.refresh()
    }
  }
}
</script>

<style scoped>

</style>
