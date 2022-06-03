import Vue from "vue";
import Vuex from 'vuex';

// 使用Vuex插件
Vue.use(Vuex)

// 引入组件对应的小仓库
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
import trade from './trade'

// 对外暴露一个store类的实例
export default new Vuex.Store({
  modules:{
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})