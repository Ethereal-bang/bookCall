<template>
  <view>
    <AtTabs
      :on-click="handleClick"
      :current="currentTab"
      :swipeable="false"
      :tab-list="tabList1"
    >
      <AtTabsPane
        :current="currentTab"
        :index="0"
      >
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
        <AtDivider content="已下架" />
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
      <AtTabsPane
        :current="currentTab"
        :index="1"
      >
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
        <AtDivider content="已下架" />
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
import {AtTabs, AtTabsPane, AtList, AtListItem, AtDivider} from "taro-ui-vue";

export default {
  name: "PersonalBook",
  components: {
    AtTabs,
    AtTabsPane,
    AtList,
    AtListItem,
    AtDivider,
  },
  data() {
    return {
      currentTab: 0,
      tabList1: [
        {title: '可换'},
        {title: '求换'},
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
