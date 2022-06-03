<template>
  <div class="custom">
    <h2>input包装组件</h2>
    <!-- 此处:value为动态绑定input框的value属性，input事件为原生DOM事件 -->
    <input type="text" :value="value" @input="$emit('input',$event.target.value)">
  </div>
</template>

<script>
export default {
  name:'CustomInput',
  props:['value']
}
</script>

<style scoped>
  .custom{
    background-color: #ccc;
    height: 50px;
  }
</style>