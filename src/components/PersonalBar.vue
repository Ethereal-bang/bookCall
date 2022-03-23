<template>
  <view>
    <AtAvatar class="uimg" circle text="U" />
    <text class="uname">用户名</text>
    <text class="uindex">Ta的主页</text>
     <image class="right" src="./right.png" />
  </view>
</template>

<script>
import { AtAvatar } from 'taro-ui-vue';
import './PersonalBar.scss'
export default {
  name: "PersonalBar", // 书籍详情中的个人信息条
  components: {
    AtAvatar, // 头像
  }
}
</script>

<style scoped>

</style>
