<template>
  <div>
    <!-- <h1 v-apper="mes"></h1> -->
    <Header />
    <!-- 路由出口，即路由组件展示的地方 -->
    <router-view></router-view>
    <!-- 在Home和Search组件显示时Footer组件隐藏 -->
    <Footer v-show="$route.meta.show" />
  </div>
</template>

<script>
// 引入Header组件
import Header from './components/Header'
// 引入Footer组件
import Footer from './components/Footer'

export default {
  name: "App",
  /* data() {
    return {
      mes:'你好！！！!!!'
    }
  }, */
  components:{
    Header,
    Footer
  },
  mounted(){
    // 通知Vuex发请求，获取三级列表数据，存储于home仓库中
    this.$store.dispatch("categoryList");
  }
};
</script>
