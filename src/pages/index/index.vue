<template>
  <view class="index_background">
    <view class="index">
      <!--校园认证-->
      <view>
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
        <view v-if="showState" @tap="choseWitchUniversity" class="universityList">
          <view
            v-for="uni in university"
            :data-ip="uni.schoolIp"
            :data-title="uni.schoolName"
          >
            {{ uni.schoolName }}
          </view>
        </view>
      </view>
      <AtToast :isOpened="isToastOpen" text="请先选择大学！"/>
      <!--搜索框-->
      <AtSearchBar
        input-type="text"
        placeholder="搜索书籍名称"
        :value="searchValue"
        :on-change="onChange.bind(this, 'searchValue')"
        :on-action-click="onSearch"
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
            :data-name="genre.name"
            @tap="() => genreClick(genre.name)"
          >
            <view>
              <image
                :src=genre.src
                mode="aspectFit"
                style="height: 45px; width: 100%"
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
      <view
        style="border-radius: 2% 2% 2% 2%;background-color: #ffffff;"
        :class="square_class"
      >
        <view
          style="padding-left: 13rpx;"
          :class="square_title_class"
        >
          换书广场
        </view>
        <AtTabs
          :current="currentTab"
          :tab-list="tabList"
          :on-click="clickTab"
        >
          <AtTabsPane
            :current="currentTab"
            :index="0"
          >
            <BookList :book-list=bookList />
            <AtList
              :class="tabs_body_class"
            >
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
            <AtList
              :class="tabs_body_class"
            >
              <AtListItem
                v-for="book in bookList"
                v-if="book.states === '可换'"
                :key="book.id"
                :title="book.name"
                :note="book.words"
                :thumb="imgPaths[book.img]"
                :extra-text="book.states"
                :on-click="bookDetailClick.bind(this, book.id)"
                style="color:#57665e"
                :class="(book.states === '可换') ? 'item_out' : 'item_in'"
              />
            </AtList>
          </AtTabsPane>
          <AtTabsPane
            :current="currentTab"
            :index="2"
          >
            <AtList
              :class="tabs_body_class"
            >
              <AtListItem
                v-for="book in bookList"
                v-if="book.states === '求换'"
                :key="book.id"
                :title="book.name"
                :note="book.words"
                :thumb="imgPaths[book.img]"
                :extra-text="book.states"
                :on-click="bookDetailClick.bind(this, book.id)"
                style="color:#57665e"
                :class="(book.states === '可换') ? 'item_out' : 'item_in'"
              />
            </AtList>
          </AtTabsPane>
        </AtTabs>
      </view>
    </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import {
  AtNavBar,
  AtTabBar,
  AtSearchBar,
  AtTabs,
  AtTabsPane,
  AtList,
  AtListItem,
  AtGrid,
  AtTag,
  AtToast,
} from 'taro-ui-vue'
import './index.scss'
import Taro from "@tarojs/taro";
import {getGenreBooks, getSchoolList, searchBook} from "../../api/indexApi";
import BookList from "../../components/bookList/BookList";
import {genreMap, genreMap2} from "../../data/map";
const imgPaths = require("../../utils/base64");

export default {
  components: {
    BookList,
    AtNavBar,
    AtTabBar,
    AtSearchBar,
    AtTabs,
    AtTag,
    AtTabsPane,
    AtList,
    AtListItem,
    AtGrid,
    AtToast,
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

      bookList: [],
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
      showState: false,
      isChosenUniversity: false,
      university: [],
      chosenUniversity: "我的大学",
      imgPaths,
      isToastOpen: false,
      /*换书广场页面滚动*/
      square_class: "",
      square_title_class: "",
      tabs_body_class: "",
    }
  },
  methods:  {
    // 搜索框内容改变
    onChange(stateName, value) {
      this[stateName] = value;
    },
    // 搜索
    onSearch() {
      if (!this.judgeUniversity())  return;
      searchBook(this.searchValue)
        .then(res => {
          const list = res.data;
          Taro.navigateTo({
            url: "/pages/books/books?title=搜索结果",
            success: res => {
              res.eventChannel.emit("sendData", {
                list,
              })
            }
          })
        }, err => {
          console.log(err)
        })
    },
    clickTab(value) {
      this.currentTab = value
    },
    genreClick(genre) {
      if (!this.judgeUniversity()) return;
      const genreCode = genreMap[genre],
        name = genreMap2[genre];
      getGenreBooks(genreCode).then(response => {
        Taro.navigateTo({
          url: `../../pages/books/books?title=` + name,
          success: res => {
            // 向被打开页面传送数据
            res.eventChannel.emit("acceptDataFromOpenerPage", {
              list: response.data,
            })
          }
        })
      }, err => {
        console.log(err)
      })
    },
    bookDetailClick(key) {
      Taro.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
    choseUniversity() {
      this.showState = !this.showState;
    },
    choseWitchUniversity(e) {
      // 缓存所选学校ip
      Taro.setStorage({
        key: "schoolIp",
        data: e.target.dataset.ip,
      });
      this.choseUniversity()// 选后关闭下拉单
      this.chosenUniversity = e.target.dataset.title; // 下拉单显示
      this.isChosenUniversity = true; // 换书广场显示（true则报错？？
      this.isToastOpen = false;
    },
    judgeUniversity() { // 交互时判断是否选择大学
      if (!this.isChosenUniversity) {
        this.isToastOpen = true;
        return false;
      }
      return true;
    }
  },
  onPageScroll(scroll) {  // 监测页面滚动值
    // console.log(scroll)
    if (scroll.scrollTop >= 327) {
      this.square_class = "square_scroll";
      this.square_title_class = "title_scroll";
      this.tabs_body_class = "at-tabs__body_scroll";
    } else {
      this.square_class = "";
      this.square_title_class = "";
      this.tabs_body_class = "";
    }
  },
  onLoad() {
    // 登录（需后端
    // Taro.login({
    //   success: (res) => {
    //     if (res.code) {
    //       // 发起网络请求
    //       // ...
    //       // console.log(res.code)
    //     } else {
    //       console.log("登录失败：" + res.errMsg);
    //     }
    //   }
    // })
    // 获取用户信息
    // Taro.getUserInfo({
    //   success: (res) => {
    //     const { userInfo } = res;
    //     Taro.setStorageSync("userInfo", userInfo);
    //     Taro.setStorageSync("userId", 1); // 暂时写死
    //   }
    // })
    // 获取学校列表
    getSchoolList()
      .then(res => {
        this.university = res.data;
        }, err => {
        console.log(err)
      })
  }
}
</script>
<style>
.index {
  height: 100vh;
}

.scroll-tag {
  white-space: nowrap;
}

.scroll-item {  /*分类换书*/
  display: inline-block;
  width: 25%;
}

.tab-content {
  height: 10vh;
  color: #a99b85;
}

.universityList {
  position: absolute;
  z-index: 1;
  background-color: whitesmoke;
}

.square_scroll {
  height: 100vh;
}
.title_scroll {
  position: sticky;
  top: 1vh;
  height: 5vh;
}
.at-tabs__body_scroll {
  width: 100%;
  /*position: absolute;*/
  /*top: 4vh;*/
  height: 85vh;
  overflow-y: scroll;
}
.at-list__item {/*列表项*/
  height: 162rpx;

}
.item_out {
  color: #f0ae2b;
}
.item_in {
}
.item-content__info-note{
  font-size: small;
}
</style>
