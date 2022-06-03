// 入口文件
// 引入Vue
import Vue from 'vue'
// 引入App组件
import App from './App.vue'

// 引入全局组件TypeNav三级导航
import TypeNav from '@/components/TypeNav'
// 使用全局组件TypeNav三级导航
Vue.component(TypeNav.name,TypeNav)
// 引入全局组件Carousel轮播图
import Carousel from '@/components/Carousel'
// 使用全局组件Carousel轮播图
Vue.component(Carousel.name,Carousel)
// 引入全局组件Pagination分页器
import Pagination from '@/components/Pagination'
// 使用全局组件Pagination分页器
Vue.component(Pagination.name,Pagination)
// 引入elementui中的button按钮和弹框盒子组件（按需引入）
import {Button,MessageBox} from 'element-ui'
// 使用全局组件elementui组件button按钮（按需引入）
Vue.component(Button.name,Button)
// elementUi注册时还有一种写法：挂在Vue原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

// 引入路由
import router from '@/router'

// 引入仓库
import store from '@/store'

// 引入MockServe.js----mock模拟数据
import '@/mock/mockServe'

// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入所有的api接口函数
import * as API from '@/api'

// 引入图片
import atm from '@/assets/11.gif'
// 引入插件
import Vuelazyload from 'vue-lazyload'
// 注册插件
Vue.use(Vuelazyload,{
    // 懒加载默认的图片
    loading:atm
})

// 关闭Vue生产提示
Vue.config.productionTip = false


// 引入自定义插件myplugins
// import MyPlugins from '@/plugins/myPlugins'
// 注册自定义插件myplugins
/* Vue.use(MyPlugins,{
    name:'apper'
}) */

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
    el: '#app',
    render: h => h(App),
    // 配置全局事件总线
    beforeCreate(){
        // 添加全局事件总线$bus
        Vue.prototype.$bus = this
        // 添加全局接口调用模块$API
        Vue.prototype.$API = API
    },
    // 注册路由
    router,
    // 注册仓库：组件实例身上会多出一个属性$store
    store
})
