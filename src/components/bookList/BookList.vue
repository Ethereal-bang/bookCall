<template>
  <AtList
    :class="tabs_body_class"
  >
    <AtListItem
      v-for="book in bookList"
      :key="book.id"
      :title="book.name"
      :note="book.words"
      :thumb="imgPaths[book.img]"
      :extra-text="book.states"
      :on-click="bookDetailClick.bind(this, book.id)"
      style="color:#57665e"
      v-if="isChosenUniversity"
      :class="(book.states === '可换') ? 'item_out' : 'item_in'"
    />
  </AtList>
</template>

<script>
import {AtList, AtListItem} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import books from "../../mock/books.json";
const imgPaths = require("../../utils/base64");

export default {
  name: "BookList",
  components: {
    AtList,
    AtListItem,
  },
  data() {
    return {
      bookList: books,
      isChosenUniversity: true
    }
  }
  methods: {
    bookDetailClick(key) {
      console.log(key)
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  }
}
</script>

<style scoped>

</style>
