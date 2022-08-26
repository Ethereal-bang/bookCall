<template>
  <!--跳转到个人主页-->
  <navigator
    :url="'/pages/personalHomepage/personalHomepage?userid=' + this.userId"
  >
    <AtAvatar class="uimg" circle :image="avatar" />
    <text class="uname">{{ $props.userName }}</text>
    <text class="uindex">{{(isOwn ? '我' : 'Ta') + "的主页"}}</text>
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
    userId: String,
    avatar: String,
    isOwn: Boolean,
  }
}
</script>

<style scoped>

</style>
