<template>
  <div class="pagination">
    <button :disabled="pageNo===1" @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startNumberAndEndNumber.end>continues" @click="$emit('getPageNo',1)" :class="{active:pageNo===1}">1</button>
    <button v-if="startNumberAndEndNumber.end>(continues+1)">···</button>

    <button v-for="(page,index) in startNumberAndEndNumber.end" :key="index" v-show="page>=startNumberAndEndNumber.start" @click="$emit('getPageNo',page)" :class="{active:pageNo===page}">{{page}}</button>

    <button v-if="startNumberAndEndNumber.start<(totalPage-continues)">···</button>
    <button v-if="startNumberAndEndNumber.start<=(totalPage-continues)" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo===totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo===totalPage" @click="$emit('getPageNo',pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props:['pageNo','pageSize','total','continues'],
  computed:{
    // 计算出总共多少页
    totalPage(){
      // Math.ceil 向上取整 比如：（91/3）结果为31
      return Math.ceil(this.total/this.pageSize)
    },
    // 计算出连续页码的起始页数与结束页数
    startNumberAndEndNumber(){
      const {continues,totalPage,pageNo} = this
      // 先定义两个变量存储初始数字结束数字
      let start = 0
      let end = 0
      // 连续页码数字5【就是总页数至少有5页】，如果出现不正常情况【就是总页数不到5页】
      // 不正常现象【总页数不到5页】
      if(continues>totalPage){
        start = 1
        end = totalPage
      }else{
        // 算出来的start小于1时
        if(pageNo <= Math.floor(continues/2)){
          start = 1
          end = continues
          // 算出来的end大于totalPage时
        }else if(pageNo > totalPage-Math.floor(continues/2)){
          start = totalPage - continues + 1
          end = totalPage
        }else{
          start = pageNo - Math.floor(continues/2)
          end = pageNo + Math.floor(continues/2)
        }
      }
      return {start,end}
    }
  }
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
