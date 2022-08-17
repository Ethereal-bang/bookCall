import {myAxios} from "./myAxios";
import Taro from "@tarojs/taro";

function getSchoolIp() {
  return Taro.getStorageSync("schoolIp");
}

// 获取学校列表,ip
export const getSchoolList = () => {
  return myAxios.get("/Getschools");
}

// 搜索
export const searchBook = (keyword) => {
  return myAxios("/books/GetBooksBySearch", {
    data: {
      schoolIp: getSchoolIp(),
      name: '%' + keyword + '%',
    },
  });
}

// 根据分类获取书籍
export const getGenreBooks = (genreCode) => {
  const data = {
    schoolIp: getSchoolIp(),
    category: genreCode,
  }
  return myAxios("/books/GetBooksBycategory", {
    data,
  })
}
