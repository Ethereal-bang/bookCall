import {myAxios} from "./myAxios";
import {getSchoolIp, getOpenid} from "../utils/storageGetter";

// 修改username
export const modifyUsername = (name) => {
  return myAxios("/myInfo/ChangeName", {
    data: {
      openid: getOpenid(),
      name,
    }
  })
}

// 修改换书宣言
export const modifyDeclaration = (val) => {
  return myAxios("/myInfo/ChangeDeclaration", {
    data: {
      openid: getOpenid(),
      declaration: val,
    }
  })
}

// 获取用户资料
export const getUserInfo = (openid = getOpenid()) => {
  return myAxios("/myInfo/GetInfo", {
    data: {
      openid: openid,
    }
  })
}

// 获取用户书籍列表+资料
export const getUserBooks = (openid = getOpenid()) => {
  return myAxios("/books/GetBooksByopenid", {
    data: {
      schoolIp: getSchoolIp(),
      openid,
    }
  })
}

// 获取与该用户聊天记录
export const getCommunication = (askId, bookId) => {
  return myAxios("/dialogue/GetDialogue", {
    data: {
      bookId,
      Askopenid: askId, // 发起聊天者id
    },
  })
}

// 发送消息
export const sendMsg = (bookId, message, userId) => {
  return myAxios("/dialogue/AddDialogue", {
    data: {
      bookId,
      message,
      Sendopenid: getOpenid(),
      Getopenid: userId,  // 消息接收者id
    }
  })
}

// 获取消息列表
export const getNewsList = () => {
  return myAxios("/dialogue/GetNews", {
    data: {
      myopenid: getOpenid(),
    }
  })
}

// 发送订阅消息
export const sendSubscription = (openid, userName, bookName, news) => {
  return myAxios("/myInfo/sendMessage", {
    data: {
      template_id: "QoE_19IAHRNj7rq5kfMfA7mbMnS8iLGA49qj0GRs9uo",
      touser: openid,
      page: "pages/news/news",  // 小程序跳转链接
      data: {
        thing4: {
          value: userName,
        },
        thing2: {
          value: news,
        },
        thing7: {
          value: bookName,
        },
      }
    }
  })
}
