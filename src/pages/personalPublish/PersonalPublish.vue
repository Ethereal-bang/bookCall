<template>
  <view class="personal_publish">
    <PersonPublish :book-list="personPublic" is-own="true"/>
  </view>
</template>

<script>
import {AtTabs, AtTabsPane, AtList, AtListItem, AtDivider, AtNoticebar, AtButton} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import BookList from "../../components/bookList/BookList";
import PersonPublish from "../../components/personPublish/personPublish";

export default {
  name: "PersonalPublish",
  components: {
    BookList,
    AtTabs,
    AtTabsPane,
    AtList,
    AtListItem,
    AtDivider,
    AtNoticebar,  // 通告栏
    AtButton,
    PersonPublish
  },
  data() {
    return {
      currentTab: 0,
      tabList: [
        {title: '可换'},
        {title: '求换'},
        {title: '已下架'},
      ],
      personPublic: {
        out: [],
        in: [],
        off: [],
      },
    }
  },
  methods: {
    bookDetailClick(key) {
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
  onLoad() {
    // openid请求个人发布
  },
}
</script>

<style>
.personal_publish {
  height: 100vh;
  padding: 0 20px;
  background-color: #F5F5F5;
}
</style>
