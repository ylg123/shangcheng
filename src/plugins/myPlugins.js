// Vue插件一定对外暴露一个对象
let myplugins = {}

myplugins.install = function(Vue,options){
  // Vue.prototype.$bus 任何组件都能使用的全局事件总线
  // Vue.directive
  // Vue.component
  // Vue.filter
  // 全局指令
  Vue.directive(options.name,(element,params)=>{
    element.innerHTML = params.value
  })
}

export default myplugins