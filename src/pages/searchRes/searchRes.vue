<template>
  <view>Ok</view>
</template>

<script>
import {searchBook} from "../../api/indexApi";

export default {
  name: "searchRes",
  onLoad: (options) => {
    // 获取页面参数——搜索词
    searchBook("xx", options.keyword)
      .then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
  },

}
</script>

<style scoped>

</style>
