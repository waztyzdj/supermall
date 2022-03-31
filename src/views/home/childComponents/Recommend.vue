<template>
  <div class="recommend">
    <div class="recommend-item" v-for="item in recommend">
      <a :href="item.link">
        <img :src="item.image" :alt="item.title">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend",
  props: {
    recommend : {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  .recommend {
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 10px 0px 10px 0px;
    border-bottom: 8px solid #eee;
  }

  .recommend-item {
    flex: 1;
    width: 100%;
  }

  .recommend-item img {
    width: 70px;
    height: 70px;
    margin-bottom: 5px;
  }
</style>
