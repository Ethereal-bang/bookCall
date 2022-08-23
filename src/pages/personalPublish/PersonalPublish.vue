<template>
  <view>
    <AtTabs
      :on-click="handleClick"
      :current="currentTab"
      :swipeable="true"
      :tab-list="tabList"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
        <AtNoticebar>当书籍交换成功后，记得及时点击书籍进入详情页下架，避免其他唤友频繁联系你哦~</AtNoticebar>
        <AtList>
          <AtListItem
            v-for="book in personPublic"
            :key="book.id"
            v-if="book.states === '可换'"
            :title="book.name"
            :note="book.words"
            :on-click="bookDetailClick.bind(this, book.id)"
            thumb="http://photo.chaoxing.com/photo_80.jpg"
          />
        </AtList>
      </AtTabsPane>

      <AtTabsPane
        :current="currentTab"
        :index="1"
      >
        <AtNoticebar>当书籍交换成功后，记得及时下架对应书籍，避免其他唤友频繁联系你哦~</AtNoticebar>
        <AtList>
          <AtListItem
            v-for="book in personPublic"
            :key="book.id"
            v-if="book.states === '求换'"
            :title="book.name"
            :note="book.words"
            :on-click="bookDetailClick.bind(this, book.id)"
          />
        </AtList>
      </AtTabsPane>

      <AtTabsPane
        :current="currentTab"
        :index="2"
      >
        <AtNoticebar>下架后的书籍如果最终没有交换成功，可重新上架哦~</AtNoticebar>
        <AtList>
          <AtListItem
            v-for="book in personPublic"
            :key="book.id"
            v-if="book.states === '下架'"
            :title="book.name"
            :note="book.words"
            :on-click="bookDetailClick.bind(this, book.id)"
          />
        </AtList>
      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtTabs, AtTabsPane, AtList, AtListItem, AtDivider, AtNoticebar} from "taro-ui-vue";
import Taro from "@tarojs/taro";

export default {
  name: "PersonalPublish",
  components: {
    AtTabs,
    AtTabsPane,
    AtList,
    AtListItem,
    AtDivider,
    AtNoticebar,  // 通告栏
  },
  data() {
    return {
      currentTab: 0,
      tabList: [
        {title: '可换'},
        {title: '求换'},
        {title: '已下架'},
      ],
      key: undefined,
      personPublic: [],
    }
  },
  methods: {
    handleClick(value) {
      this.currentTab = value
    },
    bookDetailClick(key) {
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
  onLoad(options) {
    const id = Taro.getStorageSync("userId")  // 标识用户
    // users.map(user => {
    //   if (user.id === id) {
    //     this.personPublic = user.public;
    //   }
    // })
  },
}
</script>

<style scoped>
view {
  height: 20vh;
}
</style>
