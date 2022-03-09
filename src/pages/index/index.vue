<template>
  <view class="index_background">
    <view class="index">
      <!--校园认证-->
      <view>
        <view
          @tap="choseUniversity"
        >
          我的大学
        </view>
        <view :style="showState" @tap="choseWitchUniversity">
          <view
            v-for="uni in university"
            :data-name="uni.name"
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
        <AtTag class="at-col" name="tag-1" type="primary" circle size="small">
          程序设计
        </AtTag>
        <AtTag class="at-col" name="tag-1" type="primary" circle size="small">
          高数
        </AtTag>
        <AtTag class="at-col" name="tag-1" type="primary" circle size="small">
          大学物理
        </AtTag>
        <AtTag class="at-col" name="tag-1" type="primary" circle size="small">
          科技
        </AtTag>
      </view>

      <!--轮播图-->
      <swiper
        indicator-color="#999"
        indicator-active-color="#333"
        current="current"
        :duration="duration"
        :interval="interval"
        :circular="isCircular"
        :autoplay="isAutoplay"
        :indicator-dots="hasIndicatorDots"
      >
        <swiper-item
          v-for="(item, idx) in imgUrls"
          :key="idx"
        >
          <image
            :src="item"
            class="slide-image"
          />
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
              全部书籍◇
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
            {{ genre.title }}
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
                :thunb="book.url"
                :on-click="bookDetailClick.bind(this, book.key)"
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
import {AtNavBar, AtSearchBar, AtTabs, AtTabsPane, AtList, AtListItem, AtGrid, AtTag} from 'taro-ui-vue'
import './index.scss'

export default {
  components: {
    AtNavBar,
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
      imgUrls: [
        'https://img10.360buyimg.com/babel/s700x360_jfs/t25855/203/725883724/96703/5a598a0f/5b7a22e1Nfd6ba344.jpg!q90!cc_350x180',
        'https://img11.360buyimg.com/babel/s700x360_jfs/t1/4776/39/2280/143162/5b9642a5E83bcda10/d93064343eb12276.jpg!q90!cc_350x180',
        'https://img14.360buyimg.com/babel/s700x360_jfs/t1/4099/12/2578/101668/5b971b4bE65ae279d/89dd1764797acfd9.jpg!q90!cc_350x180',
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

      tags: [
        {key: 1, name: "novel", title: "小说"},
        {key: 2, name: "literature", title: "文学"},
        {key: 3, name: "internet", title: "互联网"},
        {key: 4, name: "technology", title: "科技"},
        {key: 5, name: "psychology", title: "心理学"},
        {key: 6, name: "other", title: "其他"},
      ],
      /*校园认证：*/
      showState: "display:none",
      isChosenUniversity: true,
      university: [
        {title: "重庆邮电大学", name: "cy"},
        {title: "重庆工商大学", name: "gs"},
        {title: "重庆交通大学", name: "cj"},
      ],
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
