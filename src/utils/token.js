// 存储token和获取token以及清除本地存储中token的函数
export const setToken = (token)=>{
  localStorage.setItem('TOKEN',token)
}
export const getToken = ()=>{
  return localStorage.getItem('TOKEN')
}
export const removeToken = ()=>{
  localStorage.removeItem('TOKEN')
}