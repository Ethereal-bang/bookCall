<template>
  <view class="changeRules">
    <view class="changeRules1">
      <view class="changeRules2">
        <text class="changeRulesText">
          书唤是一款服务于大学生的校园产品，致力于为同学们提供一个便利的换书平台。{{ "\n" }}
          换书步骤如下：{{ "\n" }}
        </text>
      </view>
      <view class="changeRules3">
        <text class="changeRulesText2">
          1. 你可以在首页进行浏览可供交换的书籍，书籍分为两个类别：“可换”和“求换”，带有“可换”标签的书籍代表着对方可以换出此书，带有”求换“标签的书籍代表别人正在期待换入此书。
          {{ "\n" }}
          {{ "\n" }}
          2. 可以点击任意一本你想换入/换出的书籍，在书记详情页我们可以看见这本书的基本信息、发布者的换书寄语，你可以选择联系发布者，与该发布者沟通换书事宜，如：双方可交换的书籍、换书时间、换书地点等（在这之前，最好是自己已有发布的书籍，便于双方进行交换书籍事宜的沟通）。沟通时，你还可以通过点击用户头像进入他人主页，也许会发现更多的选择。
          {{ "\n" }}
          {{ "\n" }}
          3. 与对方沟通完成后，最好及时下架书籍，以免与其他同学重复沟通。
          {{ "\n" }}
          {{ "\n" }}
          4. 最后按照沟通的约定，在校园内与对方线下换书。
        </text>
      </view>
    </view>
  </view>
</template>

<script>
import "./changeRules.scss";

export default {
  name: "changeRules"
}
</script>

<style scoped>

</style>
