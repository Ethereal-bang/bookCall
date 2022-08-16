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
import {searchBook} from "../../api/indexApi";
import Taro from "@tarojs/taro";
import {AtList, AtListItem} from "taro-ui-vue";

export default {
  name: "searchRes",
  components: {
    AtList,
    AtListItem,
  },
  data() {
    return {
      bookList: [],
    }
  },
  methods: {
    bookDetailClick(key) {
      console.log(key)
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
  onLoad: (options) => {
    Taro.getStorage({
      key: "schoolIp",
      success: res => {
        searchBook(res.data, options.keyword)
          .then(res => {
            console.log(res)
            const list = res.data;
          }, err => {
            console.log(err)
          })
      }
    });
    // 获取页面参数——搜索词
  },
}
</script>

<style scoped>

</style>
