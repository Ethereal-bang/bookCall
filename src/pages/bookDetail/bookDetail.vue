<template>
  <view class="bookDetail">
    <PersonalBar
      :user-name="bookData.username"
      :user-id="userData.id"
      :avatar-url="bookData.img"
    />

    <image
      :src="imgPaths[bookData.img]"
      class="bookimg"
      mode="aspectFit"
    />
  <view class="bookmes">
    <view class="bookname">{{ bookData.name }}</view>

    <view>
      <AtTag class="booktag" size="small"
        v-if="bookData.states === '可换'"
        :active="true"
      >
        可换
      </AtTag>
      <AtTag
        v-if="bookData.states === '求换'" size="small"
        :active="true"
                 class="booktag"
      >
        求换
      </AtTag>

      <AtTag size="small"
                :active="true"
                 class="booktag">{{ bookData.old }}成新</AtTag>
      <AtTag size="small"
          :active="true"
                 class="booktag"  key="">{{ bookData.genre }}</AtTag>
    </view>
    <view>
      <text>换书寄语：</text>
      <text>{{ bookData.words }}</text>
    </view>

    <view>
      <view>
        <text>作者：</text>
        <text>{{ bookData.author }}</text>
      </view>
      <view>
        <text>ISBN：</text>
        <text>暂无</text>
      </view>
    </view>
</view>
    <button
      v-if="!isOwn"
      @tap="handle"
      class="button"
    >
      找Ta换
    </button>
    <view id="info" class="hide">
      <view>请选择以下联系方式联系这位同学</view>
      <view>更多的交流才能更好的完成换书~(点击即可复制)</view>
      <view @tap="clip">
        <text>微信:</text>
        <text>XXXXXX</text>
      </view>
      <view>
        <text>电话:</text>
        <text>未留下该方式</text>
      </view>
    </view>
    <button
      v-if="isOwn"
      class="button"
    >
      下架
    </button>
  </view>
</template>

<script>
import PersonalBar from "../../components/personBar/PersonalBar";
import { AtTag } from 'taro-ui-vue';
import Taro from "@tarojs/taro";
import './bookDetail.scss';
const imgPaths = require("../../utils/base64");
const books = require("../../mock/books.json");
const users = require("../../mock/users.json");

export default {
  name: "BookDetail",
  data() {
    return {
      key: "",  // 书籍编号
      isOwn: false,   // 是否为本人
      bookData: {
        "id": undefined,
        "username": "Loading",
        "name": "Loading",
        "img": "",
        "states": "Loading",
        "words": "",
        "genre": "",
        "old": undefined,
        "contact": "",
        "author": ""
      },
      userData: {
        "id": undefined,
        "username": "",
        "words": "",
        "contact": undefined,
      }, // 书籍所有者信息
      imgPaths,
    }
  },
  components: {
    PersonalBar,
    AtTag,
  },
  onLoad: function (options) {
    console.log(options)
    this.key = options.key;
    this.bookData = books[this.key - 1];
    // 找到对应用户
    for (const user of users) {
      if (user.username === this.bookData.username) {
        this.userData = user;
        break;
      }
    }
    console.log(this.bookData,this.userData)
    // 写死，后面改！:
    if (this.bookData.name === "编译原理") {
      this.isOwn = true;
    }
  },
  methods: {
    handle() {
      const info = document.querySelector("#info");
      info.removeAttribute("class");
      info.setAttribute("class", "show")
    },
    clip() {  // 点击复制
      Taro.setClipboardData({
        data: "微信号_Test",
        success: (res) => {
          console.log("success")
        }
      })
    }
  }
}
</script>

<style>
.show {
  display: block;
}
.hide {
  display: none;
}
</style>

