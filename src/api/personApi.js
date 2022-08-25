import {myAxios} from "./myAxios";
import {getSchoolIp, getOpenid} from "../utils/storageGetter";

// 修改username
export const modifyUsername = (name) =>  {
  return myAxios("/myInfo/ChangName", {
    data: {
      openid: getOpenid(),
      name,
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
