// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nprogress from 'nprogress'
// nprogress的done方法代表进度条结束，start方法代表进度条开始
// 引入进度条样式
import 'nprogress/nprogress.css'
// 引入Store组件的大仓库store
import store from '@/store'


// 利用axios对象的方法create，去创建一个axios实例
// request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径中会出现api
  baseURL:'/api',
  // 超时时间
  timeout:5000,
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
  if(store.state.detail.uuid_token){
    // 给请求头添加一个字段，字段需要和后台商量好
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 需要携带token给服务器
  if(store.state.user.token){
    config.headers.token = store.state.user.token
  }
  // 进度条开始
  nprogress.start()
  // 配置对象，对象中有一个属性很重要，header请求头
  return config
})

// 响应拦截器：在服务器返回数据后，响应拦截器可以检测到，可以在数据展示之前做一些事情
requests.interceptors.response.use((res)=>{
  // 进度条结束
  nprogress.done()
  // 成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以在数据展示之前做一些事情
  return res.data
},(error)=>{
  // 失败的回调函数
  return Promise.reject(new Error('fail'))
})

// 对外暴露
export default requests