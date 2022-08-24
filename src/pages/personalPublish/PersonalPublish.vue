<template>
  <view>
    <AtNoticebar>当书籍交换成功后，记得及时点击书籍进入详情页下架，避免其他唤友频繁联系你哦~</AtNoticebar>
    <AtTabs
      :on-click="value => this.currentTab = value"
      :current="currentTab"
      :swipeable="true"
      :tab-list="tabList"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
        <BookList :list="personPublic.out" />
        <!--边界情况:-->
        <view v-if="personPublic.out.length === 0">
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
        :index="1"
      >
        <BookList :list="personPublic.in" />
        <!--边界情况:-->
        <view v-if="personPublic.in.length === 0">
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
        <BookList :list="personPublic.off" />
        <!--边界情况:-->
        <AtNoticebar v-if="personPublic.off.length === 0">
          你还没有下架任何书籍哦！
        </AtNoticebar>
      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtTabs, AtTabsPane, AtList, AtListItem, AtDivider, AtNoticebar, AtButton} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import BookList from "../../components/bookList/BookList";

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

<style scoped>
view {
  height: 20vh;
}
</style>
