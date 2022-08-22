<template>
  <view>
    <!--用户信息-->
    <view>
      <AtAvatar :image="this.userInfo.avatar" circle />
      <view>{{userInfo.name}}</view>
      <AtTextarea
        :value="this.userInfo.words"
        :on-change="(val) => this.userInfo.words = val"
        :count="false"
        :disabled="!this.userInfo.isOwn"
      />
    </view>

    <!--提示-->
    <AtNoticebar v-if="userInfo.isOwn">当书籍交换成功后，记得及时点击书籍进入详情页下架，避免其他唤友频繁联系你哦~</AtNoticebar>

    <!--书籍列表-->
    <AtTabs
      :current="currentTab"
      :tab-list="[
        {title: '推荐'},
        {title: '等你换'},
        {title: 'Ta想要'},
      ]"
      :on-click="value => this.currentTab = value"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
        <BookList :list=bookList.out />
      </AtTabsPane>
      <AtTabsPane
        :current="currentTab"
        :index="1"
      >
        <BookList :list="bookList.in" />
      </AtTabsPane>
      <AtTabsPane
        :current="currentTab"
        :index="2"
      >
        <BookList :list="bookList.off" />
      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtAvatar, AtTabs, AtTabsPane, AtNoticebar, AtTextarea} from "taro-ui-vue";
import {getUserBooks, getUserInfo} from "../../api/personApi";
import BookList from "../../components/bookList/bookList";

export default {
  name: "personalHomepage",
  components: {
    AtAvatar,
    AtTabs,
    AtTabsPane,
    BookList,
    AtNoticebar,
    AtTextarea,
  },
  data() {
    return {
      userInfo: {
        avatar: "http://photo.chaoxing.com/photo_80.jpg",
        name: "用户名",
        words: "点击添加换书宣言，让换书更有吸引力",
        isOwn: true,  // 是否本人
      },
      currentTab: 0,
      bookList: {
        out: [],  // 可换
        in: [], // 求换
        off: [],  // 已下架
      }
    }
  },
  onLoad(options) {
    const userId = options.userId;
    // 获取用户信息_this.userInfo
    getUserInfo(userId)
    // 获取用户书籍列表_this.bookList
    getUserBooks(userId).then(res => {
      this.bookList.in = res.data;
      this.bookList.out = res.data;
      this.bookList.off = res.data;
    })
  }
}
</script>

<style scoped>

</style>
