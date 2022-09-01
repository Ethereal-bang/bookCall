<template>
  <AtList class-name="book_list">
    <AtListItem
      v-for="book in list"
      :key="book.id"
      :title="book.name"
      :note="book.message"
      :thumb="book.photoPath"
      :extra-text="inOrOut2[book.getOrSale]"
      :on-click="bookDetailClick.bind(this, book.id)"
      style="color:#57665e"
      :class="'item_' + inOrOut[book.getOrSale]"
    />
  </AtList>
</template>

<script>
import {AtList, AtListItem} from "taro-ui-vue";
import Taro from "@tarojs/taro";
const {inOrOut, inOrOut2} = require("../../data/map");
import "./BookList.scss";

export default {
  name: "BookList",
  props: {
    list: Array,
  },
  components: {
    AtList,
    AtListItem,
  },
  data() {
    return {
      inOrOut,
      inOrOut2,
    }
  },
  methods: {
    bookDetailClick(key) {
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
}
</script>

<style scoped>

</style>
