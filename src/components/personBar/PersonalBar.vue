<template>
  <!--跳转到个人主页-->
  <navigator
    :url="'/pages/personalHomepage/personalHomepage?userid=' + this.userId"
  >
    <AtAvatar class="uimg" circle text="U" />
    <text class="uname">{{ $props.userName }}</text>
    <text class="uindex">Ta的主页</text>
    <image class="right" src="./right.png" />
  </navigator>
</template>

<script>
import { AtAvatar } from 'taro-ui-vue';
import './PersonalBar.scss'
export default {
  name: "PersonalBar", // 书籍详情中的个人信息条
  components: {
    AtAvatar, // 头像
  },
  props: {
    userName: String,
    userId: Number | String,
  }
}
</script>

<style scoped>

</style>
