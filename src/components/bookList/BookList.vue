<template>
  <AtList
  >
    <AtListItem
      v-for="book in list"
      :key="book.id"
      :title="book.name"
      :note="book.words"
      :extra-text="book.states"
      :on-click="bookDetailClick.bind(this, book.id)"
      style="color:#57665e"
      :class="(book.states === '可换') ? 'item_out' : 'item_in'"
    />
  </AtList>
</template>

<script>
import {AtList, AtListItem} from "taro-ui-vue";
import Taro from "@tarojs/taro";
// const imgPaths = require("../../utils/base64");

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
    return {}
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
