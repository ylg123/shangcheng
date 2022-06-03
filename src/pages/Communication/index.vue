<template>
  <div>
    <h1>组件间通信高级（**非常重要，面试必备**）</h1><br/>
    <router-link to="/communication/eventtest">event深入</router-link>&nbsp;&nbsp;
    <router-link to="/communication/modeltest">v-model深入</router-link>&nbsp;&nbsp;
    <router-link to="/communication/synctest">属性修饰符sync</router-link>&nbsp;&nbsp;
    <router-link to="/communication/attrslistenerstest">$attrs与$lesteners</router-link>&nbsp;&nbsp;
    <router-link to="/communication/childrenparenttest">$children与$parent</router-link>&nbsp;&nbsp;
    <router-link to="/communication/scopeslottest">作用域插槽scope-slot</router-link><br/><br/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name:'Communication'
}
</script>

<style>

</style>