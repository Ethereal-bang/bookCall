<template>
  <view class="publish">
    <view>
      
      <view class="title">
        <image class="icon_x" src="./icon_x.png" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>发布目的</text>
        <image class="icon_g" src="./Group_64.png" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <AtTag class="tag">换出</AtTag>
      <AtTag class="tag">换入</AtTag>
    </view>

    <view>
      <view class="title">
        <image class="icon_x" src="./icon_x.png" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>书籍图片(封面必填)</text>
        <image class="icon_g" src="./Group_64.png" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
        </view>
      <view class="at-row">
        <view
          class="at-col at-col-3"
          style="width: 92px;
          height: 92px;
          border-radius: 12px 12px 12px 12px;
          opacity: 1;
          background: #F0F0F0;
          display: inline-block;"
        >
          <image src="./img.png"
            mode="aspectFit"
            style="height: 26px; display: inline"
          />
        </view>
        <view
          class="at-col at-col-3"
          style="width: 92px;
          height: 92px;
          border-radius: 12px 12px 12px 12px;
          opacity: 1;
          border: 1px solid #E6E6E6;
          display: inline-block;"
        >
          <view
            @tap="uploadPic"
            style="
            font-size: 50px;
            color: #CCCCCC;
            border-radius: 1px 1px 1px 1px;
            opacity: 1;
            margin-left: 30px;
            margin-top: 10px;"
          >
            +
          </view>
        </view>
      </view>
    </view>

    <view class="at-row title">
      <image class="inputicon icon_x" src="./icon_x.png" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
      
      <AtInput 
        class="at-col input title "
        type="text"
        placeholder="请填写书籍名称/扫一扫ISBN码"
        :value="inputName"
        @change="onInputNameChange"
      />
      <view class="at-col at-col-3 scan">
        <view class="at-row">
          <text>
            扫码
          </text>
          <image
            class="at-col scanicon"
            src="./scan.png"
            mode="aspectFit"
            style="height: 37rpx; display: inline"
          />

        </view>
      </view>

    </view>

    <view>
      <view class="title">
        
        <text class="jiyu">换书寄语</text>
        <image class="jiyug icon_g" src="./Group_64.png" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <AtTextarea
        :value="inputWords"
        :on-change="onInputWordsChange"
        placeholder="想说的话都可以留下来哦~~"
        :count="false"
        class="mesg"
      />
    </view>

    <view class="title">
      <image class="icon_x" src="./icon_x.png" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
      <text>标签选择</text>
      <image class="icon_g" src="./Group_64.png" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      <view class="at-row at-row__align-content--around">
        <AtAccordion
          title="书籍类别"
          :open="isGenreListOpen"
          :on-click="openGenreList"
        >
          <AtRadio
            :options="chooseGenre"
            :value="chosenGenre"
            :on-click="clickGenre"
          />
        </AtAccordion>
        <AtAccordion
          title="新旧程度"
          :open="isOldListOpen"
          :on-click="openOldList"
        >
          <AtRadio
            :options="chooseOld"
            :value="chosenOld"
            :on-click="clickOld"
          />
        </AtAccordion>
      </view>
    </view>

    <view>
      <view class="title">
        <image class="icon_x" src="./icon_x.png" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>预留联系方式</text>
        <image class="icon_g" src="./Group_64.png" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <text  class="title text1">请勾选并填写你期待的联系方式，方便他人联系你进行换书，至少一种！</text>
      <AtCheckbox
        :options="contactOptions"
        :selectedList="checkedContactList"
        :on-change="checkContact"
      />
      <text  class="title text1">下次发布书籍时，无需再次填写，可去“我的->联系方式“查看或修改~</text>
    </view>

    <AtButton
      type="primary"
      :on-click="post"
      class="button"
      
    >
      发布
    </AtButton>

  </view>
</template>

<script>
import {AtInput, AtTag, AtTextarea, AtAccordion, AtRadio, AtCheckbox, AtButton} from "taro-ui-vue";
import uploadPng from "../../assets/upload.png";
import Taro from "@tarojs/taro";
import './publish.scss'

export default {
  name: "Publish",
  components: {
    AtTag,
    uploadPng,
    AtInput,
    AtTextarea, // 多行文本框
    AtAccordion,  // 下拉菜单-手风琴
    AtRadio,  // 单选按钮
    AtCheckbox, // 多选框
    AtButton,
  },
  data() {
    return {
      picUrl: "./upload.png",
      inputName: "",
      inputWords: "",
      isGenreListOpen: false,
      chooseGenre: [
        {value: "novel", label: "小说"},
        {value: "literature", label: "文学"},
        {value: "internet", label: "互联网"},
        {value: "technology", label: "科技"},
        {value: "psychology", label: "心理学"},
        {value: "other", label: "其他"},
      ],
      chosenGenre: "",
      isOldListOpen: false,
      chooseOld: [
        {value: "6",label: "6成新",},
        {value: "7",label: "7成新",},
        {value: "8",label: "8成新",},
        {value: "9",label: "9成新",},
        {value: "10",label: "全新",},
        {value: "5",label: "5成新及以下",},
      ],
      chosenOld: "",
      contactOptions: [
        {label: "手机号", value: "phone",},
        {label: "微信号", value: "wx"},
      ],
      checkedContactList: [],
    }
  },
  methods: {
    uploadPic(e) {  // 上传本地图片
      Taro.chooseImage({
        count: 1, // 限定只上传一张
        success: (res) => {
          // console.log(res)
          this.picUrl = res.tempFilePaths;
        },
        fail: (res => {
          console.log(res)
        })
      })
    },
    onInputNameChange(val) {
      this.inputName = val;
    },
    onInputWordsChange(val) {
      this.inputWords = val;
    },
    openGenreList(val) {
      this.isGenreListOpen = val;
    },
    clickGenre(val) {
      this.chosenGenre = val;
      console.log(this.chosenGenre)
    },
    openOldList(val) {
      this.isOldListOpen = val;
    },
    clickOld(val) {
      this.chosenOld = val;
      console.log(this.chosenOld)
    },
    checkContact(val) {
      this.checkedContactList = val;
      console.log(this.checkedContactList)
    },
    post() {
      console.log("发布！")
    }
  }
}
</script>

<style>
</style>
