const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 去除打包后的map文件
  productionSourceMap: false,
  transpileDependencies: true,
  // 关闭eslint语法检查
  lintOnSave: false,
  devServer:{
    host: 'localhost',
    // 代理跨域
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  },
})
