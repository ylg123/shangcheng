<template>
  <ul>
    <li v-for="(item,index) in todos" :key="index">
      <!-- 作用域插槽回传数据 -->
      <slot :todo="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  name:'List1',
  props:['todos'],
}
</script>

<style>

</style>