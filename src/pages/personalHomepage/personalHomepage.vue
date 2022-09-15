<template>
  <view class="personal_homepage">
    <!--背景-->
    <image
      src="https://bookchang.com:8443/images/personBG.png" />

    <view class="container">
      <!--用户信息-->
      <view class="info">
        <AtAvatar :image="this.userInfo.avatar" circle />
        <AtInput
          type="nickname" placeholder="请输入昵称"
          :value="userInfo.name" :on-blur="onUsernameChange"
          :disabled="!this.userInfo.isOwn"
        />
        <AtTextarea
          placeholder="点击添加换书宣言，让换书更有吸引力"
          :value="this.userInfo.declaration === '' ? undefined : this.userInfo.declaration"
          :on-change="(val) => this.declaration = val"
          :on-blur="onDeclareChange"
          :count="false"
          :disabled="!this.userInfo.isOwn"
        />
      </view>

      <!--个人书籍-->
      <PersonPublish :book-list="bookList" :is-own="userInfo.isOwn" />
    </view>
  </view>
</template>

<script>
import {AtAvatar, AtTabs, AtTabsPane, AtNoticebar, AtTextarea, AtButton, AtInput} from "taro-ui-vue";
import {getUserBooks, getUserInfo, modifyDeclaration, modifyUsername} from "../../api/personApi";
import BookList from "../../components/bookList/BookList";
import PersonPublish from "../../components/personPublish/personPublish";
import Taro from "@tarojs/taro";
import {getOpenid} from "../../utils/storageGetter";
import "./personalHomepage.scss";

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
    AtInput,
  },
  data() {
    return {
      userInfo: {
        avatar: "",
        name: "用户名",
        declaration: "点击添加换书宣言，让换书更有吸引力",
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
  methods: {
    // 修改name
    async onUsernameChange(val) { // bug:开发工具选择微信名不触发(真机预览触发
      await modifyUsername(val);
      await Taro.showToast({title: "修改成功"})
    },
    // blur后修改换书宣言
    async onDeclareChange() {
      await modifyDeclaration(this.userInfo.declaration)
      await Taro.showToast({title: "修改成功"})
    }
  },
  onLoad(options) {
    // ta人主页传值,我的主页undefined 请求时使用默认本机openid
    let openid = options.userId;
    if (openid) {
      this.userInfo.isOwn = false;
      openid = openid === getOpenid() ? undefined : openid;
      Taro.setNavigationBarTitle({
        title: "Ta的主页",
      })
    }
    // 获取用户信息_this.userInfo
    getUserInfo(openid).then(res => {
      this.userInfo = {
        ...this.userInfo,
        ...res.data[0],
      }
    })
    // 获取用户书籍列表_this.bookList
    getUserBooks(openid).then(res => {
      const {get, sale, history} = res.data.bookList;
      this.bookList.in = get;
      this.bookList.out = sale;
      this.bookList.off = history;
    })
  }
}
</script>

<style scoped>

</style>
