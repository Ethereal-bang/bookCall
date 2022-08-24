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
        <!--边界情况:-->
        <view v-if="bookList.in.length === 0 && userInfo.isOwn">
          <AtNoticebar v-if="bookList.out.length === 0 && userInfo.isOwn">
            你还没有发布任何书籍哦！
          </AtNoticebar>
          <navigator url="/pages/publish/publish" open-type="switchTab">
            <AtButton>去发布</AtButton>
          </navigator>
        </view>
      </AtTabsPane>
      <AtTabsPane
        :current="currentTab"
        :index="1"
      >
        <BookList :list="bookList.in" />
        <!--边界情况:-->
        <view v-if="bookList.in.length === 0 && userInfo.isOwn">
          <AtNoticebar>
            你还没有发布任何书籍哦！
          </AtNoticebar>
          <navigator url="/pages/publish/publish">
            <AtButton>去发布</AtButton>
          </navigator>
        </view>
      </AtTabsPane>
      <AtTabsPane
        :current="currentTab"
        :index="2"
      >
        <BookList :list="bookList.off" />
        <!--边界情况:-->
        <AtNoticebar v-if="bookList.off.length === 0 && userInfo.isOwn">
          你还没有下架任何书籍哦！
        </AtNoticebar>
      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtAvatar, AtTabs, AtTabsPane, AtNoticebar, AtTextarea, AtButton} from "taro-ui-vue";
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
    AtButton,
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
  onLoad() {
    // 获取用户信息_this.userInfo
    getUserInfo()
    // 获取用户书籍列表_this.bookList
    getUserBooks().then(res => {
      const {get, sale, history} = res.data;
      this.bookList.in = get;
      this.bookList.out = sale;
      this.bookList.off = history;
    })
  }
}
</script>

<style scoped>

</style>
