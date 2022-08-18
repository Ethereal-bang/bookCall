<template>
  <view class="publish">
    <!--发布目的-->
    <view>
      <view class="title">
        <image class="icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>发布目的</text>
        <image class="icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <view
        @tap="choosePurpose"
      >
        <AtTag class="tag" id="out" data-purpose="out" :style="outBGC">换出</AtTag>
        <AtTag class="tag" id="in" data-purpose="in" :style="inBGC">换入</AtTag>
      </view>
    </view>

    <!--书籍图片-->
    <view>
      <view class="title">
        <image class="icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>书籍图片(封面必填)</text>
        <image class="icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>
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
          <image :src=upload_img
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

    <!--书籍名称/ISBN-->
    <view class="at-row title">
      <image class="inputicon icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>

      <AtInput
        class="at-col input title "
        type="text"
        :border="false"
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
        <image class="jiyug icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>
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
      <image class="icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>
      <text>标签选择</text>
      <image class="icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      <view class="at-row at-row__justify--center">
        <AtAccordion
          class="at-col-4"
          style="margin-left: -20px"
          :title="genreTitle"
          :open="isGenreListOpen"
          :on-click="openGenreList"
          :hasBorder="false"
        >
          <AtRadio
            :options="chooseGenre"
            :value="chosenGenre"
            :on-click="clickGenre"
          />
        </AtAccordion>
        <AtAccordion
          class="at-col-4"
          style="margin-left: 20px"
          :title="oldTitle"
          :open="isOldListOpen"
          :on-click="openOldList"
          :hasBorder="false"
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
        <image class="icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>预留联系方式</text>
        <image class="icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <text class="title text1">请选择并填写你的一种联系方式，方便他人联系你进行换书</text>
      <AtRadio
      class="choise"
        :options="contactOptions"
        :value="contactValue"
        :on-click="chooseContact"
      />
      <AtInput
      class="number"
        type="number"
        placeholder="留下你的联系方式~"
        :value="inputContact"
        :on-change="onInputContactChange"
      />
      <text class="title text1">下次发布书籍时，无需再次填写，可去“我的->联系方式“查看或修改~</text>
    </view>

    <AtButton
      type="primary"
      :on-click="post"
      class="button"
    >
      发布
    </AtButton>
    <AtToast :isOpened="isToastOpen" text="请填完所有必选项" />
    <AtModal
      :is-opened="isModalOpen"
      title="发布成功"
      content="发布的书籍可以在 '我的->个人发布' 里面找到哦"
      confirm-text="确认"
      :on-confirm="onModalConfirm"
    />
  </view>
</template>

<script>
import {AtInput, AtTag, AtTextarea, AtAccordion, AtRadio, AtButton, AtToast, AtModal} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import './publish.scss'
const picUrls = require("../../utils/base64");

const labelMap = {  // 通过映射关系将所选label渲染到标题
  novel: "小说",
  literature: "文学",
  internet: "互联网",
  technology: "科技",
  psychology: "心理学",
  other: "其他",
  6: "6成新",
  7: "7成新",
  8: "8成新",
  9: "9成新",
  10: "全新",
  5: "5成新及以下",
  new: "全新",
  almostNew: "较新",
  any: "无所谓",
}
const outOld = [
  {value: "6", label: "6成新",},
  {value: "7", label: "7成新",},
  {value: "8", label: "8成新",},
  {value: "9", label: "9成新",},
  {value: "10", label: "全新",},
  {value: "5", label: "5成新及以下",},
];
const inOld = [
  {value: "new", label: "全新",},
  {value: "almostNew", label: "较新",},
  {value: "any", label: "无所谓",},
];

export default {
  name: "Publish",
  components: {
    AtTag,
    AtInput,
    AtTextarea, // 多行文本框
    AtAccordion,  // 下拉菜单-手风琴
    AtRadio,  // 单选按钮
    AtButton,
    AtToast,  // 轻提示
    AtModal,  // 模态框
  },
  data() {
    return {
      picUrls,
      upload_img: picUrls.upload,
      inputName: "",   // 书籍名称/isbn
      inputWords: "", // 寄语
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
      genreTitle: "书籍类别",
      isOldListOpen: false,
      chooseOld: outOld,
      chosenOld: "",
      oldTitle: "新旧程度",
      contactOptions: [
        {label: "手机号", value: "phone",},
        {label: "微信号", value: "wx"},
      ],
      contactValue: "",
      inputContact: "",
      purpose: "",  // 发布目的
      outBGC: "background-color: #F5F5F5",
      inBGC: "background-color: #F5F5F5",
      isToastOpen: false,
      isModalOpen: false,
    }
  },
  methods: {
    uploadPic(e) {  // 上传本地图片
      Taro.chooseImage({
        count: 1, // 限定只上传一张
        success: (res) => {
          console.log(res)
          this.upload_img = res.tempFilePaths;
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
      this.openGenreList(false);  // 关闭菜单
      this.genreTitle = labelMap[val];  // 更新标题为所选项
      this.chosenGenre = val;
      console.log(this.chosenGenre)
    },
    openOldList(val) {
      this.isOldListOpen = val;
    },
    clickOld(val) {
      this.openOldList(false);
      this.oldTitle = labelMap[val];
      this.chosenOld = val;
      console.log(this.chosenOld)
    },
    chooseContact(val) {
      this.contactValue = val;
      console.log(this.contactValue)
    },
    onInputContactChange(val) {
      this.inputContact = val;
    },
    post() {
      const info = {
        purpose: this.purpose,
        img: this.upload_img, // 路径是本地！要修改
        bookName: this.inputName,
        words: this.inputWords,
        genre: this.chosenGenre,
        old: this.chosenOld,
        contact: this.inputContact,
      }
      // 提交失败
      if (!info.contact) {
        this.isToastOpen = true;
        return;
      }
      // 成功提交
      console.log(info)
      this.isToastOpen = false;
      this.isModalOpen = true;  // 打开模态框
    },
    choosePurpose(e) {
      // 设置目的
      this.purpose = e.target.dataset.purpose === "out" ? 1 : 0;  // 0为收1为售
      // 点击节点变色
      this.outBGC = "background-color: " + ((this.purpose === "out") ? "#FFCA4E" : "#F5F5F5");
      this.inBGC = "background-color: " + ((this.purpose === "in") ? "#FFCA4E" : "#F5F5F5");
      this.chooseOld = (this.purpose === "out") ? outOld : inOld; // 根据所选目的切换表单选项
    },
    onModalConfirm() {
      Taro.switchTab({
        url: `../../pages/index/index`,
      })
    }
  }
}
</script>

<style>
.at-accordion__content {
  position: absolute;
  z-index: 2; /*让其显示在后文的上方*/
  width: 30%;
}
.at-modal__content {
  min-height: 10rpx;
}
</style>
