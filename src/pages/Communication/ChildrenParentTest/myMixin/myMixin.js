export default {
  // 对外暴露的对象，可以放置组件重复js业务逻辑
  methods:{
    // 儿子小明给爸爸钱的回调
    giveMoney(num){
      // 小明的钱减少50
      this.money -= num
      // 可以通过$parent属性获取到此组件的父组件，可以操作父组件的数据和方法
      this.$parent.money += num
    }
  }
}