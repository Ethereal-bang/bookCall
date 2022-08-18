import {myAxios} from "./myAxios";
import schoolIpGetter from "../utils/schoolIpGetter";

// 发布书籍
export const addBook = (bookName, isbn, flagToGet, category,
                        message, label, phone, wx,) => {
  return myAxios("/books/AddBook", {
    data: {
      schoolIp: schoolIpGetter(),
      name: bookName,
      isbn,
      getOrSale: flagToGet, // 0为想要1为售卖
      category,
      message,
      label,
      changePhone, phone,
      thisWx: wx,
    }
  })
}
