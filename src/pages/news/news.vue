<template>
  <view>
    <!--小贴士-->
    <view>
      <view>小贴士：</view>
      <view>-可以尝试从对方主页中看看有没有你喜欢的书，以便更好的达成交换目的~</view>
      <view>-换书成功后即使下架书籍，沟通更高效~</view>
    </view>

    <!--消息列表-->
    <view v-if="newsList.length === 0">什么消息也没有~</view>
    <AtList>
      <AtListItem
        v-for="item in newsList"
        :key="item.id"
        :title="item.name"
        :note="item.dialogueMap.message"
        :thumb="item.avatar"
        :extra-text="item.dialogueMap.time"
        :on-click="() => toCommunicate(item.dialogueMap)"
      />
    </AtList>
  </view>
</template>

<script>
import {getNewsList} from "../../api/personApi";
import {AtList, AtListItem} from "taro-ui-vue";
import Taro from "@tarojs/taro";

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
  async onLoad() {
    this.newsList = (await getNewsList()).data;
  },
  methods: {
    // 跳转至聊天
    toCommunicate(dialogueMap) {
      Taro.navigateTo({
        url: '/pages/communicate/communicate'
          + '?senderId=' + dialogueMap.Sendopenid
          + '&bookId=' + dialogueMap.bookId,
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
