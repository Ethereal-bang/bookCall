import {myAxios} from "./myAxios";
import {getSchoolIp, getOpenid} from "../utils/storageGetter";

// 修改username
export const modifyUsername = (name) =>  {
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
