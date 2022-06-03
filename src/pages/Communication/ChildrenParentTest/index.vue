<template>
  <div>
    <h3>BABA有存款：{{money}}</h3><br/>
    <button @click="borrowFromSon(100)">找小明借钱100</button><br/>
    <button @click="borrowFromDaughter(150)">找小红借钱150</button><br/>
    <button @click="borrowFromAll(200)">找所有小孩借钱200</button><br/><br/>
    <br>
    <Son ref="xm"></Son>
    <br>
    <Daughter ref="xh"></Daughter>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'
export default {
  name:'ChildrenParentTest',
  components:{
    Son,
    Daughter
  },
  data() {
    return {
      money:1000
    }
  },
  methods:{
    // 向儿子借钱的回调
    borrowFromSon(num){
      // 父组件的金额累加
      this.money += num
      // ref可以获取到真实DOM节点，当然也可以获取子组件标签（操作子组件的数据和方法） 
      // 儿子组件的金额减少
      this.$refs.xm.money -= num
    },
    // 向女儿借钱的回调
    borrowFromDaughter(num){
      // 父组件的金额累加
      this.money += num
      // ref可以获取到真实DOM节点，当然也可以获取子组件标签（操作子组件的数据和方法） 
      // 女儿组件的金额减少
      this.$refs.xh.money -= num
    },
    // 向所有孩子借钱的回调
    borrowFromAll(num){
      // 父组件的金额累加
      this.money += num*2
      // 组件实例自身拥有一个属性$children，可以获取到当前组件当中，全部子组件，返回的是数组
      this.$children.forEach(item =>{
        item.money -= num
      })
    }
  }
}
</script>
