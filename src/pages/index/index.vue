<template>
  <view class="index_background">
  <view class="index">
        <!--校园认证-->
    <!-- <view>我的大学</view> -->
    <!--搜索框-->
    <AtSearchBar
      input-type="text"
      placeholder="搜索书籍名称"
      :value="searchValue"
      :on-change="onChange.bind(this, 'searchValue')"
      :on-action-click="onActionClick"
    />
  <view class="at-row">
    <AtTag class="at-col" name='tag-1' type='primary' circle size='small' :onClick="onClick">
          程序设计
        </AtTag>
        <AtTag class="at-col" name='tag-1' type='primary' circle size='small' >
          高数
        </AtTag>
        <AtTag class="at-col" name='tag-1' type='primary' circle size='small'>
          大学物理
        </AtTag>
        <AtTag class="at-col" name='tag-1' type='primary' circle size='small'>
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
            open-type="navigate">
            全部书籍◇
          </navigator>
        </view>
      </view>

      <view class="at-row">
        <AtTabBar
        selectedColor='#a99b85'
        conSize=24
         :tabList="[
        { title: '文学', image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png'},
        { title: '教材教辅', image: 'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png'},
        { title: '互联网', image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'},
        { title: '科技', image: 'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'}
        ]"
        :onClick="genreClick"
        :current="current"
        />

      </view>
    </view>
    <!--换书广场-->
    <view class="square">
      <view class="titleText">换书广场</view>
      <AtTabs
        :swipeable="false"
        :current="current1"
        :tab-list="tabList1"
        :on-click="handleClick"
      >
        <AtTabsPane
          :current="current1"
          :index="0"
        >
          <view class="tab-content">
            <AtList>
              <AtListItem
                v-for="book in bookList"
                :key="book.key"
                :title="book.title"
                :note="book.note"
                :extra-text="book.tag"
                :thunb="book.url"
                :on-click="bookDetailClick.bind(this, book.key)"
              />
            </AtList>
          </view>
        </AtTabsPane>
        <AtTabsPane
          :current="current1"
          :index="1"
        >
          <view class="tab-content" />
        </AtTabsPane>
        <AtTabsPane
          :current="current1"
          :index="2"
        >
          <view class="tab-content" />
        </AtTabsPane>
      </AtTabs>
    </view>
  </view>
  </view>
</template>

<script>
// 按需引入, 更小的应用体积
import { AtNavBar,AtSearchBar,AtTag,AtTabBar,AtTabs, AtTabsPane, AtList, AtListItem,AtGrid } from 'taro-ui-vue'
import './index.scss'

export default {
  components: {
    AtNavBar,
    AtSearchBar,
    AtTag,
    AtTabBar,
    AtTabs,
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

      current1: 0,
      tabList1: [
        { title: '推荐' },
        { title: '等你换' },
        { title: 'Ta想要' }
      ],

      bookList: [
        {key: 1, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "可换"},
        {key: 2, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "可换"},
        {key: 3, title: "解忧杂货店", note: "换书寄语:无论现在多么的不开心", tag: "求换"},
      ]
    }
  },
  methods: {
    onChange(stateName, value) {
      this[stateName] = value;
    },
    onActionClick() {
      console.log("点击：搜索")
    },
    handleClick(value) {
      this.current1 = value
    },
    genreClick(val) {
      wx.navigateTo({
        url: `../../pages/bookGenreList/bookGenreList?tag=${val.tabList}`,
      })
    },
    bookDetailClick(key) {
      console.log(key)
      wx.navigateTo({
        url: `../../pages/bookDetail/bookDetail?key=${key}`,
      })
    },
  },
}
</script>
<style scoped>
</style>
