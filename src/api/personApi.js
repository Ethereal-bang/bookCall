import {myAxios} from "./myAxios";
import getSchoolIp from "../utils/schoolIpGetter";

// 我的发布
export const personPublish = () => {
  // 等后端api更改!
}

// 获取用户资料
export const getUserInfo = (userId) => {
  // 等登录实现后!
}

// 获取用户书籍列表
export const getUserBooks = (userId) => {
  // 后端修改返回方式!
  return myAxios("/books/GetBooksBythisWx", {
    data: {
      schoolIp: getSchoolIp(),
      thisWx: "srf939847757", // 先写死!
    }
  })
}
