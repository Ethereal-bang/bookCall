<template>
  <BookList :book-list="list" />
</template>

<script>
import { AtList, AtListItem } from 'taro-ui-vue';
import Taro from "@tarojs/taro";
import BookList from "../../components/bookList/BookList";

export default {
  name: "Books",
  components: {
    AtList,
    AtListItem,
    BookList,
  },
  data() {
    return {
      list: [],
    }
  },
  methods: {
    bookDetailClick(key) {
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
  onLoad(options) {
    // 获取标题并设置
    Taro.setNavigationBarTitle({
      title: options.title,
    })
    // 获取书籍列表
    const pages = Taro.getCurrentPages(),
      current = pages[pages.length - 1];  // 堆栈中获取当前页
    const eventChannel = current.getOpenerEventChannel();  // 页面间事件通信通道
    eventChannel.on("sendData", data => {
      this.list = data.list;
    })
  }
}
</script>

<style scoped>

</style>
