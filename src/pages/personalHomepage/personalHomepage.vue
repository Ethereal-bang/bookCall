<template>
  <view>
    <AtAvatar :image="this.userInfo.avatar" circle />
    <view></view>
  </view>
</template>

<script>
import {AtAvatar} from "taro-ui-vue";
import {getUserBooks, getUserInfo} from "../../api/personApi";

export default {
  name: "personalHomepage",
  components: {
    AtAvatar,
  },
  data() {
    return {
      userInfo: {
        avatar: "http://photo.chaoxing.com/photo_80.jpg",
        name: "用户名",
        words: "点击添加换书宣言，让换书更有吸引力",
        isOwn: true,  // 是否本人
      },
      bookList: {
        out: [],  // 可换
        in: [], // 求换
        off: [],  // 已下架
      }
    }
  },
  onLoad(options) {
    const userId = options.userId;
    // 获取用户信息_this.userInfo
    getUserInfo(userId)
    // 获取用户书籍列表_this.bookList
    getUserBooks(userId).then(res => {
      this.bookList.in = res.data;
      this.bookList.out = res.data;
      this.bookList.off = res.data;
    })
  }
}
</script>

<style scoped>

</style>
