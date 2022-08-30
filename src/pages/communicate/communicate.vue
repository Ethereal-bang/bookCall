<template>
  <view>
    <!--书籍-->
    <view>
      <view>{{changer.isDriver ? "对方从这本书找到了你" : "你正在沟通Ta的这本书"}}</view>
      <!--书籍信息-->
      <AtCard
        :title="book.name"
        :thumb="book.photoPath"
        :extra="book.state"
      >
        <view>换书寄语：</view>
        <view>{{book.message}}</view>
      </AtCard>
      <navigator :url="'/pages/bookDetail/bookDetail?key=' + book.id">
        <button>已达成交换，去下架</button>
      </navigator>
    </view>

    <!--对话-->
    <view>
      <!--每条消息-->
      <view
        v-for="news in newsList"
        :class="'news ' + (news.dialogueMap.Sendopenid === getOpenid() ? 'news_right' : 'news_left')"
      >
        <AtAvatar circle :image="news.avatar" size="small" />
        <text>{{news.dialogueMap.message}}</text>
      </view>
    </view>

    <!--输入框-->
    <AtInput
      confirmType="发送"
      :on-confirm="sendMsg"
      clear
      class="input"
    >
<!--      <image src="https://aotu.io/img.png" />-->
    </AtInput>
  </view>
</template>

<script>
import {AtCard, AtAvatar, AtInput} from "taro-ui-vue";
import {getCommunication, getUserInfo, sendMsg} from "../../api/personApi";
import {getOpenid} from "../../utils/storageGetter";
import Taro from "@tarojs/taro";
import {inOrOut2} from "../../data/map";

export default {
  name: "Communicate",
  components: {
    AtCard,
    AtAvatar,
    AtInput,
  },
  async onLoad(options) {
    // 接收发起人id, bookId
    this.senderId = options.senderId;
    this.book.id = options.bookId;
    // 请求与对方聊天记录
    const data = (await getCommunication(this.senderId, this.book.id)).data;
    this.newsList = data.slice(0, 6).reverse();  // 暂定！最多显示6条消息
    this.senderId = data[0].askopenid;
    this.book = {
      ...data[0].book,
      state: inOrOut2[data[0].book.getOrSale],
    };
    // 请求对方信息
    const curOpenid = getOpenid();
    this.changer = {
      isDriver: !this.senderId === curOpenid,
      openid: data[0].ownopenid === curOpenid ? this.senderId : data[0].ownopenid,
    };
    const user = (await getUserInfo(this.changer.openid)).data[0];
    this.changer = {
      ...this.changer,
      name: user.name,
      avatar: user.avatar,
    }
    await Taro.setNavigationBarTitle({title: this.changer.name})
  },
  methods: {
    sendMsg: function (val) {
      sendMsg(this.book.id, val, this.changer.openid);
      this.newsList.push({
        name: this.user.name,
        avatar: this.user.avatar,
        openid: this.user.openid,
        dialogueMap: {
          Sendopenid: this.user.openid,
          Getopenid: this.changer.openid,
        },
      })
    },
  },
  data() {
    return {
      getOpenid,
      senderId: "", // 聊天发起者id
      book: {
        id: "",
        name: "Loading",
        state: "",  // 可换/求换
        photoPath: "",
        message: "",  // 换书寄语
      },
      user: { // 本用户信息
        name: "Loading",
        avatar: "",
        openid: getOpenid(),
      },
      changer: {  // 对方用户
        // 由openid请求得到
        name: "Loading",
        avatar: "",
        // 以下两项由ownId和sender getter推出
        openid: "",
        isDriver: false,  // 是否对方主动联系
      },
      newsList: [{
        id: "",
        name: "", // 当前对话者name
        avatar: "",
        dialogueMap: { // 消息列表项格式
          id: "",
          Sendopenid: "", // 聊天发起者
          Getopenid: "",
          time: "",
          message: "",
        },
      }],
    }
  }
}
</script>

<style>
.news { /*每一条*/
  height: 145px;
  position: relative;
  line-height: 81px;
}
.news_left>.at-avatar { /*头像*/
  float: left;
}
.news_right {
  float: right;
  clear: both;
}
.news_right>.at-avatar {
  float: right;
  clear: both;
}
.input {  /*聊天输入框*/
  position: absolute;
  bottom: 250px;
}
</style>
