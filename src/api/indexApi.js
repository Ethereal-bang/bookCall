import {myAxios} from "./myAxios";
import {getSchoolIp} from "../utils/storageGetter";

// 登录获取openid
export const login = (code) => {
  return myAxios("/myInfo/jscode2session", {
    data: {
      code,
    }
  })
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

// 获取全部书籍
export const getAllBooks = () => {
    return myAxios("/books/GetBooksBySchool", {
      data: {
        schoolIp: getSchoolIp(),
      }
    })
}
