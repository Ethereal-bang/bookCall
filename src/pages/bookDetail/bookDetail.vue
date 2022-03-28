<template>
  <view class="bookDetail">
    <PersonalBar />

    <image
      src="./book.png"
      class="bookimg"
      mode="aspectFit"
    />
  <view class="bookmes">
    <view class="bookname">南朝清谈</view>

    <view>
      <AtTag class="booktag" size="small"
        v-if="bookState"
        :active="true"
      >
        可换
      </AtTag>
      <AtTag
        v-if="!bookState" size="small"
        :active="true"
                 class="booktag"
      >
        求换
      </AtTag>

      <AtTag size="small"
                :active="true"
                 class="booktag">8成新</AtTag>
      <AtTag size="small"
          :active="true"
                 class="booktag"  key="">文学</AtTag>
    </view>
    <view>
      <text>换书寄语：</text>
      <text>是本好书~</text>
    </view>

    <view>
      <view
        v-for="item in info"
      >
        {{ item.title }}  {{ item.content }}
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
      <view>请选择以下联系方式联系这位同学，更多的交流才能更好的完成换书~(点击即可复制)</view>
      <view @tap="clip">
        <text>微信</text>
        <text>XXXXXX</text>
      </view>
      <view>
        <text>QQ</text>
        <text>XXXXXX</text>
      </view>
      <view>
        <text>电话</text>
        <text>未留下该方式</text>
      </view>
    </view>
  </view>
</template>

<script>
import PersonalBar from "../../components/PersonalBar";
import { AtTag } from 'taro-ui-vue';
import Taro from "@tarojs/taro";
import './bookDetail.scss';

const books = require("../../mock/books.json");

export default {
  name: "BookDetail",
  data() {
    return {
      key: "",  // 书籍编号
      info: [
        {title: "作者", content: "暂无"},
        {title: "ISBN", content: "暂无"},
      ],
      bookState: true,  // true表可换，false表在求
      isOwn: false,   // 是否为本人
    }
  },
  components: {
    PersonalBar,
    AtTag,
  },
  onLoad: function (options) {
    this.bookData = books[this.key];
    console.log(this.bookData)
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

