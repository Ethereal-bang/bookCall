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

// 获取用户资料(待后端把用户注册写好!
export const getUserInfo = (openid = getOpenid()) => {
  return myAxios("/myInfo/GetInfo", {
    data: {
      openid: openid,
    }
  })
}

// 获取用户书籍列表(因为users数据库目前没有该openid所以500
export const getUserBooks = () => {
  return myAxios("/books/GetBooksByopenid", {
    data: {
      schoolIp: getSchoolIp(),
      openid: getOpenid(), // 先写死!
    }
  })
}
