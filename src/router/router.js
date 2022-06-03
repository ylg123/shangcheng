// 引入一级路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// 引入二级路由组件
// import MyOrder from '@/pages/Center/MyOrder'
// import GroupOrder from '@/pages/Center/GroupOrder'

// 配置路由信息
export default [
  {
    path:'/detail/:skuid?',
    // 路由懒加载模式
    component:()=> import('@/pages/Detail'),
    meta:{show:true}
  },
  {
    path:'/home',
    component:()=> import('@/pages/Home'),
    meta:{show:true}
  },
  {
    path:'/login',
    component:()=> import('@/pages/Login'),
    meta:{show:false}
  },
  {
    path:'/search/:keyword?',
    component:()=> import('@/pages/Search'),
    meta:{show:true},
    name:'search',
    // 路由组件能不能传递props参数？
    // 布尔值写法：只能传递params参数
    // props:true
    // 对象写法：额外的给路由组件传递一些参数
    // props:{a:1,b:2}
    // 函数写法:可以把params参数和query参数传递给路由组件
    // props: $route => ({keyWord:$route.params.keyWord,k:$route.query.k})
  },
  {
    path:'/register',
    component:()=> import('@/pages/Register'),
    meta:{show:false}
  },
  {
    path:'/addcartsuccess',
    name:'addcartsuccess',
    component:()=> import('@/pages/AddCartSuccess'),
    meta:{show:false}
  },
  {
    path:'/shopcart',
    component:()=> import('@/pages/ShopCart'),
    meta:{show:false}
  },
  {
    path:'/trade',
    component:()=> import('@/pages/Trade'),
    meta:{show:false},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 如果是从购物车页跳转，放行
      if(from.path==='/shopcart'){
        next()
      }else{
        // 不是从购物车页跳转，停在原页不跳转
        next(false)
      }
    }
  },
  {
    path:'/pay',
    component:()=> import('@/pages/Pay'),
    meta:{show:false},
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      if(from.path==='/trade'){
        next()
      }else{
        next(false)
      }
    }
  },
  {
    path:'/paysuccess',
    component:()=> import('@/pages/PaySuccess'),
    meta:{show:false},
  },
  {
    path:'/center',
    component:()=> import('@/pages/Center'),
    meta:{show:false},
    // 二级路由组件
    children:[
      {
        path:'myorder',
        component:()=> import('@/pages/Center/MyOrder'),
      },
      {
        path:'grouporder',
        component:()=> import('@/pages/Center/GroupOrder')
      },
      // 注意要重定向，在进入center组件时先默认跳到myorder页面
      {
        path:'/center',
        redirect:'/center/myorder'
      }
    ]
  },
  {
    path:'/communication',
    component:()=> import('@/pages/Communication'),
    meta:{show:false},
    // 二级路由组件
    children:[
      {
        path:'attrslistenerstest',
        component:()=> import('@/pages/Communication/AttrsListenersTest'),
      },
      {
        path:'childrenparenttest',
        component:()=> import('@/pages/Communication/ChildrenParentTest'),
      },
      {
        path:'eventtest',
        component:()=> import('@/pages/Communication/EventTest'),
      },
      {
        path:'modeltest',
        component:()=> import('@/pages/Communication/ModelTest'),
      },
      {
        path:'scopeslottest',
        component:()=> import('@/pages/Communication/ScopeSlotTest'),
      },
      {
        path:'synctest',
        component:()=> import('@/pages/Communication/SyncTest'),
      },
      
    ]
  },
  // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
  {
    path:'/',
    redirect:'/home'
  }
]