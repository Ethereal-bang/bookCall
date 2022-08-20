// 种类 name-code
export const genreMap = {
  novel: 0,
  literature: 1,
  internet: 2,
  technology: 3,
  psychology: 4,
  teaching: 5,
  other: 6,
}

// 种类 name-名称
export const genreMap2 = {
  novel: "小说",
  literature: "文学",
  internet: "互联网",
  technology: "科技",
  psychology: "心理学",
  teaching: "教材教辅",
  other: "其他",
}

// 换入新旧程度 value-code
export const inOldDegree = {
  new: 2,
  almostNew: 1,
  any: 0,
}

// 换入新旧程度 value-名称
export const inOldDegree2 = {
  new: "全新",
  almostNew: '较新',
  any: "无所谓",
}

// 换成新旧程度 value-名称
export const outOldDegree = {
  6: "6成新",
  7: "7成新",
  8: "8成新",
  9: "9成新",
  10: "10成新",
  5: "5成新及以下",
}

// 换出/换入 code-name
export const inOrOut = {
  0: "in",
  1: "out",
}

// 换出/换入 code-名称
export const inOrOut2 = {
  0: "求换",
  1: "可换",
}
