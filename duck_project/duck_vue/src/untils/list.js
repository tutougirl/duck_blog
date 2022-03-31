/*
 * @Author: he yan ying
 * @Date: 2022-02-28 17:41:21
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-01 15:55:03
 * @Description: home清单数据
 */

export const setBlogTotal = (blogTotal) =>{
  return localStorage.setItem("BLOGTOTAL",blogTotal)
}

export const getBlogTotal = () =>{
  let blog=localStorage.getItem("BLOGTOTAL")
  console.log(blog)
  return JSON.parse(blog)
}

export const setTagTotal = (tagTotal) =>{
  return localStorage.setItem("TAGTOTAL",tagTotal)
}

export const getTagTotal = () =>{
  let blog=localStorage.getItem("TAGTOTAL")
  return JSON.parse(blog)
}