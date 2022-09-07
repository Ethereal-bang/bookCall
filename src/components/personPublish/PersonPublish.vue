<template>
  <view class="person_publish">
    <!--提示-->
    <AtNoticebar v-if="isOwn">当书籍交换成功后，记得及时点击书籍进入详情页下架，避免其他唤友频繁联系你哦~</AtNoticebar>

    <!--书籍列表-->
    <AtTabs
      :current="currentTab"
      :tab-list="[
        {title: '可换'},
        {title: '求换'},
        {title: '已下架'},
      ]"
      :on-click="value => this.currentTab = value"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
        <BookList :list=bookList.out />
        <!--边界情况:-->
        <view class="none_publish" v-if="bookList.out.length === 0 && isOwn">
          <image src="https://bookchang.com:8443/images/nonePublish.png" />
          <view>你还没有发布任何书籍哦！</view>
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
        <view class="none_publish" v-if="bookList.in.length === 0 && isOwn">
          <image src="https://bookchang.com:8443/images/nonePublish.png" />
          <view>你还没有发布任何书籍哦！</view>
          <navigator url="/pages/publish/publish" open-type="switchTab">
            <AtButton>去发布</AtButton>
          </navigator>
        </view>
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
import {AtTabs, AtTabsPane, AtNoticebar, AtButton} from "taro-ui-vue";
import BookList from "../../components/bookList/BookList";
import "./PersonPublish.scss";

export default {
  name: "PersonPublish",
  props: {
    bookList: {
      out: [],
      in: [],
      off: [],
    },
    isOwn: true,
  },
  data() {
    return {
      currentTab: 0,
    }
  },
  components: {
    BookList,
    AtTabs,
    AtTabsPane,
    AtNoticebar,
    AtButton,
  },
}
</script>

<style scoped>

</style>
