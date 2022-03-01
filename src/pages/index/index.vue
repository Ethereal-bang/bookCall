<template>
  <view class="index">
    <!--搜索框-->
    <AtSearchBar
      input-type="text"
      placeholder="搜索书籍名称"
      :value="searchValue"
      :on-change="onChange.bind(this, 'searchValue')"
      :on-action-click="onActionClick"
    />
    <!--校园认证-->
    <view>我的大学</view>
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
    <view>
      <view class="at-row at-row__justify--between">
        <view class="at-col category">
          分类换书
        </view>
        <view class="at-col category">
          <navigator
            url="/pages/bookList/bookList"
            open-type="navigate"
          >
            全部书籍
          </navigator>
        </view>
      </view>
      <view class="at-row at-row__justify--between">
        <AtTag class="at-col" :on-click="genreClick" name="novel">
          小说
        </AtTag>
        <AtTag class="at-col" :on-click="genreClick" name="literature">
          文学
        </AtTag>
        <AtTag class="at-col" :on-click="genreClick" name="internet">
          互联网
        </AtTag>
        <AtTag class="at-col" :on-click="genreClick" name="technology">
          科技
        </AtTag>
        <AtTag class="at-col" :on-click="genreClick" name="psychology">
          心理学
        </AtTag>
        <AtTag class="at-col" :on-click="genreClick" name="other">
          其他
        </AtTag>
      </view>
    </view>
    <!--换书广场-->
    <view>
      <view>换书广场</view>
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
                title="解忧杂货店"
                note="换书寄语:无论现在多么的不开心"
                extra-text="可换"
                thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
              />
              <AtListItem
                title="解忧杂货店"
                note="换书寄语:无论现在多么的不开心"
                extra-text="求换"
                thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
              />
              <AtListItem
                title="解忧杂货店"
                note="换书寄语:无论现在多么的不开心"
                extra-text="可换"
                thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
              />
              <AtListItem
                title="解忧杂货店"
                note="换书寄语:无论现在多么的不开心"
                extra-text="可换"
                thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
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
</template>

<script>
// 按需引入, 更小的应用体积
import { AtSearchBar, AtTag, AtTabs, AtTabsPane, AtList, AtListItem } from 'taro-ui-vue'
import './index.scss'

export default {
  components: {
    AtSearchBar,
    AtTag,
    AtTabs,
    AtTabsPane,
    AtList,
    AtListItem,
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
        url: `../../pages/bookGenreList/bookGenreList?tag=${val.name}`,
      })
    }
  },
}
</script>
<style scoped>
</style>
