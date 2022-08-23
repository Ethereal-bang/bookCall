import {myAxios} from "./myAxios";
import {getSchoolIp} from "../utils/storageGetter";

// 发布书籍(待后端修改参数!
export const addBook = (isbn, flagToGet, category, message, old) => {
  return myAxios("/books/AddBook", {
    data: {
      schoolIp: getSchoolIp(),
      openid:"",
      getOrSale: flagToGet, // 0为想要1为售卖
      isbn,
      message,
      category,
      label: old,  // 几成新
    }
  })
}

// 下架书籍
export const bookOff = (bookId) => {
  return myAxios.delete("/books/BookOff", {
    data: {
      id: bookId,
    }
  })
}
