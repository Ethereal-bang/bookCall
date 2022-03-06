export default {
  pages: [
    /*主Tab:*/
    'pages/index/index',
    'pages/publish/publish',
    "pages/person/person",
    /*其他页面:*/
    'pages/bookOut/bookOut',  // 主动换出
    'pages/bookIn/bookIn',  // 希望换入
  ],
  tabBar: {
    color:'#b4b4b3',
    selectedColor:'#fd973f',
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        selectedColor:'#a99b85',
        iconpath:''
      }, {
        pagePath: 'pages/publish/publish',
        text: "发布",
        selectedColor:'#a99b85'
      }, {
        pagePath: "pages/person/person",
        text: "我的",
        selectedColor:'#a99b85'
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#a99b85',
    backgroundColor: "#a99b85",
    navigationBarTextStyle: 'white',
    // navigationStyle:'custom'
  },
}
