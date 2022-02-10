export default {
  pages: [
    /*主Tab:*/
    'pages/publish/publish',
    "pages/person/person",
    'pages/index/index',
    /*其他页面:*/
    'pages/bookOut/bookOut',  // 主动换出
    'pages/bookIn/bookIn',  // 希望换入
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
  }
}
