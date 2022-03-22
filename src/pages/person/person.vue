<template>
  <view class="personpage">
    <view id="no_sign" class="signpage">
      <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
      <view>未登录（点击登录）</view>
      <view>
        <view>交换规则 ></view>
        <view>意见反馈 ></view>
      </view>
      <view>登录后才能查看更多内容哦~</view>
    </view>
<image
          src="./personBG.png"
          style="width: 100%;height: 190px"
        />
    <view id="have_sign" class="signpage">
      <view>
        
        <view>
          <AtAvatar class="head" circle image='https://jdc.jd.com/img/200'></AtAvatar>
          <view class="username">用户名<image class="change" src="./change.png" style="height: 24rpx; width: 24rpx;  display: inline-block" /></view>
          
          <AtTextarea
            placeholder="点击添加换书宣言，让换书更有吸引力~~~"
            :value="inputWords"
            :on-change="onInputWordsChange"
            :count="false"
            class="mesg"
          />

          <view id="mine">
            <view @tap="toPublish">
              <image class="img1 img" src="./info_publish.png" style="height: 30px; width: 30px; display: inline-block" />
              <text class="text">我的发布</text>
              <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />
            </view>
            <view @tap="toContact">
              <image class="img2 img" src="./info_contact.png" style="height: 30px; width: 30px; display: inline-block" />
              <text class="text">联系方式</text>
              <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />
            </view>
            <view @tap="toRules">
              <image class="img3 img" src="./info_rule.png" style="height: 30px; width: 30px; display: inline-block" />
              <text class="text">换书规则</text>
              <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />
            </view>
          </view>
        </view>
      </view>
    </view>

    <AtDivider  class="welcome" content="欢迎来到书唤~" fontColor='#bdbdbd' fontSize='22' />
  </view>
</template>

<script>
import { AtAvatar, AtTextarea, AtDivider } from "taro-ui-vue";
import Taro from "@tarojs/taro";
import './person.scss'

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
