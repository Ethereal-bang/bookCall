<template>
  <view class="person">
    <!--背景-->
    <image
      :src="personBG" mode="aspectFit"
    />
    <navigator url="/pages/personalHomepage/personalHomepage">
      我的主页
    </navigator>

    <view class="container">
      <AtAvatar circle image='http://photo.chaoxing.com/photo_80.jpg'></AtAvatar>
      <AtInput
        type="nickname" placeholder="请输入昵称"
        :value="name" :on-blur="onUsernameChange"
      />
      <!--换书宣言-->
      <AtTextarea
            placeholder="点击添加换书宣言，让换书更有吸引力~~~"
            :value="declaration === '' ? undefined : declaration"
            :on-change="(val) => this.declaration = val"
            :on-blur="onDeclareChange"
            :count="false"
          />

      <view class="bars">
        <navigator url="/pages/personalPublish/personalPublish" open-type="navigate">
          <view>
            <image />
            <view class="text">管理书籍</view>
          </view>
          <image />
        </navigator>
        <navigator url="/pages/changeRules/changeRules" open-type="navigate">
          <view>
            <image />
            <view class="text">换书规则</view>
          </view>
          <image />
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
import Taro from "@tarojs/taro";
import personBG from "../../assets/personBG.png";

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
      personBG,
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
    async onUsernameChange(val) { // bug:开发工具选择微信名不触发(真机预览触发
      await modifyUsername(val)
      await Taro.showToast({title: "修改成功"})
    },
    // blur后修改换书宣言
    async onDeclareChange() {
      await modifyDeclaration(this.declaration)
      await Taro.showToast({title: "修改成功"})
    }
  }
}
</script>

<style>
</style>
