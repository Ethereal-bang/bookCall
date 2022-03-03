<template>
  <view>
    <view>Test: {{ key }}</view>
    <image
      mode="aspectFit"
    />
    <view>
      <text>书名</text>
      <text>xxx</text>
    </view>
    <view>
      <text>新旧程度</text>
      <text>8成新</text>
    </view>
    <view>
      <text>更多信息</text>
      <text>暂无</text>
    </view>
    <view>
      <view>拥有此书的唤友想对你说：</view>
      <view>“__________________”</view>
    </view>

    <button
      @tap="handle"
    >
      找Ta换
    </button>
    <view id="info" class="hide">
      <view>请选择以下联系方式联系这位同学，更多的交流才能更好的完成换书~(点击即可复制)</view>
      <view>
        <text>微信</text>
        <text>XXXXXX</text>
      </view>
      <view>
        <text>QQ</text>
        <text>XXXXXX</text>
      </view>
      <view>
        <text>电话</text>
        <text>未留下该方式</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "BookDetail",
  data() {
    return {
      key: "",
    }
  },
  onLoad: function (options) {
    this.key = options.key;
  },
  methods: {
    handle() {
      const info = document.querySelector("#info");
      info.removeAttribute("class");
      info.setAttribute("class", "show")
    },
  }
}
</script>

<style>
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
