export default {
  pages: [
    /*主Tab:*/
    'pages/index/index',
    'pages/publish/publish',
    "pages/person/person",
    /*其他页面:*/
    "pages/bookList/bookList",  // 书籍列表
    "pages/bookGenreList/bookGenreList",  // 种类列表
    "pages/bookDetail/bookDetail", // 书籍详情
    "pages/personalPublish/personalPublish",  // 个人发布
    "pages/personalContact/personalContact",  // 联系方式
    "pages/changeRules/changeRules",  // 换书规则
  ],
  tabBar: {
    color:'#b4b4b3',
    selectedColor:'#fd973f',
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
        selectedColor:'#ffcf4d',
        iconPath:"./index.png",
        selectedIconPath:"./index_.png"
        
        // iconpath:''
      }, {
        pagePath: 'pages/publish/publish',
        text: "发布",
        selectedColor:'##ffcf4d',
        iconPath:"./publish.png",
        selectedIconPath:"./publish.png"
      }, {
        pagePath: "pages/person/person",
        text: "我的",
        selectedColor:'#ffcf4d',
        iconPath:"./mine.png",
        selectedIconPath:"./mine_.png"
      },
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#81cea2',
    backgroundColor: "#81cea2",
    navigationBarTextStyle: 'white',
    // navigationStyle:'custom'
  },
}
