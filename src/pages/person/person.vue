<template>
  <view>
    <view id="no_sign">
      <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
      <view>未登录（点击登录）</view>
      <view>
        <view>交换规则 ></view>
        <view>意见反馈 ></view>
      </view>
      <view>登录后才能查看更多内容哦~</view>
    </view>
    <view id="have_sign">
      <view>
        <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
        <view>用户名 ></view>
        <view>点击添加换书宣言，让换书更有吸引力</view>
      </view>
<!--      <Personal-data />-->
      <Personal-books />
    </view>
  </view>
</template>

<script>
import { AtAvatar } from "taro-ui-vue";
import PersonalData from "../../components/PersonalData.vue";
import PersonalBooks from "../../components/PersonalBook.vue";

export default {
  name: "Person",
  components: {
    AtAvatar,
    PersonalData,
    PersonalBooks,
  }
}
</script>

<style>
  #have_sign {

  }
  #no_sign {
    display: none;
  }
</style>
