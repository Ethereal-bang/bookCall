import {myAxios} from "./myAxios";
import schoolIpGetter from "../utils/schoolIpGetter";

// 获取学校列表,ip
export const getSchoolList = () => {
  return myAxios.get("/Getschools");
}

// 搜索
export const searchBook = (keyword) => {
  return myAxios("/books/GetBooksBySearch", {
    data: {
      schoolIp: schoolIpGetter(),
      name: '%' + keyword + '%',
    },
  });
}

// 根据分类获取书籍
export const getGenreBooks = (genreCode) => {
  const data = {
    schoolIp: schoolIpGetter(),
    category: genreCode,
  }
  return myAxios("/books/GetBooksBycategory", {
    data,
  })
}

// 获取全部书籍
export const getAllBooks = () => {
    return myAxios("/books/GetBooksBySchool", {
      data: {
        schoolIp: schoolIpGetter(),
      }
    })
}
