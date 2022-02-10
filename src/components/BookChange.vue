<template>
  <view>
    <view>书籍信息</view>
    <view>
      <AtInput
        title="书名"
        placeholder="请填写书籍名称 / 扫一扫书的ISBN码"
        :value="inputValue"
        :on-change="onInputValueChange.bind(this, 'inputValue')"
      />
      <button
        size="mini"
        type="primary"
        plain="true"
        @tap="clickScan"
      >
        戳这扫码
      </button>
    </view>
    <view>
      <text>
        封面
      </text>
      <text>请上传你所要换出的书籍照片</text>
    </view>
    <view>
      <view>标签选择</view>

      <view>书籍类别</view>
      <radio-group
        @change="onTypeChange"
      >
        <label
          v-for="item in typeList"
        >
          <radio
            :value="item.value"
            :checked="item.checked"
          >
            {{ item.text }}
          </radio>
        </label>
      </radio-group>
    </view>

    <view>新旧程度</view>
    <radio-group
      @change="onOldChange"
    >
      <label
        v-for="item in oldList"
      >
        <radio
          :value="item.value"
          :checked="item.checked"
        >
          {{ item.text }}
        </radio>
      </label>
    </radio-group>
  </view>
</template>

<script>
import {AtInput} from "taro-ui-vue";

export default {
  name: "BookChange",
  components: {
    AtInput,
  },
  data() {
    return {
      inputValue: "",
      typeList: [
        {
          value: '小说',
          text: '小说',
          checked: false
        },
        {
          value: '文学',
          text: '文学',
          checked: false
        },
      ],
      oldList: [
        {
          value: "6",
          text: "6成新",
          checked: false,
        }, {
          value: "7",
          text: "7成新",
          checked: false,
        }, {
          value: "8",
          text: "8成新",
          checked: false,
        }, {
          value: "9",
          text: "9成新",
          checked: false,
        }, {
          value: "10",
          text: "全新",
          checked: false,
        }, {
          value: "5",
          text: "5成新及以下",
          checked: false,
        },
      ],
      type: "",
      old: "",
    }
  },
  methods: {
    onInputValueChange(stateName, value) {
      this[stateName] = value;
    },
    clickScan() {
      console.log("click!")
      wx.scanCode({
        success: (res) => {
          console.log("success: " + res);
        }
      })
    },
    onTypeChange(e) {
      console.log("typeChange", e.detail);
      this.type = e.detail.value;
    },
    onOldChange(e) {
      console.log("oldChange", e.detail);
      this.old = e.detail.value;
    },
  }
}
</script>

<style scoped>

</style>
