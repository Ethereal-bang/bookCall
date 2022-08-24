<template>
  <view>
    <!--提示-->
    <AtNoticebar v-if="isOwn">当书籍交换成功后，记得及时点击书籍进入详情页下架，避免其他唤友频繁联系你哦~</AtNoticebar>

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
        <view v-if="bookList.in.length === 0 && isOwn">
          <AtNoticebar v-if="bookList.out.length === 0 && isOwn">
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
        <view v-if="bookList.in.length === 0 && isOwn">
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
        <AtNoticebar v-if="bookList.off.length === 0 && isOwn">
          你还没有下架任何书籍哦！
        </AtNoticebar>
      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtTabs, AtTabsPane, AtNoticebar, AtButton} from "taro-ui-vue";
import BookList from "../../components/bookList/bookList";

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
