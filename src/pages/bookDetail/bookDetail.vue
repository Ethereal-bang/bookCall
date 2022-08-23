<template>
  <view class="bookDetail">
    <!--用户信息栏-->
    <PersonalBar
      :user-name="userData.username"
      :user-id="userData.id"
    />

    <!--书籍封面-->
    <!--    <image-->
    <!--      :src="imgPaths[bookData.img]"-->
    <!--      class="bookimg"-->
    <!--      mode="aspectFit"-->
    <!--    />-->

    <!--书籍信息-->
    <view class="bookmes">
      <view class="bookname">{{ bookData.name }}</view>
      <!--Label-->
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
        <text>{{ bookData.publishTime }}</text>
      </view>

      <!--简介-->
      <view>
        <text>图书简介</text>
        <text>{{ bookData.description }}</text>
      </view>

      <!--寄语-->
      <view>
        <text>换书寄语：</text>
        <text>{{ bookData.words }}</text>
      </view>

    </view>

    <!--三种按钮-->
    <view>
      <button
        v-if='!userData.isOwn && bookData.states === "求换"'
        @tap="handle"
        class="button"
      >
        找Ta换
      </button>
      <button
        v-if='!userData.isOwn && bookData.states === "可换"'
        @tap="handle"
        class="button"
      >
        我有，换给Ta
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

export default {
  name: "BookDetail",
  data() {
    return {
      key: "",  // 书籍编号
      bookData: {
        "id": undefined,
        "name": "Loading",
        "img": "",
        "states": "Loading",
        "words": "",
        "genre": "",
        "old": undefined,
        "author": "",
        press: "Loading", // 出版社
        publishTime: "",  // 出版时间
        description: "",  // 图书简介
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
      this.bookData = res.data;
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
          switch (this.bookData.states) {
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

