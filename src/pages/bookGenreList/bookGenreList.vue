<template>
  <view>
    <view>Test</view>
    <view>{{ genre }}</view>
  </view>
</template>

<script>
export default {
  name: "BookGenreList",
  data() {
    return {
      genre: "",
    }
  },
  onLoad: function (options) {
    this.genre = options.tag;
  },
}
</script>

<style scoped>

</style>
