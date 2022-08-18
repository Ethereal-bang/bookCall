import Taro from "@tarojs/taro";

export default function getSchoolIp() {
  return Taro.getStorageSync("schoolIp");
}
