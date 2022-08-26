<template>
  <view>
    <!--书籍-->
    <view>
      <view>{{changer.isDriver ? "对方从这本书找到了你" : "你正在沟通Ta的这本书"}}</view>
      <!--书籍信息-->
      <AtCard
        :title="book.name"
        :thumb="book.photoPath"
        :extra="book.state"
      >
        <view>换书寄语：</view>
        <view>{{book.message}}</view>
      </AtCard>
      <navigator :url="'/pages/bookDetail/bookDetail?key=' + book.id">
        <button>已达成交换，去下架</button>
      </navigator>
    </view>

    <!--对话-->

  </view>
</template>

<script>
import {AtCard, } from "taro-ui-vue";

export default {
  name: "Communicate",
  components: {
    AtCard,
  },
  data() {
    return {
      book: {
        id: "",
        name: "Loading",
        state: "",  // 可换/求换
        photoPath: "",
        message: "",  // 换书寄语
      },
      changer: {
        openid: "",
        avatar: "",
        isDriver: false,  // 是否对方主动联系
      },
      newsList: [],
    }
  }
}
</script>

<style scoped>

</style>
