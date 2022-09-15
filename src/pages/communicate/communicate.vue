<template>
  <view class="communicate">
    <!--书籍-->
    <view class="book_area">
      <!--书籍主人头像(对方-->
      <AtAvatar
        v-if="!changer.isDriver"
        class-name="avatar avatar_left"
        circle
        :image="this.changer.avatar"
        size="small"
      />
      <!--书籍主人头像(自己-->
      <AtAvatar
        v-if="changer.isDriver"
        class-name="avatar avatar_right"
        circle
        :image="this.changer.avatar"
        size="small"
      />
      <!--书籍信息-->
      <view class="info">
        <navigator :url="'/pages/bookDetail/bookDetail?key=' + book.id">
          <AtList class-name="book_list">
            <AtListItem
              :key="book.name"
              :title="book.name"
              :note="'换书寄语' + book.message"
              :thumb="book.photoPath"
              :extra-text="inOrOut2[book.getOrSale]"
            />
          </AtList>
          <button v-if="!(user.openid === senderId)">已达成交换，去下架</button>
        </navigator>
      </view>
    </view>

    <!--对话-->
    <view class="news_area">
      <!--每条消息-->
      <view
        v-for="news in newsList"
        :class="'news ' + (news.dialogueMap.Sendopenid === getOpenid() ? 'news_right' : 'news_left')"
      >
        <navigator
          :url="'/pages/personalHomepage/personalHomepage?userId=' + news.dialogueMap.Sendopenid"
        >
          <AtAvatar class-name="avatar" circle :image="news.avatar" size="small"/>
        </navigator>
        <text>{{ news.dialogueMap.message }}</text>
      </view>
    </view>

    <!--输入框bar-->
    <view class="send">
      <AtInput
        type="text"
        confirmType="发送"
        :on-change="val => this.news = val"
        :value="news"
      />
      <view>
        <AtButton
          class-name="send_btn"
          v-if="this.news.length !== 0"
          :on-click="sendMsg"
        >
          发送
        </AtButton>
        <AtButton
          class-name="media_btn"
          v-if="this.news.length === 0"
          :on-click="sendImg"
        >
          <AtAvatar text="十" circle />
        </AtButton>
      </view>
    </view>
  </view>
</template>

<script>
import {AtCard, AtAvatar, AtInput, AtList, AtListItem, AtButton} from "taro-ui-vue";
import {getCommunication, getUserInfo, sendMsg, sendSubscription} from "../../api/personApi";
import {getOpenid} from "../../utils/storageGetter";
import Taro from "@tarojs/taro";
import {inOrOut2} from "../../data/map";
import "./communicate.scss";
import {getBookDetail} from "../../api/bookApi";

export default {
  name: "Communicate",
  components: {
    AtCard,
    AtAvatar,
    AtInput,
    AtList,
    AtListItem,
    AtButton,
  },
  async onLoad(options) {
    // 接收发起人id, bookId
    this.senderId = options.senderId;
    this.book.id = options.bookId;
    // 本人发起
    if (this.senderId === getOpenid()) {
      this.changer = {
        isDriver: false,
        openid: options.getterId,
      };
      // 请求书籍信息
      this.book = {
        ...(await getBookDetail(this.book.id)).data[0],
      };
    // 对方发起
    } else {
      this.changer = {
        isDriver: true,
        openid: this.senderId,
      }
    }
    // 请求对方信息
    const user = (await getUserInfo(this.changer.openid)).data[0];
    this.changer = {
      ...this.changer,
      name: user.name,
      avatar: user.avatar,
    }
    // 请求与对方聊天记录
    const newsList = (await getCommunication(this.senderId, this.book.id)).data;
      // 首次聊天
    if (newsList.length === 0) {
      this.newsList = [];
      // 非首次
    } else {
      // 获取书籍和消息列表
      this.newsList = newsList.reverse();
      this.book = {
        ...newsList[0].book,
      };
    }
    // 获取本人信息
    getUserInfo(getOpenid()).then(res => {
      this.user = res.data[0];
    })
    // 修改标题为对方name
    await Taro.setNavigationBarTitle({title: this.changer.name})
    console.log(this.user.openid, this.senderId, this.user.openid === this.senderId)
  },
  // onReady() {
  // ?试图实现滚动到最后
  //   Taro.createSelectorQuery().select(".news_area")
  //     .boundingClientRect()
  //     .exec(res => {
  //     console.log(res)
  //   })
  // },
  methods: {
    sendMsg: function () {
      sendMsg(this.book.id, this.news, this.changer.openid);
      this.newsList.push({
        name: this.user.name,
        avatar: this.user.avatar,
        openid: this.user.openid,
        dialogueMap: {
          Sendopenid: this.user.openid,
          Getopenid: this.changer.openid,
          message: this.news,
        },
      })
      this.news = ''
      // 订阅消息通知对方
      sendSubscription(this.changer.openid, this.changer.name, this.book.name);
    },
    sendImg: function() {
      Taro.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sizeType: ['compressed'], // 压缩
        // success: res => {
          // Taro.uploadFile({
          //   url: "",
          //   filePath: res.tempFiles[0].tempFilePath,
          //   success: res2 => {
          //     console.log(res2)
          //   }
          // })
        // }
      })    },
  },
  data() {
    return {
      getOpenid,
      senderId: "", // 聊天发起者id
      book: {
        id: "",
        name: "Loading",
        getOrSale: "",  // 0/1
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
      inOrOut2,
      news: '', // 发送消息
    }
  }
}
</script>

<style>
</style>
