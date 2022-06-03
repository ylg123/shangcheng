// 登录与注册模块的仓库
// 引入获取验证码的请求函数
import {reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqQuitLogin} from '@/api'
// 引入存储于获取token的函数
import {setToken,getToken,removeToken} from '@/utils/token'

const state = {
  code:'',
  token:getToken(),
  // token:localStorage.getItem('TOKEN'),
  userInfo:{}
}
const mutations = {
  GETCODE(state,code){
    state.code = code
  },
  USERLOGIN(state,token){
    state.token = token
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
  CLEARUSERINFO(state){
    state.token = ''
    state.userInfo = {}
    removeToken()
    // localStorage.removeItem('TOKEN')
  }
}
const actions = {
  // 获取验证码的action
  async getCode({commit},phone){
    // 此处获取验证码的接口，直接把验证码返回了  但正常情况为后台把验证码发送到用户手机上（省短信钱）
    let res = await reqGetCode(phone)
    if(res.code === 200){
      commit('GETCODE',res.data)
      return 'ok'
    }else{
      Promise.reject(new Error('fail'))
    }
  },
  // 用户注册的action
  async userRegister({commit},data){
    let res = await reqUserRegister(data)
    if(res.code===200){
      return 'ok'
    }else{
      return Promise.reject(new Error(res.message))
    }
  },
  // 用户登录的action 【token】
  async userLogin({commit},data){
    // 向服务器发送登录请求
    let res = await reqUserLogin(data)
    // 服务器下发的token为用户的唯一标识（uuid）
    // 将来经常通过带token找服务器要用户信息进行展示
    if(res.code === 200){
      // 用户已经登录成功获取到token
      commit('USERLOGIN',res.data.token)
      // 将token存入本地存储
      setToken(res.data.token)
      // localStorage.setItem('TOKEN',res.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error(res.message))
    }
  },
  // 获取用户信息的action
  async getUserInfo({commit}){
    let res = await reqUserInfo()
    if(res.code===200){
      commit('GETUSERINFO',res.data)
      return 'ok'
    }else{
      return Promise.reject(new Error(res.message))
    }
  },
  // 退出登录的action
  async quitLogin({commit}){
    let res = await reqQuitLogin()
    if(res.code===200){
      // 提交mutations让清除用户信息
      commit('CLEARUSERINFO')
      return 'ok'
    }else{
      return Promise.reject(new Error(res.message))
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