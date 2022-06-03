// 引入mockjs模块
import Mock from 'mockjs'
// 把JSON数据格式引入进来(JSON数据格式根本没有对外暴露，但是可以引入)
// webpack默认对外暴露的：图片、JSON数据格式
import banners from './banners.json'
import floors from './floors.json'

// mock数据:第一个参数是请求地址  第二个参数是请求数据
Mock.mock('/mock/banners',{code:200,data:banners}) //模拟轮播图banners的数据
Mock.mock('/mock/floors',{code:200,data:floors}) //模拟底部floors的数据