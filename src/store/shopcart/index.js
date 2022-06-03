import {reqShopCart,reqDeleteCartById,reqUpdateCheckedById} from '@/api'

// state：仓库存储数据的地方
const state = {
  shopCartList:[]
}
// mutations：修改state的唯一手段
const mutations = {
  GETSHOPCART(state,shopCartList){
    state.shopCartList = shopCartList
  }
}
// actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，不能修改state
  // 获取购物车列表数据的ation
  async getShopCart({commit}){
    let res = await reqShopCart()
    if(res.code===200){
      commit('GETSHOPCART',res.data)
    }
  },
  // 删除购物车某一个产品的action
  async deleteCartById(_,skuId){
    let res = await reqDeleteCartById(skuId)
    if(res.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 修改购物车某一个产品的选中状态的action
  async updateCheckedById(_,{skuId,isChecked}){
    let res = await reqUpdateCheckedById(skuId,isChecked)
    if(res.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部勾选商品的action
  deleteAllCheckedById({dispatch,getters}){
    // context:小仓库，其中有commit函数，dispatch函数 getters属性等等
    getters.cartList.cartInfoList.forEach(cartInfo => {
      let promiseAll = []
      if(cartInfo.isChecked===1) {
        let res = dispatch('deleteCartById',cartInfo.skuId)
        // 将每次返回的Promise对象添加到数组PromiseAll中
        promiseAll.push(res)
      }
      // 只要有一次删除失败，则删除失败
      return Promise.all(promiseAll)
    });
  },
  // 修改全部勾选状态的action
  updateCartAllChecked({dispatch,state},isChecked){
    let promiseAll = []
    state.shopCartList[0].cartInfoList.forEach( item => {
      let res = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
      promiseAll.push(res)
    })
    return Promise.all(promiseAll)
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {
  cartList(state){
    return state.shopCartList[0] || {}
  }
}

// 对外暴露一个store类的实例
export default {
  state,
  mutations,
  actions,
  getters
}