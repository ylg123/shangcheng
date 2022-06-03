<template>
  <div class="event2">
    <h1>Event2组件</h1>
    <!-- 原生button的原生click事件 -->
    <button @click="$emit('click','自定义事件的click')">分发自定义click事件</button><br/>
    <button @click="$emit('xxx','自定义事件的xxx')">分发自定义xxx事件</button>
  </div>
</template>

<script>
export default {
  name:'Event2'
}
</script>

<style scoped>
  .event2{
    background-color: gray;
  }
</style>