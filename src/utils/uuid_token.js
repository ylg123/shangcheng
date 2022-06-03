// 引入uuid
import {v4 as uuidv4} from 'uuid'

// 生成一个随机字符串，且生成之后每次执行不能发生变化，游客身份持久存储（使用localStorage）
export const getUuid = ()=>{
  // 先从本地存储中获取uuid（查看本地存储是否存储uuid）
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  // 如果本地存储中没有uuid，则使用uuid库生成
  if(!uuid_token){
    // 使用uuid生成并赋值
    uuid_token = uuidv4()
    // 并将此uuid_token存入本地存储
    localStorage.setItem('UUIDTOKEN',uuid_token)
  }
  return uuid_token
}