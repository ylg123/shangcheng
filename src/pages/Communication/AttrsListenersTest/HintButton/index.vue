<template>
  <div>
    <!-- 可以巧妙利用a标签实现按钮带有提示功能 -->
    <a :title="title">
      <!-- 下面这种写法v-bind不能用简写:代替，v-on不能用简写@代替 -->
      <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>

<script>
export default {
  name:'HintButton',
  props:['title'],
  mounted() {
    // $attrs属于组件的一个属性，可以获取父组件传递过来的props数据
    // 对于子组件而言，父组件传递的数据可以利用props接收，但是要注意，如果子组件通过props接收了的属性，$attrs中就拿不到了
    // console.log(this.$attrs)
    // $listeners属于组件的一个属性，可以获取父组件传递过来的自定义事件
    // console.log(this.$listeners)
  },
}
</script>

<style>

</style>