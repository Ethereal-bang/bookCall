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
      <AtInput
        type="nickname" placeholder="请输入昵称"
        :value="name" :on-blur="onUsernameChange"
      />
      <navigator url="/pages/personalHomepage/personalHomepage">
        我的主页
      </navigator>

      <AtTextarea
            placeholder="点击添加换书宣言，让换书更有吸引力~~~"
            :value="declaration"
            :on-change="(val) => this.declaration = val"
            :on-blur="onDeclareChange"
            :count="false"
            class="mesg"
          />

      <view id="mine">
        <navigator url="/pages/personalPublish/personalPublish" open-type="navigate">
          <!--          <image class="img1 img" src="./info_publish.png" style="height: 30px; width: 30px; display: inline-block" />-->
          <view class="text">管理书籍</view>
          <!--          <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />-->
        </navigator>
        <navigator url="/pages/changeRules/changeRules" open-type="navigate">
          <!--          <image class="img3 img" src="./info_rule.png" style="height: 30px; width: 30px; display: inline-block" />-->
          <view class="text">交换规则</view>
          <!--          <image class="right" src="./right.png" style="height: 12px; width: 5px; display: inline-block" />-->
        </navigator>
      </view>
    </view>

    <AtDivider  class="welcome" content="欢迎来到书唤~" fontColor='#bdbdbd' fontSize='22' />
  </view>
</template>

<script>
import { AtAvatar, AtTextarea, AtDivider, AtInput } from "taro-ui-vue";
import './person.scss'
import {getUserInfo, modifyDeclaration, modifyUsername} from "../../api/personApi";

export default {
  name: "Person",
  components: {
    AtAvatar,
    AtTextarea, // 多行文本框
    AtDivider,  // 分割线
    AtInput,
  },
  data() {
    return {
      name: "Loading",
      declaration: "点击添加换书宣言，让换书更有吸引力",
      avatar: "",
    }
  },
  onLoad() {
    // ...获取昵称
    getUserInfo().then(res => {
      const info = res.data[0];
      this.name = info.name;
      this.avatar = info.avatar;
      this.declaration = info.declaration;
    })
  },
  methods: {
    onUsernameChange(val) { // bug:开发工具选择微信名不触发(真机预览触发
      modifyUsername(val)
    },
    // blur后修改换书宣言
    onDeclareChange() {
      modifyDeclaration(this.declaration)
    }
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
