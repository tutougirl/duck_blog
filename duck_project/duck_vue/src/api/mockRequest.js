/*
 * @Author: he yan ying
 * @Date: 2022-02-12 15:05:20
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-12 15:17:45
 * @Description: 
 */
import axios from "axios";

//底下的代码也是创建axios实例
let mockRequest = axios.create({
  //基础路径
  baseURL: "/mock",
  //请求不能超过5S
  timeout: 5000,
});
mockRequest.interceptors.request.use((config) => {
  return config
})

mockRequest.interceptors.response.use((response) => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default mockRequest;