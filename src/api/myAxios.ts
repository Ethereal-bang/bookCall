import axios from "taro-axios";

export const myAxios = axios.create({
  baseURL: "https://bookchang.com:8443/api/sql",
  method: "get",
})
