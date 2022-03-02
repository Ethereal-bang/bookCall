export default {
  pages: [
    /*主Tab:*/
    'pages/index/index',
    'pages/publish/publish',
    "pages/person/person",
    /*其他页面:*/
    'pages/bookOut/bookOut',  // 主动换出
    'pages/bookIn/bookIn',  // 希望换入
    "pages/bookList/bookList",  // 书籍列表
    "pages/bookGenreList/bookGenreList",  // 种类列表
    "pages/bookDetail/bookDetail" // 书籍详情
  ],
  tabBar: {
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      }, {
        pagePath: 'pages/publish/publish',
        text: "发布",
      }, {
        pagePath: "pages/person/person",
        text: "我的",
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
}
