import {reqAddressInfo,reqOrderInfo} from '@/api'

const state = {
  userAddress:[],
  orderInfo:{}
}
const mutations = {
  GETUSERADDRESS(state,userAddress){
    state.userAddress = userAddress
  },
  GETORDERINFO(state,orderInfo){
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址的action
  async getUserAddress({commit}){
    let res = await reqAddressInfo()
    if(res.code===200){
      commit('GETUSERADDRESS',res.data)
    }
  },
  // 获取商品清单的action
  async getOrderInfo({commit}){
    let res = await reqOrderInfo()
    if(res.code===200){
      commit('GETORDERINFO',res.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}