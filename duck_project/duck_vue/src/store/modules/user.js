/*
 * @Author: he yan ying
 * @Date: 2022-02-08 17:24:05
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-09 15:48:27
 * @Description: 
//  */
import Vue from 'vue'
import {login} from '@/api/index' 
import { removeToken, setToken,setTokenStart } from '@/untils/token'
import { setUserInfo} from '../../untils/userInfo'

const user ={
  //相当于私有属性
  state: {
    userInfo: {}
  },

  //唯一修改state的地方
  mutations: {
    USERLOGIN: (state, userInfo) => {
      userInfo.loginTime=new Date().toLocaleString()
      state.userInfo = userInfo
      setUserInfo(userInfo)
      console.log(state.userInfo)
    }
  },

  // 计算属性
  getters: {
  },
  //书写异步操作
  actions: {
    async userLogin({commit} ,params={}){
      let result=await login(params)
      if(result.data.code===200){
        console.log(result)
        commit('USERLOGIN',result.data.data)
        setToken(result.headers.authorization)
        setTokenStart(new Date().getTime())

        return true
      }else{
        return Promise.reject(new Error(result.data.msg))
      } 
    },
    layOut(){
      removeToken();
    },
  },
  modules: {}
}

export default user