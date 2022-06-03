<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg">
    <span>xxx</span>
    <br>
    <hr />
    <h2>v-model实现原理（vue2）</h2>
    <!-- 原生DOM中有oninput事件，它经常结合表单元素一起使用，当表单元素文本内容发生改变时就会发生一次回调
      vue2可以通过value与input事件实现v-model双向绑定
     -->
    <input type="text" :value="msg" @input="msg = $event.target.value">
    <span>{{msg}}</span>
    <!-- 深入学习v-model：实现父子组件数据同步 -->
    <hr/>
    <!-- 此处的:value是组件通信的props传参，input事件为自定义事件 -->
    <!-- <CustomInput :value="msg" @input="change"></CustomInput> -->
    <CustomInput v-model="msg"></CustomInput>
  </div>
</template>

<script>
import CustomInput from './CustomInput'
export default {
  name:'ModelTest',
  data() {
    return {
      msg:'我爱你塞北的大雪'
    }
  },
  components:{
    CustomInput
  },
  /* methods: {
    change(event){
      console.log(event)
      this.msg = event.value
    }
  }, */
}
</script>

<style>

</style>