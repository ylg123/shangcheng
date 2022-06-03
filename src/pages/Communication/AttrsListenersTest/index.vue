<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <!-- 当用户在使用我们封装的按钮的时候，需要向HintButton组件传递相应的参数（el-button进行二次封装） -->
    <!-- 下面的click为自定义事件 -->
    <HintButton type="success" icon="el-icon-delete" size="mini" title="提示按钮" @click="handler"></HintButton>
  </div>
</template>

<script>
import HintButton from './HintButton'
export default {
  name:'AttrsListenersTest',
  components:{
    HintButton
  },
  methods:{
    handler(){
      alert(666)
    }
  }
}
</script>

<style>

</style>