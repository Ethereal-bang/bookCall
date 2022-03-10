<template>
  <view>
    <AtTabs
      :on-click="handleClick"
      :current="currentTab"
      :swipeable="true"
      :tab-list="tabList"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
        <AtNoticebar>当书籍交换成功后，记得及时下架对应书籍，避免其他唤友频繁联系你哦~</AtNoticebar>
        <AtList>
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="下架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="下架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
        </AtList>
      </AtTabsPane>

      <AtTabsPane
        :current="currentTab"
        :index="1"
      >
        <AtNoticebar>当书籍交换成功后，记得及时下架对应书籍，避免其他唤友频繁联系你哦~</AtNoticebar>
        <AtList>
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="下架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="下架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
        </AtList>
      </AtTabsPane>

      <AtTabsPane
        :current="currentTab"
        :index="2"
      >
        <AtNoticebar>下架后的书籍如果最终没有交换成功，可重新上架哦~</AtNoticebar>
        <AtList>
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="重新上架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
          <AtListItem
            title="解忧杂货店"
            note="换书寄语:无论现在多么的不开心"
            extra-text="重新上架"
            thumb="https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png"
          />
        </AtList>

      </AtTabsPane>
    </AtTabs>
  </view>
</template>

<script>
import {AtTabs, AtTabsPane, AtList, AtListItem, AtDivider, AtNoticebar} from "taro-ui-vue";

export default {
  name: "PersonalPublish",
  components: {
    AtTabs,
    AtTabsPane,
    AtList,
    AtListItem,
    AtDivider,
    AtNoticebar,  // 通告栏
  },
  data() {
    return {
      currentTab: 0,
      tabList: [
        {title: '可换'},
        {title: '求换'},
        {title: '已下架'},
      ],
    }
  },
  methods: {
    handleClick(value) {
      this.currentTab = value
    },
  },
}
</script>

<style scoped>
view {
  height: 20vh;
}
</style>
