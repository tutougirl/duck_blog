/*
 * @Author: he yan ying
 * @Date: 2022-02-23 14:57:15
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-09 15:49:06
 * @Description:
 */
export const setToken = (token) => {
  return localStorage.setItem("TOKEN", token)
}

export const getToken = () => {
  return localStorage.getItem("TOKEN")
}

export const setTokenStart = (time) => {
  console.log(time)
  return localStorage.setItem("TOKENSTART", time)
}

export const getTokenStart = () => {
  return localStorage.getItem("TOKENSTART")
}

export const removeToken = () => {
  return localStorage.removeItem("TOKEN")
}
