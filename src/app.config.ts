export default {
  pages: [
    /*主Tab:*/
    'pages/index/index',
    'pages/publish/publish',
    "pages/news/news",
    "pages/person/person",
    /*其他页面:*/
    "pages/books/books",  // 书籍列表展示页
    "pages/bookDetail/bookDetail", // 书籍详情
    "pages/communicate/communicate",  // 聊天
    "pages/personalHomepage/personalHomepage",  // 个人主页
    "pages/personalPublish/personalPublish",  // 个人发布
    "pages/changeRules/changeRules",  // 换书规则
  ],
  tabBar: {
    color:'#b4b4b3',
    selectedColor:'#fd973f',
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        iconPath:"./assets/index.png",
        selectedIconPath:"./assets/index_.png"
      }, {
        pagePath: 'pages/publish/publish',
        text: "发布",
        iconPath:"./assets/publish.png",
        selectedIconPath:"./assets/publish.png"
      }, {
        pagePath: 'pages/news/news',
        text: "消息",
        iconPath:"./assets/news.png",
        selectedIconPath:"./assets/news_.png"
      }, {
        pagePath: "pages/person/person",
        text: "我的",
        iconPath:"./assets/mine.png",
        selectedIconPath:"./assets/mine_.png"
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#81cea2',
    backgroundColor: "#81cea2",
    navigationBarTextStyle: 'white',
  },
  "lazyCodeLoading": "requiredComponents",
}
