import {myAxios} from "./myAxios";
import schoolIpGetter from "../utils/schoolIpGetter";

// 发布书籍
export const addBook = (isbn, flagToGet, category, message, old) => {
  return myAxios("/books/AddBook", {
    data: {
      schoolIp: schoolIpGetter(),
      isbn,
      getOrSale: flagToGet, // 0为想要1为售卖
      category,
      message,
      label: old,  // 几成新
      changePhone:"15086866", // 不需要这几个参数,等接口改过来!
      name: "", //
      changeWx:"srf939847757",
      thisWx:"srf939847757",
    }
  })
}

// 我的发布
export const personPublish = () => {
  // 等后端api更改!
}
