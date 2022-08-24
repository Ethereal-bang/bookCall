<template>
  <view class="publish">
    <!--发布目的-->
    <view>
      <view class="title">
        <image class="icon_x" style=" width: 17rpx; height: 17rpx; display: inline-block"/>
        <text>发布目的</text>
        <image class="icon_g" style=" width: 30rpx; height: 30rpx; display: inline-block"/>
      </view>
      <view
        @tap="choosePurpose"
      >
        <AtTag class="tag" id="out" data-purpose="out" :style="outBGC">换出</AtTag>
        <AtTag class="tag" id="in" data-purpose="in" :style="inBGC">换入</AtTag>
      </view>
    </view>

    <!--ISBN-->
    <view class="at-row title">
<!--      <image class="inputicon icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>-->

      <AtInput
        class="at-col input title "
        type="number"
        :border="false"
        placeholder="请填写/扫一扫ISBN码"
        :value="inputISBN"
        :on-change="(val) => this.inputISBN = val"
      />
      <view class="at-col at-col-3 scan">
        <view class="at-row">
          <text>
            扫码
          </text>
<!--          <image-->
<!--            class="at-col scanicon"-->
<!--            src="./scan.png"-->
<!--            mode="aspectFit"-->
<!--            style="height: 37rpx; display: inline"-->
<!--          />-->
        </view>
      </view>

    </view>

    <!--换书寄语-->
    <view>
      <view class="title">
        <text class="jiyu">换书寄语</text>
<!--        <image class="jiyug icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>-->
      </view>
      <AtTextarea
        :value="inputWords"
        :on-change="(val) => this.inputWords = val"
        placeholder="想说的话都可以留下来哦~~"
        :count="false"
        class="mesg"
      />
    </view>

    <!--标签选择-->
    <view class="title">
<!--      <image class="icon_x" :src=picUrls.icon_x style=" width: 17rpx; height: 17rpx; display: inline-block"/>-->
      <text>标签选择</text>
<!--      <image class="icon_g" :src=picUrls.purpose style=" width: 30rpx; height: 30rpx; display: inline-block"/>-->
      <view class="at-row at-row__justify--center">
        <AtAccordion
          class="at-col-4"
          style="margin-left: -20px"
          :title="genreTitle"
          :open="isGenreListOpen"
          :on-click="(val) => this.isGenreListOpen = val"
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
          :on-click="(val) => this.isOldListOpen = val"
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
      content="可去 '我的->管理书籍' 里面查看和管理书籍"
      confirm-text="继续发布"
      :on-confirm="continuePost"
      cancel-text="查看详情"
      :on-cancel="toDetail"
    />
  </view>
</template>

<script>
import {AtInput, AtTag, AtTextarea, AtAccordion, AtRadio, AtButton, AtToast, AtModal} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import './publish.scss'
import {genreMap, inOldDegree, inOldDegree2, oldDegreeMap} from "../../data/map";
import {addBook} from "../../api/bookApi";

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
const outOld = ["6", "7", "8", "9", "10", "5"];
const inOld = ["new", "almostNew", "any"]

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
      inputISBN: "",   // 书籍名称/isbn
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
      purpose: "",  // 发布目的
      outBGC: "background-color: #F5F5F5",
      inBGC: "background-color: #F5F5F5",
      isToastOpen: false,
      isModalOpen: false,
      bookId: "", // 刚发布书籍的id
    }
  },
  methods: {
    choosePurpose(e) {
      // 设置目的
      this.purpose = e.target.dataset.purpose;  // 0为收1为售
      // 点击节点变色
      this.outBGC = "background-color: " + ((this.purpose === "out") ? "#FFCA4E" : "#F5F5F5");
      this.inBGC = "background-color: " + ((this.purpose === "in") ? "#FFCA4E" : "#F5F5F5");
      // 根据所选目的切换新旧程度选项
      this.chooseOld = (this.purpose === "out")
        ? outOld.map(val => {
          return {label: oldDegreeMap[val], value: val}
        })
        : inOld.map(val => {
          return {label: inOldDegree2[val], value: val}
        });
    },
    clickGenre(val) {
      this.isGenreListOpen = false;  // 关闭菜单
      this.genreTitle = labelMap[val];  // 更新标题为所选项
      this.chosenGenre = val;
    },
    clickOld(val) {
      this.isOldListOpen = false;
      this.oldTitle = labelMap[val];
      this.chosenOld = val;
    },
    post() {
      const info = {
        purpose: undefined,
        isbn: this.inputISBN,
        words: this.inputWords,
        genre: genreMap[this.chosenGenre],  // 种类代号
        old: this.purpose === "out" ? this.chosenOld : inOldDegree[this.chosenOld], // 新旧程度代号
      }
      if (this.purpose === "out") {
        info.purpose = '1';
      } else if (this.purpose === "in") {
        info.purpose = '0';
      }
      // 有信息没填
      for (let key in info) {
        if (info[key] === undefined || info[key].length < 1) {
          this.isToastOpen = true;  // Bug:二次触发时不能正常显示!
          return;
        }
      }
      // 成功提交
      addBook(info.isbn, info.purpose, info.genre, info.words, info.old)
        .then(res => {
          if (res.data === "faied") { // 添加失败
          } else {
            this.bookId = res.data;   // 更新bookId
            this.isModalOpen = true;  // 打开模态框
          }
        }, err => {
          console.log(err)
        })
      this.isToastOpen = false;
    },
    continuePost() {
      this.isModalOpen = false;
      // 表单项重置
      this.purpose = "";
      this.inputISBN = "";
      this.inputWords = "";
      this.chosenGenre = "";
      this.chosenOld = "";
    },
    toDetail() {
      this.isModalOpen = false;
      Taro.navigateTo({
        url: `/pages/bookDetail/bookDetail?key=` + this.bookId,
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
