import {myAxios} from "./myAxios";

// 获取学校列表
export const getSchoolList = () => {
  return myAxios("/GetschoolName");
}

// 搜索
export const searchBook = (schoolIp: string, keyword: string) => {
  return myAxios("/GetBooksBySearch", {
    data: {
      schoolIp,
      name: '%' + keyword + '%',
    },
  });
}
