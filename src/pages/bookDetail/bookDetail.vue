<template>
  <view class="bookDetail">
    <!--用户信息栏-->
    <PersonalBar
      :user-name="userData.name"
      :user-id="userData.openid"
      :avatar="userData.avatar"
      :is-own="userData.isOwn"
    />

    <!--书籍封面-->
    <image
      :src="bookData.photoPath"
      class="bookimg"
      mode="aspectFit"
    />

    <!--书籍信息-->
    <view class="bookmes">
      <view class="bookname">{{ bookData.name }}</view>
      <!--Label-->
      <view>
        <AtTag class="booktag" size="small">{{bookData.state}}</AtTag>

        <AtTag size="small"
               :active="true"
               class="booktag"
        >{{ bookData.old }}成新
        </AtTag>
        <AtTag size="small"
               :active="true"
               class="booktag" key=""
        >{{ bookData.genre }}
        </AtTag>
      </view>

      <!--寄语-->
      <view style="color: #A3A3A3">
        <text>换书寄语：</text>
        <text>{{ bookData.message }}</text>
      </view>

      <!--作者-->
      <view>
        <text>作者</text>
        <text>{{ bookData.author }}</text>
      </view>

      <!--出版社-->
      <view>
        <text>出版社</text>
        <text>{{ bookData.press }}</text>
      </view>

      <!--出版社-->
      <view>
        <text>出版时间</text>
        <text>{{ bookData.publishingTime }}</text>
      </view>

      <!--简介-->
      <view>
        <text>图书简介</text>
        <view class="info">{{ bookData.bookIntroduction }}</view>
      </view>
    </view>

    <!--三种按钮-->
    <view class="button">
      <button
        v-if='!userData.isOwn'
        @tap="handle"
        :style="bookData.state === '求换' ? 'background-color: #C72518' : 'background-color: #FFCA4E'"
      >
        {{bookData.state === "求换" ? "我有，换给Ta" : "找Ta换"}}
      </button>
      <button
        v-if="userData.isOwn"
        @tap="handle"
        style="background-color: #81CEA2"
      >
        下架书籍
      </button>
    </view>
  </view>
</template>

<script>
import PersonalBar from "../../components/personBar/PersonalBar";
import {AtTag} from 'taro-ui-vue';
import './bookDetail.scss';
import {bookOff, getBookDetail} from "../../api/bookApi";
import {genreMap3, inOrOut2, oldDegreeMap} from "../../data/map";
import {getUserInfo} from "../../api/personApi";
import {getOpenid} from "../../utils/storageGetter";
import Taro from "@tarojs/taro";

export default {
  name: "BookDetail",
  data() {
    return {
      bookData: {
        id: undefined,
        name: "Loading",
        photoPath: "",
        "state": "Loading", // 通过接收到的getOrSale转换
        message: "",
        "genre": "",  // 通过接收到的category转换
        "old": undefined, // 通过接收到的label转换
        author: "",
        press: "Loading", // 出版社
        publishingTime: "",  // 出版时间
        bookIntroduction: "",  // 图书简介
      },
      userData: {
        openid: "",  // openid
        name: "Loading",
        avatar: "",
        isOwn: false,   // 是否为本人
      }, // 书籍所有者信息
    }
  },
  components: {
    PersonalBar,
    AtTag,
  },
  onLoad: function (options) {
    // 请求书籍信息;
    getBookDetail(options.key).then(res => {
      if (res.data.length === 0) return;
      const info = res.data[0];
      this.bookData = {
        ...info,
        state: inOrOut2[info.getOrSale],
        genre: genreMap3[info.category],
        old: oldDegreeMap[info.label],
      }
      // ...获取对应用户信息
      getUserInfo(info.openid).then(res => {
        this.userData = {
          ...res.data[0],
          isOwn: info.openid === getOpenid(),  // 该书对应用户id与本地openid比较
        }
      }, err => console.log(err));
    }, err => {console.log(err)})
    },
  methods: {
    handle() {
      // 判断属于三种情况中哪种
      switch (this.userData.isOwn) {
        case true:  // 下架书籍
          bookOff(this.bookData.id).then(() => {
            // 提示语显示一秒后跳转
            Taro.showToast({title: "下架成功"})
            setTimeout(() => {
              Taro.navigateTo({url: "/pages/personalPublish/personalPublish"})
            }, 1000)
          }, () => {
            Taro.showToast({title: "下架失败", icon: "error"})
          })
          break;
        case false: // 跳转消息框页_主动联系
          switch (this.bookData.state) {
            case "求换":  // 找ta换
            case "可换":  // 换给ta
              Taro.navigateTo({
                url: "/pages/communicate/communicate"
                  + "?openid=" + this.userData.openid
                  + "&bookId=" + this.bookData.id
              })
          }
      }
    },
  }
}
</script>

<style>
</style>

