<template>
  <AtList>
    <AtListItem
      v-for="book in bookList"
      :key="book.id"
      :title="book.name"
      :note="book.words"
      :extra-text="book.states"
      :on-click="bookDetailClick.bind(this, book.id)"
    />
  </AtList>
</template>

<script>
import { AtList, AtListItem } from 'taro-ui-vue';
import Taro from "@tarojs/taro";
import BookList from "../../components/bookList/BookList";

export default {
  name: "Books",
  props: {
    bookList: Array,
    title: String,  // 页面标题
  },
  components: {
    AtList,
    AtListItem,
    BookList,
  },
  data() {
    return {
      isChosenUniversity: true
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
    Taro.setNavigationBarTitle({
      title: options.title,
    })
  }
}
</script>

<style scoped>

</style>
