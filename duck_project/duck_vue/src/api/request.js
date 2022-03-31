/*
 * @Author: he yan ying
 * @Date: 2022-02-07 16:17:27
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-23 15:24:32
 * @Description:
 */
import axios from "axios";
import store from "@/store";
import {getToken} from '@/untils/token'

const request = axios.create({
  baseURL: "/api",
  timeout: 5000
})

//请求拦截器
request.interceptors.request.use((config) => {
  let token = getToken()

  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});
//响应拦截器
request.interceptors.response.use((res) => {
    return res;
  }
//  ,(error)=>{
//     return Promise.reject(new Error('false'))
//  }
)

export default request;
