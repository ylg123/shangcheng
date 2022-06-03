import {reqSearchInfo} from '@/api'

// state：仓库存储数据的地方
const state = {
  searchList:{}
}
// mutations：修改state的唯一手段
const mutations = {
  GETSEARCHLIST(state,searchList){
    state.searchList = searchList
  }
}
// actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，不能修改state
  async getSearchList({commit},params={}){
    let res = await reqSearchInfo(params)
    if(res.code===200){
      commit('GETSEARCHLIST',res.data)
    }
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {
  goodsList(state){
    return state.searchList.goodsList || []
  },
  attrsList(state){
    return state.searchList.attrsList || []
  },
  trademarkList(state){
    return state.searchList.trademarkList || []
  }
}

// 对外暴露一个store类的实例
export default {
  state,
  mutations,
  actions,
  getters
}