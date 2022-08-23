import Taro from "@tarojs/taro";

export function getSchoolIp() {
  return Taro.getStorageSync("schoolIp");
}

export function getOpenid() {
  return Taro.getStorageSync("openid") || '';
}
