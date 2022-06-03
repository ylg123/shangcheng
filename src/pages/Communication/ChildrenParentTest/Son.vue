<template>
  <div class="son">
    <h3>儿子小明有存款：{{money}}</h3><br/>
    <button @click="giveMoney(50)">给BABA钱：50</button>
  </div>
</template>

<script>
// 引入混入文件
import myMixin from '@/pages/Communication/ChildrenParentTest/myMixin/myMixin'
export default {
  name:'Son',
  mixins:[myMixin],
  data() {
    return {
      money:30000
    }
  },
  /* methods:{
    // 儿子小明给爸爸钱的回调
    giveMoney(num){
      // 小明的钱减少50
      this.money -= num
      // 可以通过$parent属性获取到此组件的父组件，可以操作父组件的数据和方法
      this.$parent.money += num
    }
  } */
}
</script>

<style scoped>
  .son{
    background-color: grey;
    height: 50px;
  }
</style>