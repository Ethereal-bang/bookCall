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
        <image
          src="./personBG.png"
          style="width: 100%;height: 190px"
        />
        <view>
          <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
          <view>用户名</view>

          <AtTextarea
            placeholder="点击添加换书宣言，让换书更有吸引力~~~"
            :value="inputWords"
            :on-change="onInputWordsChange"
            :count="false"
          />

          <view>
            <view @tap="toPublish">
              <image src="https://jdc.jd.com/img/200" style="height: 30px; width: 30px; display: inline-block" />
              <text>我的发布</text>
              <text> > </text>
            </view>
            <view @tap="toContact">
              <image src="https://jdc.jd.com/img/200" style="height: 30px; width: 30px; display: inline-block" />
              <text>联系方式</text>
              <text> > </text>
            </view>
            <view @tap="toRules">
              <image src="https://jdc.jd.com/img/200" style="height: 30px; width: 30px; display: inline-block" />
              <text>换书规则</text>
              <text> > </text>
            </view>
          </view>
        </view>
      </view>
    </view>

    <AtDivider content="欢迎来到书唤~" />
  </view>
</template>

<script>
import { AtAvatar, AtTextarea, AtDivider } from "taro-ui-vue";
import Taro from "@tarojs/taro";

export default {
  name: "Person",
  components: {
    AtAvatar,
    AtTextarea, // 多行文本框
    AtDivider,  // 分割线
  },
  data() {
    return {
      inputWords: "",
    }
  },
  methods: {
    onInputWordsChange(val) {
      this.inputWords = val;
    },
    toPublish() { // 跳转到“我的发布”
      Taro.navigateTo({
        url: "/pages/personalPublish/personalPublish",
      })
    },
    toContact() { // 打开联系方式
      Taro.navigateTo({
        url: "/pages/personalContact/personalContact",
      })},
    toRules() { // 打开交换规则
      Taro.navigateTo({
        url: "/pages/changeRules/changeRules",
      })},
  }
}
</script>

<style>
  #have_sign {

  }
  #no_sign {
    display: none;  /*暂定已登录*/
  }
</style>
