<template>
  <view class="bookDetail">
    <!--用户信息栏-->
    <PersonalBar
      :user-name="bookData.username"
      :user-id="userData.id"
      :avatar-url="bookData.img"
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

    <button
      v-if="!userData.isOwn"
      @tap="handle"
      class="button"
    >
      找Ta换
    </button>
    <button
      v-if="userData.isOwn"
      class="button"
    >
      下架
    </button>
  </view>
</template>

<script>
import PersonalBar from "../../components/personBar/PersonalBar";
import {AtTag} from 'taro-ui-vue';
import './bookDetail.scss';

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
    console.log(options)
    this.key = options.key;
    // 请求书籍信息;
    // ...获取对应用户信息
    console.log(this.bookData, this.userData)
    // ...是否属于本人
  },
  methods: {
    handle() {
      const info = document.querySelector("#info");
      info.removeAttribute("class");
      info.setAttribute("class", "show")
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

