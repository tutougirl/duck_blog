/*
 * @Author: he yan ying
 * @Date: 2022-02-24 09:57:38
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-24 10:50:40
 * @Description:
 */
export const setUserInfo = (user) => {
  return localStorage.setItem("USERINFO", JSON.stringify(user))
}

export const getUserInfo = () => {
  let user = localStorage.getItem("USERINFO")
  return JSON.parse(user)
}

export const removeUserInfo = () => {
  return localStorage.removeItem("USERINFO")
}
