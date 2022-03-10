<template>
  <view>
    <AtAvatar circle text="U" />
    <text>用户名</text>
    <text>Ta的主页</text>
  </view>
</template>

<script>
import { AtAvatar } from 'taro-ui-vue';

export default {
  name: "PersonalBar", // 书籍详情中的个人信息条
  components: {
    AtAvatar, // 头像
  }
}
</script>

<style scoped>

</style>
