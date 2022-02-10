<template>
  <view>
    <BookChange />
    <view>
      换书寄语
    </view>
    <view>
      你想对此书的下个主任说些什么呢~哪怕是自己的小感悟、书中的某句话……留下基于，让换书更有人情味吧~
    </view>
    <AtInput
      placeholder="换入愿望"
      :value="inputWords"
      :on-change="onInputWordsChange.bind(this, 'inputWords')"
    />
    <button
      type="primary"
      plain="true"
      formType="submit"
    >
      发布
    </button>
  </view>
</template>

<script>
import BookChange from "../../components/BookChange";
import { AtInput } from "taro-ui-vue";

export default {
  name: "BookIn",
  components: {
    BookChange,
    AtInput,
  },
  data() {
    return {
      inputWords: "",
    }
  },
  methods: {
    onInputWordsChange(stateName, value) {
      this[stateName] = value;
      console.log(this[stateName])
    },
    formSubmit(e) {
      console.log("submit: ");
      // 表单数据:
      console.log(this.inputValue, this.type, this.old, this.inputWords)
    },
  },
}
</script>

<style scoped>

</style>
