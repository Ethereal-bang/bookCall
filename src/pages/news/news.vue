<template>
  <view class="container">
    <!--小贴士-->
    <view class="tips">
      <view>小贴士：</view>
      <view>-可以尝试从对方主页中看看有没有你喜欢的书，以便更好的达成交换目的~</view>
      <view>-换书成功后即使下架书籍，沟通更高效~</view>
    </view>

    <!--消息列表-->
    <view class="no_news" v-if="newsList.length === 0">
      <image mode="aspectFit" src="https://bookchang.com:8443/images/noneNews.png" />
      <view>什么消息也没有~</view>
    </view>
    <AtList class-name="news_list">
      <AtListItem
        v-for="item in newsList"
        :key="item.askopenid+item.ownopenid+item.dialogueMap.bookId"
        :title="item.name"
        :note="item.dialogueMap.message"
        :thumb="item.avatar"
        :extra-text="item.dialogueMap.time.slice(11, 16)"
        :on-click="() => toCommunicate(item)"
      />
    </AtList>
  </view>
</template>

<script>
import {getNewsList} from "../../api/personApi";
import {AtList, AtListItem} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import "./news.scss";

export default {
  name: "News",
  data() {
    return {
      newsList: [
        { // 消息列表项格式
          id: 0,
          name: "",
          avatar: "",
          ownopenid: "",  // 书主id
          askopenid: "",  // 发起者id
          dialogueMap: {
            Sendopenid: "", // 聊天发起者
            Getopenid: "",  // 聊天接收者
            bookId: "",
            message: "",
            newMessage: "1",  // 1未读
            time: "",
          }
        }
      ],
    }
  },
  // 每次打开页面重新请求（区别onLoad）
  async onShow() {
    this.newsList = (await getNewsList()).data;
  },
  methods: {
    // 跳转至聊天
    toCommunicate(newsItem) {
      Taro.navigateTo({
        url: '/pages/communicate/communicate'
          + '?senderId=' + newsItem.askopenid   // 发起者id
          + '&bookId=' + newsItem.dialogueMap.bookId
          + '&getterId=' + newsItem.ownopenid   // 所有者id
      })
    },
  },
  components: {
    AtList,
    AtListItem,
  }
}
</script>

<style scoped>

</style>
