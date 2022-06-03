// 引入二次封装的axios用来发送请求获取三级导航TypeNav数据
// 引入二次封装的axios用来发送请求获取轮播图banners数据
// 引入二次封装的axios用来发送请求获取底部floors数据
import {reqCategoryList,reqBannersList,reqFloorsList} from '@/api'

// 此文件为home组件的数据小仓库
// state：仓库存储数据的地方
const state = {
  categoryList:[],
  bannersList:[],
  floorsList:[]
}
// mutations：修改state的唯一手段
const mutations = {
  CATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  GETBANNERSLIST(state,bannersList){
    // console.log('修改仓库中的banners数据')
    state.bannersList = bannersList
  },
  GETFLOORSLIST(state,floorsList){
    state.floorsList = floorsList
  }
}
// actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，不能修改state
  // 通过api里的函数调用发送请求，获取三级导航TypeNav数据
  async categoryList({commit}){
    let res = await reqCategoryList()
    if(res.code===200){
      commit('CATEGORYLIST',res.data)
    }
  },
  // 获取轮播图banners的数据
  async getBannersList({commit}){
    // console.log('在向服务器发请求获取轮播图的数据')
    let res = await reqBannersList()
    if(res.code === 200){
      commit('GETBANNERSLIST',res.data)
    }
  },
  // 获取底部floors的数据
  async getFloorsList({commit}){
    let res = await reqFloorsList()
    if(res.code === 200){
      commit('GETFLOORSLIST',res.data)
    }
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {}

// 对外暴露一个store类的实例
export default {
  state,
  mutations,
  actions,
  getters
}