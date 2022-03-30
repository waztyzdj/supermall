<template>
    <tab-bar>
      <tab-bar-item v-for="item in tabBarItemList" :path="item.path" :activeColor="item.activeColor" :key="item.path">
        <img slot="item-icon" :src="item.icon" alt="" />
        <img slot="item-icon-active" :src="item.iconActive" alt="" />
        <div slot="item-text">{{item.text}}</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "components/common/tabBar/TabBar.vue";
import TabBarItem from "components/common/tabBar/TabBarItem.vue";
export default {
  name: "MainTabBar",
  data() {
    return {
      tabBarItemList: [
        {
          text: '首页',
          path: '/home',
          icon: '/img/tabbar/home.svg',
          iconActive: '/img/tabbar/home_active.svg',
          activeColor: 'deeppink'
        },
        {
          text: '分类',
          path: '/category',
          icon: '/img/tabbar/category.svg',
          iconActive: '/img/tabbar/category_active.svg',
          activeColor: 'deeppink'
        },
        {
          text: '购物车',
          path: '/cart',
          icon: '/img/tabbar/cart.svg',
          iconActive: '/img/tabbar/cart_active.svg',
          activeColor: 'deeppink'
        },
        {
          text: '我的',
          path: '/profile',
          icon: '/img/tabbar/profile.svg',
          iconActive: '/img/tabbar/profile_active.svg',
          activeColor: 'deeppink'
        }
      ]
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>