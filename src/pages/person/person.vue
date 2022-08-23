<template>
  <view class="personpage">
    <!--未登录页-->
    <view id="no_sign" class="signpage">
      <AtAvatar circle image='https://jdc.jd.com/img/200'></AtAvatar>
      <view>未登录（点击登录）</view>
      <view>
        <view>交换规则 ></view>
        <view>意见反馈 ></view>
      </view>
      <view>登录后才能查看更多内容哦~</view>
    </view>

    <!--背景-->
<!--    <image-->
<!--          src="./personBG.png"-->
<!--          style="width: 100%;height: 190px"-->
<!--    />-->

    <!--登录页-->
    <view id="have_sign" class="signpage">
      <AtAvatar class="head" circle image='http://photo.chaoxing.com/photo_80.jpg'></AtAvatar>
      <input
        :value="username" placeholder="请输入昵称"
        type="nickname" @change="onUsernameChange" />
      <navigator url="/pages/personalHomepage/personalHomepage">
        我的主页
      </navigator>

      <AtTextarea
            placeholder="点击添加换书宣言，让换书更有吸引力~~~"
            :value="inputWords"
            :on-change="(val) => this.inputWords = val"
            :count="false"
            class="mesg"
          />

      <view id="mine">
        <navigator url="/pages/personalPublish/personalPublish" open-type="navigate">
          <!--          <image class="img1 img" src="./info_publish.png" style="height: 30px; width: 30px; display: inline-block" />-->
          <text class="text">管理书籍</text>
          <!--          <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />-->
        </navigator>
        <navigator url="/pages/changeRules/changeRules" open-type="navigate">
          <!--          <image class="img3 img" src="./info_rule.png" style="height: 30px; width: 30px; display: inline-block" />-->
          <text class="text">交换规则</text>
          <!--          <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />-->
        </navigator>
      </view>
    </view>

    <AtDivider  class="welcome" content="欢迎来到书唤~" fontColor='#bdbdbd' fontSize='22' />
  </view>
</template>

<script>
import { AtAvatar, AtTextarea, AtDivider } from "taro-ui-vue";
import Taro from "@tarojs/taro";
import './person.scss'
import {modifyUsername} from "../../api/personApi";

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
      username: "",
    }
  },
  onLoad() {
    // ...获取昵称

  },
  methods: {
    onUsernameChange(val) { // bug:开发工具不触发; ...防抖
      this.username = val;
      modifyUsername(this.username)
    },
  }
}
</script>

<style>
  #have_sign {
  }
  #no_sign {
    display: none;  /*暂定未登录*/

  }
</style>
