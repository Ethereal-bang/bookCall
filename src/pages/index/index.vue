<template>
  <view class="index_background">
    <view class="index">
      <!--校园认证-->
      <view class="school">
        <view @tap="choseUniversity">
          <view class="sprite sprite-index_location"/>
          <text>{{ chosenUniversity }}</text>
        </view>
        <view v-if="showState" @tap="choseWitchUniversity" class="university_list">
          <view
            v-for="uni in university"
            :data-ip="uni.schoolIp"
            :data-title="uni.schoolName"
          >
            {{ uni.schoolName }}
          </view>
        </view>
      </view>

      <!--搜索框-->
      <AtSearchBar
        input-type="text"
        placeholder="搜索书籍名称"
        :value="searchValue"
        :on-change="val => this.searchValue = val"
        :on-action-click="onSearch"
      />

      <!--轮播图-->
      <swiper
        indicator-color="#f0f2f5"
        indicator-active-color="#999999"
        current="current"
        duration="500"
        interval="2000"
        circular="true"
        autoplay="true"
        speed="4500"
        indicator-dots="true"
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
            <image :src="item.imgPath" mode="aspectFit"/>
          </navigator>
        </swiper-item>
      </swiper>
      <!--分类换书-->
      <view class="divide area">
        <view class="at-row at-row__justify--between">
          <view class="at-col title">
            分类换书
          </view>
          <AtButton class="at-col atAll" :on-click="clickToAllBooks">
            全部书籍◇
          </AtButton>
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
            <view :class="'sprite ' + genre.src"/>
            <text
              style="display: block; text-align: center"
            >{{ genre.title }}
            </text>
          </view>
        </scroll-view>
      </view>
      <!--换书广场-->
      <view :class="'area square ' + square_class">
        <view :class="'title ' + square_title_class">
          换书广场
        </view>
        <AtTabs
          :current="currentTab"
          :tab-list="tabList"
          :on-click="value => this.currentTab = value"
        >
          <AtTabsPane
            :current="currentTab"
            :index="0"
          >
            <BookList :list=bookList :class="tabs_body_class"/>
            <view
              class="no_location"
              v-if="!isChosenUniversity"
            >
              <image :src="locationImg" mode="aspectFit"/>
              <text>
                选择你所在的大学后，才能查看书籍动态以及发布书籍哦~
                {{ "\n" }}（点击左上角立即选择）
              </text>
            </view>
          </AtTabsPane>
          <AtTabsPane
            :current="currentTab"
            :index="1"
          >
            <BookList
              :list="bookList.filter(book => book.getOrSale === '1')"
              :class="tabs_body_class"
            />
          </AtTabsPane>
          <AtTabsPane
            :current="currentTab"
            :index="2"
          >
            <BookList
              :list="bookList.filter(book => book.getOrSale === '0')"
              :class="tabs_body_class"
            />
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
  AtButton,
} from 'taro-ui-vue'
import './index.scss'
import Taro from "@tarojs/taro";
import {getAllBooks, getGenreBooks, getSchoolList, login, searchBook} from "../../api/indexApi";
import BookList from "../../components/bookList/BookList";
import {schoolMap, genreMap, genreMap2} from "../../data/map";
import {getOpenid, getSchoolIp} from "../../utils/storageGetter";
import banner1 from "../../assets/banner1.png";
import banner2 from "../../assets/banner2.png";
import locationImg from "../../assets/location.png";

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
    AtButton,
  },
  data() {
    return {
      searchValue: '',
      current: 1,
      banners: [
        {imgPath: banner1, navigatePath: "/pages/index/index"},
        {imgPath: banner2, navigatePath: "/pages/changeRules/changeRules"},
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
        {key: 1, name: "novel", title: "小说", src: "sprite-group_1novel"},
        {key: 2, name: "literature", title: "文学", src: "sprite-group_4literature"},
        {key: 3, name: "internet", title: "互联网", src: "sprite-group_3internet"},
        {key: 4, name: "technology", title: "科技", src: "sprite-group_5science"},
        {key: 5, name: "psychology", title: "心理学", src: "sprite-group_6psychology"},
        {key: 6, name: "teaching", title: "教材教辅", src: "sprite-group_2education"},
        {key: 7, name: "other", title: "其他", src: "sprite-group_7other"},
      ],
      /*校园认证：*/
      showState: false,
      isChosenUniversity: false,
      university: [],
      chosenUniversity: "我的大学",
      /*换书广场页面滚动*/
      locationImg,
      square_class: "",
      square_title_class: "",
      tabs_body_class: "",
      screenHeight: 0,
    }
  },
  methods: {
    onSearch() {
      if (!this.judgeUniversity()) return;
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
      // 清空搜索框
      this.searchValue = '';
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
            res.eventChannel.emit("sendData", {
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
      if (!this.showState && this.university.length === 0) {
        getSchoolList()
          .then(res => {
            this.university = res.data;
          })
      }
      this.showState = !this.showState;
    },
    choseWitchUniversity(e) {
      Taro.setStorageSync("schoolIp", e.target.dataset.ip); // 缓存所选学校ip
      this.requestBooks();  // 请求书籍列表
      this.choseUniversity()// 选后关闭下拉单
      this.chosenUniversity = e.target.dataset.title; // 下拉单显示
      this.isChosenUniversity = true; // 换书广场显示
      // 订阅消息
      Taro.requestSubscribeMessage({
        tmplIds: ['QoE_19IAHRNj7rq5kfMfA7mbMnS8iLGA49qj0GRs9uo'],  // 模板id-新消息通知
      })
    },
    judgeUniversity() { // 交互时判断是否选择大学
      if (!this.isChosenUniversity) {
        Taro.showToast({
          title: "请先选择大学！",
          icon: "error",
        })
        return false;
      }
      return true;
    },
    clickToAllBooks() {
      if (!this.judgeUniversity()) return;
      Taro.navigateTo({
        url: "/pages/books/books?title=" + "全部书籍",
        success: res => {
          res.eventChannel.emit("sendData", {
            list: this.bookList,
          })
        }
      })
    },
    // 选择学校后请求书籍列表
    requestBooks() {
      getAllBooks().then(response => {
        this.bookList = response.data;
      }, err => console.log(err))
    },
  },
  onPageScroll(scroll) {  // 监测页面滚动值
    if (scroll.scrollTop >= this.screenHeight / 2) {
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
    // 获取窗口大小
    this.screenHeight = Taro.getSystemInfoSync().windowHeight;
    // 获取登录凭证code
    if (!getOpenid()) {
      Taro.login({ // 获取登录凭证
        success: (res) => {
          const {code} = res;
          if (code) {
            // 获取openid并存储
            login(code).then(res => {
              Taro.setStorageSync("openid", res.data)
            })
          } else {
            console.log("登录失败：" + res.errMsg);
          }
        }
      })
    }
    // 学校
    const memoIp = getSchoolIp();
    if (memoIp) { // 已经选择过学校
      this.requestBooks();
      this.chosenUniversity = schoolMap[memoIp];
      this.isChosenUniversity = true; // 换书广场显示
    } else {  // 获取学校列表
      getSchoolList()
        .then(res => {
          this.university = res.data;
        }, err => {
          console.log(err)
        })
    }
  }
}
</script>
<style>
/*For页面滚动*/
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
  height: 95vh;
  overflow-y: scroll;
}
</style>
