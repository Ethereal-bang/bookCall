<template>
  <view class="bookDetail">
    <!--用户信息栏-->
    <PersonalBar
      :user-name="userData.username"
      :user-id="userData.id"
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
        <view>{{ bookData.bookIntroduction }}</view>
      </view>

      <!--寄语-->
      <view>
        <text>换书寄语：</text>
        <text>{{ bookData.message }}</text>
      </view>

    </view>

    <!--三种按钮-->
    <view>
      <button
        v-if='!userData.isOwn'
        @tap="handle"
        class="button"
      >
        {{bookData.state === "求换" ? "我有，换给Ta" : "找Ta换"}}
      </button>
      <button
        v-if="userData.isOwn"
        @tap="handle"
        class="button"
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

export default {
  name: "BookDetail",
  data() {
    return {
      key: "",  // 书籍编号
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
        id: undefined,
        username: "Loading",
        isOwn: false,   // 是否为本人
      }, // 书籍所有者信息
    }
  },
  components: {
    PersonalBar,
    AtTag,
  },
  onLoad: function (options) {
    this.key = options.key;
    // 请求书籍信息;
    getBookDetail(this.key).then(res => {
      if (res.data.length === 0) return;
      const info = res.data[0];
      this.bookData = {
        ...info,
        state: inOrOut2[info.getOrSale],
        genre: genreMap3[info.category],
        old: oldDegreeMap[info.label],
      }
      this.userData.id = info.openid; // 获取用户id
    }, err => {console.log(err)})
    // ...获取对应用户信息
    // console.log(this.bookData, this.userData)
    // ...是否属于本人
  },
  methods: {
    handle() {
      const info = document.querySelector("#info");
      info.removeAttribute("class");
      info.setAttribute("class", "show")
      // 判断属于三种情况中哪种
      switch (this.userData.isOwn) {
        case true:  // 下架书籍
          bookOff(this.bookData.id).then(res => {

          }, err => {console.log(err)})
          break;
        case false: // 跳转消息框页_主动联系
          switch (this.bookData.state) {
            case "求换":  // 找ta换
              break;
            case "可换":  // 换给ta
              break;
          }
      }
    },
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

