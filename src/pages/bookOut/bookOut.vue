<template>
  <view>
    <form
      @submit="formSubmit"
    >
      <Book-change />
      <view>
        换书寄语
      </view>
      <view>
        你想对此书的下个主任说些什么呢~哪怕是自己的小感悟、书中的某句话……留下基于，让换书更有人情味吧~
      </view>
      <AtInput
        placeholder="填写寄语"
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
    </form>
  </view>
</template>

<script>
import BookChange from "../../components/BookChange";
import {AtInput} from "taro-ui-vue";

export default {
  name: "BookOut",
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
      // 怎么拿到子组件表单数据:
      console.log(this.inputValue, this.type, this.old, this.inputWords)
    },
  }
}
</script>

<style scoped>

</style>
