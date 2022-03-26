<template>
  <view class="index_background">
    <view class="index">
      <!--校园认证-->
      <view >
        <image
          :src=imgPaths.location
          mode="aspectFit"
          style="height: 39rpx; width: 39rpx; display: inline-block ;padding-top:3rpx"
        />
        <view
          @tap="choseUniversity"
          style="display: inline-block"
        >
        {{ chosenUniversity }}
      </view>
      <view :style="showState" @tap="choseWitchUniversity">
        <view
          v-for="uni in university"
          :data-name="uni.name"
          :data-title="uni.title"
        >
          {{ uni.title }}
        </view>
      </view>
    </view>
    <!--搜索框-->
    <AtSearchBar
      input-type="text"
      placeholder="搜索书籍名称"
      :value="searchValue"
      :on-change="onChange.bind(this, 'searchValue')"
      :on-action-click="onActionClick"
    />
    <view class="at-row">
      <AtTag class="tag at-col" name="tag-1" type="primary" circle size="small">
        程序设计
      </AtTag>
      <AtTag class="tag at-col" name="tag-1" type="primary" circle size="small">
        高数
      </AtTag>
      <AtTag class="tag at-col" name="tag-1" type="primary" circle size="small">
        大学物理
      </AtTag>
      <AtTag class="tag at-col" name="tag-1" type="primary" circle size="small">
        科技
      </AtTag>
    </view>

    <!--轮播图-->
    <swiper
      indicator-color="#f0f2f5"
      indicator-active-color="#999999"
      current="current"
      :duration="duration"
      :interval="interval"
      :circular="isCircular"
      :autoplay="isAutoplay"
      :speed="3500"
      :indicator-dots="hasIndicatorDots"
    >
      <swiper-item
        v-for="(item, idx) in banners"
        :key="idx"
      >
        <navigator
          :url="item.navigatePath"
          open-type="navigate"
          style="height: 100%"
        >
          <image
            :src="item.imgPath"
            mode="aspectFit"
            style="height: 100%"
          />
        </navigator>
      </swiper-item>
    </swiper>
    <!--分类换书-->
    <view class="divide">
      <view class="at-row at-row__justify--between">
        <view class="at-col category titleText">
          分类换书
        </view>
        <view class="at-col category titleText">
          <navigator class="atAll"
                     url="/pages/bookList/bookList"
                     open-type="navigate"
          >
            &nbsp&nbsp全部书籍&nbsp◇&nbsp
          </navigator>
        </view>
      </view>
      <scroll-view
        class="scroll-tag"
        style="width: 100%"
        :scroll-x="true"
      >
        <view
          v-for="genre in tags"
          :key="genre.key"
          :name="genre.name"
          class="scroll-item"
          :dataset="genre.name"
          @tap="genreClick"
        >
          <view>
            <image
              :src=genre.src
              mode="aspectFit"
              style="height: 34px; width: 100%"
            />
            <text
              style="display: block; text-align: center"
            >{{ genre.title }}
            </text>
          </view>
        </view>
      </scroll-view>
    </view>
    <!--换书广场-->
    <view class="square">
      <view class="titleText">换书广场</view>
      <AtTabs
        :current="currentTab"
        :tab-list="tabList"
        :on-click="clickTab"
      >
        <AtTabsPane
          :current="currentTab"
          :index="0"
        >
          <AtList>
            <AtListItem
              v-for="book in bookList"
              :key="book.key"
              :title="book.title"
              :note="book.note"
              :extra-text="book.tag"
              :thumb="book.url"
              :on-click="bookDetailClick.bind(this, book.key)"
              style="color:#57665e"
              v-if="isChosenUniversity"
              
            />
            <AtListItem
              v-if="!isChosenUniversity"
              note="选择你所在的大学后，才能查看书籍动态以及发布书籍哦~（点击左上角立即选择）"
            />
          </AtList>
        </AtTabsPane>
        <AtTabsPane
          :current="currentTab"
          :index="1"
        >
          <view class="tab-content">Tab2</view>
        </AtTabsPane>
        <AtTabsPane
          :current="currentTab"
          :index="3"
        >
          <view class="tab-content">Tab3</view>
        </AtTabsPane>
      </AtTabs>
    </view>
  </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import {AtNavBar, AtTabBar, AtSearchBar, AtTabs, AtTabsPane, AtList, AtListItem, AtGrid, AtTag} from 'taro-ui-vue'
import './index.scss'

const imgPaths = require("../../utils/base64");

export default {
  components: {
    AtNavBar,
    AtTabBar,
    AtSearchBar,
    AtTabs,
    AtTag,
    AtTabsPane,
    AtList,
    AtListItem,
    AtGrid,
  },
  data() {
    return {
      searchValue: '',
      current: 1,
      interval: 2000,// 切换事件
      duration: 500,
      isCircular: true,// 衔接滑动
      isAutoplay: true,
      hasIndicatorDots: true,
      banners: [
        {imgPath: imgPaths.banner1, navigatePath: "/pages/index/index"},
        {imgPath: imgPaths.banner2, navigatePath: "/pages/changeRules/changeRules"},
      ],

      currentTab: 0,
      tabList: [
        {title: '推荐'},
        {title: '等你换'},
        {title: 'Ta想要'}
      ],

      bookList: [
        {key: 1, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "可换"},
        {key: 2, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "可换"},
        {key: 3, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "求换"},
      ],
      /*分类换书*/
      tags: [
        {key: 1, name: "novel", title: "小说", src: imgPaths.genre1},
        {key: 2, name: "literature", title: "文学", src: imgPaths.genre2},
        {key: 3, name: "internet", title: "互联网", src: imgPaths.genre3},
        {key: 4, name: "technology", title: "科技", src: imgPaths.genre4},
        {key: 5, name: "psychology", title: "心理学", src: imgPaths.genre5},
        {key: 6, name: "teaching", title: "教材教辅", src: imgPaths.genre6},
        {key: 7, name: "other", title: "其他", src: imgPaths.genre7},
      ],
      /*校园认证：*/
      showState: "display:none",
      isChosenUniversity: false,
      university: [
        {title: "重庆邮电大学", name: "cy"},
        {title: "重庆工商大学", name: "gs"},
        {title: "重庆交大学", name: "cj"},
      ],
      chosenUniversity: "我的大学",
      imgPaths,
    }
  },
  methods: {
    onChange(stateName, value) {
      this[stateName] = value;
    },
    onActionClick() {
      console.log("点击：搜索")
    },
    clickTab(value) {
      this.currentTab = value
    },
    genreClick(e) {
      const genre = e.target.dataset
      console.log(genre)
      wx.navigateTo({
        url: `../../pages/bookGenreList/bookGenreList?tag=${genre}`,
      })
    },
    bookDetailClick(key) {
      console.log(key)
      wx.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
    choseUniversity() {
      if (this.showState === "")
        this.showState = "display:none";
      else
        this.showState = "";
    },
    choseWitchUniversity(e) {
      console.log(e.target.dataset);  // 获得选择的学校代号
      this.showState = "display:none";  // 选后关闭下拉单
      this.isChosenUniversity = true; // 换书广场显示
      this.chosenUniversity = e.target.dataset.title; // 下拉单显示
    }
  },
}
</script>
<style>
.scroll-tag {
  white-space: nowrap;
}

.scroll-item {
  display: inline-block;
  width: 20%;
}

.tab-content {
  height: 10vh;
  color: #a99b85;
}
</style>
