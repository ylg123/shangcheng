<template>
  <div class="doughter">
    <h3>女儿小红有存款：{{money}}</h3><br/>
    <button @click="giveMoney(100)">给BABA钱：100</button>
  </div>
</template>

<script>
// 引入混入文件
import myMixin from '@/pages/Communication/ChildrenParentTest/myMixin/myMixin'
export default {
  name:'Daughter',
  mixins:[myMixin],
  data() {
    return {
      money:20000
    }
  },
  /* methods:{
    giveMoney(num){
      this.money -= num
      this.$parent.money += num
    }
  } */
}
</script>

<style scoped>
  .doughter{
    background-color: grey;
    height: 50px;
  }
</style>