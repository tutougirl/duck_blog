/*
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-09 16:00:18
 * @Description: 路由守卫
 */
import router from "./router";
import {removeToken,getToken,getTokenStart} from "@/untils/token"
import { getUserInfo } from "./untils/userInfo";
import store from '@/store/index'
// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限，通过验证index.js里路由的meta.requireAuth
    const token = getToken()
    //设置token过期时间
    const tokenStartTime=getTokenStart()
     // 自己定义6天过期，让用户重新登录一下， 用户总不可能在一个页面挂机一天吧
    const timeOver = 6 * 24 * 3600 * 1000
    // 当前时间
    let date = new Date().getTime()
    // 如果大于说明是token过期了
    if(date - tokenStartTime > timeOver) {
      removeToken()
    }
    var user=getUserInfo()
    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/login') {
        next({
          path:'/home'
        })
      } else {
        if(user.username){
          next()
        }else{
          next({
            path: '/login'
          })
        }
      }
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})
