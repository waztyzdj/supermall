<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles" @click="itemClick(index)">
      <span :class="{active : index === currIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    height: 40px;
    line-height: 40px;
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 3px 5px;
  }

  .active {
    color: var(--color-tint);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
