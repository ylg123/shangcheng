// 引入二次封装的axios用来发送请求获取商品详情detail数据
import {reqGoodsInfo} from '@/api'

// 引入二次封装的axios用来发送请求获取购物车shopcart数据
import {reqAddOrUpdateShopCart} from '@/api'

// 引入存储游客身份的函数,uuid生成一个随机字符串（注意一旦生成不能改变）
import {getUuid} from '@/utils/uuid_token'

// 此文件为detail组件的数据小仓库
// state：仓库存储数据的地方
const state = {
  // 商品信息
  goodsInfo:{},
  // 游客的临时身份
  uuid_token:getUuid()
}
// mutations：修改state的唯一手段
const mutations = {
  GETGOODSINFO(state,goodsInfo){
    state.goodsInfo = goodsInfo
  },
}
// actions：处理actions，可以书写自己的业务逻辑，也可以处理异步
const actions = {
  // 这里可以书写业务逻辑，不能修改state
  // 获取产品信息的action
  async getGoodsInfo({commit},skuid){
    let res = await reqGoodsInfo(skuid)
    if(res.code===200){
      commit('GETGOODSINFO',res.data)
    }
  },
  // 获取购物车数据的action
  async getUpdateShopCart(_,{skuid,skuNum}){
    // 加入购物车带过来对象的解构
    // 加入购物车以后（发请求），前台将参数带给服务器
    // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
    // 因为服务器没有返回其他数据，所以不需要提交commit进mutations并修改state
    let res = await reqAddOrUpdateShopCart(skuid,skuNum)
    if(res.code===200){
      // 代表加入购物车数据成功
      return 'ok'
    }else{
      // 代表加入购物车数据失败
      return Promise.reject(new Error('fail'))
    }
  }
}
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更方便
const getters = {
  // 计算出服务器返回goosInfo数据中的categoryView，skuInfo属性值
  categoryView(state){
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state){
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsInfo.spuSaleAttrList || []
  }
}

// 对外暴露一个store类的实例
export default {
  state,
  mutations,
  actions,
  getters
}