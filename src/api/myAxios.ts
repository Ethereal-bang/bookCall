import axios from "taro-axios";

export const myAxios = axios.create({
  baseURL: "https://bookchang.com:8443/api/sql",
  method: "post",
})

myAxios.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  }, err => {
    return Promise.reject(err);
  }
)
