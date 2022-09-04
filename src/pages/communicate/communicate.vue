<template>
  <view class="communicate">
    <!--书籍-->
    <view class="book_area">
      <!--书籍主人头像(对方-->
      <AtAvatar
        v-if="changer.isDriver"
        class-name="avatar avatar_left"
        circle
        :image="this.changer.avatar"
        size="small"
      />
      <!--书籍主人头像(自己-->
      <AtAvatar
        v-if="!changer.isDriver"
        class-name="avatar avatar_right"
        circle
        :image="this.changer.avatar"
        size="small"
      />
      <!--书籍信息-->
      <view class="info">
        <AtList class-name="book_list">
          <AtListItem
            :key="book.name"
            :title="book.name"
            :note="'换书寄语' + book.message"
            :thumb="book.photoPath"
            :extra-text="inOrOut2[book.getOrSale]"
          />
        </AtList>
        <navigator :url="'/pages/bookDetail/bookDetail?key=' + book.id">
          <button>已达成交换，去下架</button>
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
        <AtAvatar class-name="avatar" circle :image="news.avatar" size="small"/>
        <text>{{ news.dialogueMap.message }}</text>
      </view>
    </view>

    <!--输入框bar-->
    <view class="send">
      <AtInput
        confirmType="发送"
        :on-confirm="sendMsg"
        clear
      />
      <AtAvatar text="十" circle />
    </view>
  </view>
</template>

<script>
import {AtCard, AtAvatar, AtInput, AtList, AtListItem} from "taro-ui-vue";
import {getCommunication, getUserInfo, sendMsg} from "../../api/personApi";
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
  },
  async onLoad(options) {
    // 接收发起人id, bookId
    const openid = options.openid;
    this.senderId = openid;
    this.book.id = options.bookId;
    // 本人发起（从书籍详情导航case
    if (openid === getOpenid()) {
      this.changer = {
        isDriver: false,
        openid: options.getId,
      };
      // 请求对方信息
      const user = (await getUserInfo(this.changer.openid)).data[0];
      this.changer = {
        ...this.changer,
        name: user.name,
        avatar: user.avatar,
      }
      await Taro.setNavigationBarTitle({title: this.changer.name})
      this.newsList = [];
      // 请求书籍信息
      const book = (await getBookDetail(this.book.id)).data[0];
      this.book = {
        ...book,
      };
    } else {  // 对方发起（从消息列表导航case
      // 请求与对方聊天记录
      const data = (await getCommunication(this.senderId, this.book.id)).data;
      this.newsList = data.slice(0, 6).reverse();  // 暂定！最多显示6条消息
      this.senderId = data[0].askopenid;
      this.book = {
        ...data[0].book,
      };
    }
    // 获取本人信息
    getUserInfo(getOpenid()).then(res => {
      this.user = res.data[0];
    })
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
          message: val,
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
    }
  }
}
</script>

<style>
</style>
