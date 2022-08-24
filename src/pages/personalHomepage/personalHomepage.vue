<template>
  <view>
    <!--用户信息-->
    <view>
      <AtAvatar :image="this.userInfo.avatar" circle />
      <view>{{userInfo.name}}</view>
      <AtTextarea
        :value="this.userInfo.words"
        :on-change="(val) => this.userInfo.words = val"
        :count="false"
        :disabled="!this.userInfo.isOwn"
      />
    </view>

    <!--个人书籍-->
    <PersonPublish :book-list="bookList" :is-own="userInfo.isOwn" />

  </view>
</template>

<script>
import {AtAvatar, AtTabs, AtTabsPane, AtNoticebar, AtTextarea, AtButton} from "taro-ui-vue";
import {getUserBooks, getUserInfo} from "../../api/personApi";
import BookList from "../../components/bookList/bookList";
import PersonPublish from "../../components/personPublish/personPublish";
import Taro from "@tarojs/taro";
import {getOpenid} from "../../utils/storageGetter";

export default {
  name: "personalHomepage",
  components: {
    AtAvatar,
    AtTabs,
    AtTabsPane,
    BookList,
    AtNoticebar,
    AtTextarea,
    AtButton,
    PersonPublish,
  },
  data() {
    return {
      userInfo: {
        avatar: "http://photo.chaoxing.com/photo_80.jpg",
        name: "用户名",
        words: "点击添加换书宣言，让换书更有吸引力",
        isOwn: true,  // 是否本人
      },
      currentTab: 0,
      bookList: {
        out: [],  // 可换
        in: [], // 求换
        off: [],  // 已下架
      }
    }
  },
  onLoad(options) {
    // ta人主页传值,我的主页undefined 请求时使用默认本机openid
    let openid = options.userId;
    if (openid) {
      openid = openid === getOpenid() ? undefined : openid;
      Taro.setNavigationBarTitle({
        title: "Ta的主页",
      })
    }
    // 获取用户信息_this.userInfo
    getUserInfo(openid)
    // 获取用户书籍列表_this.bookList
    getUserBooks(openid).then(res => {
      const {get, sale, history} = res.data;
      this.bookList.in = get;
      this.bookList.out = sale;
      this.bookList.off = history;
    })
  }
}
</script>

<style scoped>

</style>
