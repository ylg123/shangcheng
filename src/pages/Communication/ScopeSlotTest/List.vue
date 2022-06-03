<template>
  <ul>
    <li v-for="(item,index) in todos" :key="index">
      <!-- 作用域插槽回传数据 -->
      <slot :todo1="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name:'List',
  props:['todos'],
}
</script>

<style>

</style>