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

    <button>找Ta换</button>
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
  }
}
</script>

<style scoped>

</style>
