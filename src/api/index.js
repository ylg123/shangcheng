// 当前这个模块：API进行统一管理
import requests from "./request";
// 引入mockAjax发送请求
import mockRequests from './mockAjax'

//三级联动的接口
// /api/product/getBaseCategoryList get 无参数

// 发请求:axios发请求返回的结果是Promise对象
// 向外暴露请求三级列表category接口的数据的ajax请求的函数
export const reqCategoryList = () => requests({url:'/product/getBaseCategoryList',method:'get'})

// 向外暴露请求轮播图banners模拟接口的数据的ajax请求的函数
export const reqBannersList = () => mockRequests({url:'/banners',method:'get'})

// 向外暴露请求底部floors模拟接口的数据的ajax请求的函数
export const reqFloorsList = () => mockRequests({url:'/floors',method:'get'})

// 向外暴露请求搜索组件search接口的数据的ajax请求的函数
export const reqSearchInfo = (params) => requests({url:'/list',method:'post',data:params})

// 向外暴露请求产品详情组件detail接口的数据的ajax请求的函数
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'})

// 向外暴露请求添加购物车成功组件接口的数据的ajax请求的函数
export const reqAddOrUpdateShopCart = (skuId,skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:'post'})

// 向外暴露请求产品购物车组件接口的数据的ajax请求的函数
export const reqShopCart = () => requests({url:'/cart/cartList',method:'get'})

// 向外暴露删除产品购物车数据接口的ajax请求的函数
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})

// 向外暴露修改商品的选中状态的ajax请求的函数
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'})

// 向外暴露获取验证码的ajax请求的函数
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'})

// 向外暴露注册的ajax请求的函数
export const reqUserRegister = (data) => requests({url:`/user/passport/register`,data,method:'post'})

// 向外暴露登录的ajax请求的函数
export const reqUserLogin = (data) => requests({url:`/user/passport/login`,data,method:'post'})

// 向外暴露请求用户信息的ajax请求的函数
export const reqUserInfo = () => requests({url:`/user/passport/auth/getUserInfo`,method:'get'})

// 向外暴露退出登录的ajax请求的函数
export const reqQuitLogin = () => requests({url:`/user/passport/logout`,method:'get'})

// 向外暴露获取用户地址信息的ajax请求的函数
export const reqAddressInfo = () => requests({url:`/user/userAddress/auth/findUserAddressList`,method:'get'})

// 向外暴露获取用户商品清单的ajax请求的函数
export const reqOrderInfo = () => requests({url:`/order/auth/trade`,method:'get'})

// 向外暴露提交订单的ajax请求的函数
export const reqCommitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})

// 向外暴露获取支付页信息的ajax请求的函数
export const reqPayInfo = (orderId) => requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})

// 向外暴露获取订单支付状态的ajax请求的函数
export const reqPayStatus = (orderId) => requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'})

// 向外暴露获取个人中心数据的ajax请求的函数
export const reqCenterInfo = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'})
