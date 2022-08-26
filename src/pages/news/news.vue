<template>
  <view>
    <!--小贴士-->
    <view>
      <view>小贴士：</view>
      <view>-可以尝试从对方主页中看看有没有你喜欢的书，以便更好的达成交换目的~</view>
      <view>-换书成功后即使下架书籍，沟通更高效~</view>
    </view>

    <!--消息列表-->
    <view>什么消息也没有~</view>
    <navigator
      :url="'/pages/communicate/communicate'
        + '?openid=' + ''
        + '&bookId=' + ''"
    >测试-跳转聊天</navigator>
  </view>
</template>

<script>
export default {
  name: "News"
}
</script>

<style scoped>

</style>
