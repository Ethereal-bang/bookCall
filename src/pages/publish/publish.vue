<template>
  <view class="publish">
    <!--发布目的-->
    <view>
      <view class="title">
        <view class="sprite sprite-publish_highlight" />
        <text>发布目的</text>
      </view>
      <view
        @tap="choosePurpose"
      >
        <AtTag data-purpose="1" :style="this.outBGC">换出</AtTag>
        <AtTag data-purpose="0" :style="this.inBGC">换入</AtTag>
      </view>
    </view>

    <!--新旧程度-->
    <view class="old">
      <view class="title">
        <view class="sprite sprite-publish_highlight" />
        <text>新旧程度</text>
      </view>
      <view @tap="clickOld">
        <view>
          <AtTag
            v-for="degree in (purpose === '0' ? degreeList.slice(0, 3) : degreeList.slice(3))"
            :key="degree.code"
            :data-degree="degree.code"
            :style="degree.isSelected ? SELECTED_BGC : BLANK_BGC"
          >
            {{ oldDegreeMap[degree.code] }}
          </AtTag>
        </view>
      </view>
    </view>

    <!--书籍类别-->
    <view>
      <view class="title">
        <view class="sprite sprite-publish_highlight" />
        <text>书籍类别</text>
      </view>
      <view @tap="clickGenre">
        <view>
          <AtTag
            v-for="genre in genreList"
            :key="genre.code"
            :data-genre="genre.code"
            :style="genre.isSelected ? SELECTED_BGC : BLANK_BGC"
          >
            {{ genreMap3[genre.code] }}
          </AtTag>
        </view>
      </view>
    </view>

    <!--书籍信息-ISBN-->
    <view class="isbn">
      <view class="title">
        <view class="sprite sprite-publish_highlight" />
        <text>书籍信息</text>
      </view>
      <view>选择扫码或输入ISBN码，快速完善书籍信息</view>
      <view>
        <AtButton>直接扫码</AtButton>
        <AtButton
          :on-click="() => this.isISBNModalOpen = true"
        >
          手动输入ISBN码
        </AtButton>
        <AtModal
          :is-opened="isISBNModalOpen"
        >
          <AtModalHeader>手动输入</AtModalHeader>
          <AtModalContent>
            <view>请输入ISBN条码</view>
            <!--这里插入ISBN图片-->
            <image mode="aspectFit" :src="isbnImg" />
            <AtInput
              :border="false"
              placeholder="在这输入..."
              :value="inputISBN"
              :on-change="(val) => this.inputISBN = val"
            />
          </AtModalContent>
          <AtModalAction>
            <AtButton :on-click="() => this.isISBNModalOpen = false">确定</AtButton>
          </AtModalAction>
        </AtModal>
      </view>
      </view>

    <!--换书寄语-->
    <view class="words">
      <view class="title">
        <view class="sprite sprite-publish_highlight" />
        <text>换书寄语</text>
      </view>
      <AtTextarea
        :value="inputWords"
        :on-change="(val) => this.inputWords = val"
        placeholder="想说的话都可以留下来哦~~"
        :count="false"
      />
    </view>

    <AtButton
      type="primary"
      :on-click="post"
      class="button"
    >
      发布
    </AtButton>
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
import {AtInput, AtTag, AtTextarea, AtAccordion, AtRadio, AtButton, AtToast,
  AtModal, AtModalContent, AtModalHeader, AtModalAction} from "taro-ui-vue";
import Taro from "@tarojs/taro";
import './publish.scss'
import {oldDegreeMap, genreMap3} from "../../data/map";
import {addBook} from "../../api/bookApi";
import isbnImg from "../../assets/isbn.png";

const SELECTED_BGC = "background-color: #FFCA4E",
  BLANK_BGC = "background-color: #F5F5F5";

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
    AtModalContent,
    AtModalHeader,
    AtModalAction,
  },
  data() {
    return {
      // 选中/未选中 tag的BGC
      SELECTED_BGC,
      BLANK_BGC,
      // 发布目的
      purpose: "",  // 发布目的 0换入/1换出
      outBGC: this.BLANK_BGC,
      inBGC: this.BLANK_BGC,
      // 新旧程度
      degreeList: [],
      oldDegreeMap,
      chosenOld: "",  // 新旧程度数字代号
      // 书籍类别
      genreList: [],
      genreMap3,
      chosenGenre: "",
      // 书籍信息
      inputISBN: "",
      isISBNModalOpen: false,
      isbnImg,
      // 换书寄语
      inputWords: "", // 寄语
      // 跳转用
      isModalOpen: false,
      bookId: "", // 刚发布书籍的id
    }
  },
  onLoad() {
    this.resetOldList();
    this.resetGenreList();
  },
  methods: {
    choosePurpose(e) {
      // 设置目的
      this.purpose = e.target.dataset.purpose;  // 0为收1为售
      // 点击节点变色
      this.outBGC = (this.purpose === "1") ? SELECTED_BGC : BLANK_BGC;
      this.inBGC = (this.purpose === "0") ? SELECTED_BGC : BLANK_BGC;
    },
    resetOldList() {  // 重置
      const degreeList = [];
      for (let i = 2; i <= 10; i++) {
        degreeList.push({
          code: i,
          isSelected: false,
        })
      }
      this.degreeList = degreeList;
    },
    clickOld(e) {
      const degreeCode = e.target.dataset.degree;
      this.resetOldList();  // 重置被选中项
      this.degreeList[degreeCode - 2].isSelected = true;
      this.chosenOld = degreeCode;

    },
    resetGenreList() {
      const list = [];
      for (let g of Object.keys(genreMap3)) {
        list.push({
          code: g,
          isSelected: false,
        })
      }
      this.genreList = list;
    },
    clickGenre(e) {
      const genreCode = e.target.dataset.genre;
      this.resetGenreList();
      this.genreList[genreCode].isSelected = true;
      this.chosenGenre = genreCode;
    },
    post() {
      const info = {
        purpose: this.purpose,
        isbn: this.inputISBN,
        words: this.inputWords,
        genre: this.chosenGenre,  // 种类代号
        old: this.chosenOld, // 新旧程度代号
      }
      // 有信息没填
      for (let key in info) {
        if (info[key] === undefined || info[key].length < 1) {
          Taro.showToast({
            title: "请填完所有必填项",
            icon: "none",
          })
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
    },
    continuePost() {
      this.isModalOpen = false;
      // UI重置
      this.outBGC = BLANK_BGC;
      this.inBGC = BLANK_BGC;
      this.resetOldList();
      this.resetGenreList();
      // 表单项重置
      this.chosenOld = "";
      this.chosenGenre = "";
      this.inputISBN = "";
      this.inputWords = "";
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
.at-modal__content {
  min-height: 10rpx;
}
</style>
