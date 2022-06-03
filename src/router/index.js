// 配置路由的文件

// 引入Vue
import Vue from 'vue'
// 引入VueRouter
import VueRouter from 'vue-router'
// 引入store
import store from '@/store'

// 使用插件
Vue.use(VueRouter)

// 引入路由配置数组
import routes from './router'

// 先把原来的push和replace方法保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push和replace方法
VueRouter.prototype.push = function(location,resolve,reject){
  if(resolve && reject){
    originPush.call(this,location,resolve,reject)
  }else{
    originPush.call(this,location,()=>{},()=>{})
  }
} 
VueRouter.prototype.replace = function(location,resolve,reject){
  if(resolve && reject){
    originReplace.call(this,location,resolve,reject)
  }else{
    originReplace.call(this,location,()=>{},()=>{})
  }
} 


// 配置路由
const router = new VueRouter({
  // 配置对象，key不能乱写
  routes,
  // 路由切换的滚动行为
  scrollBehavior (to, from, savedPosition) {
    return {y:0}
  }
})

// 全局守卫
router.beforeEach(async (to,from,next)=>{
  // to为要跳转到的路由信息
  // from为开始跳转的路由信息
  // next放行的函数：next()放行，next(path)放行到指定路由，next(false)不放行并重回from路由
  // 用户登录了，才会有token
  // next()
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  if(token){
    // 如果用户登录了，还想回登录或注册页面，不放行
    if(to.path==='/login' || to.path === '/register'){
      next('/home')
    }else{
      // 如果用户登录了想回非登录或注册页面，当用户名存在时放行。
      if(name){
        next()
      }else{
        // 用户名不存在时派发action获取信息
        try {
          // 获取用户信息成功再放行
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效，获取用户信息失败，要清除信息再重新登录
          // 派发清除信息的cation
          await store.dispatch('quitLogin')
          // 跳转到login页面
          next('/login')
        }
      }
    }
  }else{
    // 用户未登录，不能去交易相关、支付相关、个人中心的页面
    let toPath = to.path
    if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
      // 用户想去不能去的组件，可以把那组件的路由信息用query参数带给login组件，这样当登录后可以直接跳转到用户之前想去的页面
      next('/login?redirect='+toPath)
    }else{
      next()
    }
  }
})

export default router