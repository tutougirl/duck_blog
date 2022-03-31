/*
 * @Author: he yan ying
 * @Date: 2022-02-08 17:24:05
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-01 16:21:07
 * @Description:
//  */
import Vue from 'vue'
import {reqTags, addTags} from '@/api/index'
import {setTagTotal} from '../../untils/list'

const tag = {
  //相当于私有属性
  state: {
    tags: []
  },

  //唯一修改state的地方
  mutations: {
    GET_TAG: (state, tags) => {
      state.tags = tags
    },
    ADD_Tag: (state, tags) => {
      state.tags = tags
    }
  },

  // 计算属性 项目当中getters主要的作用是:简化仓库中的数据(简化数据而生)
//可以把我们将来在组件当中需要用的数据简化一下【将来组件在获取数据的时候就方便了】
  getters: {},
  //书写异步操作
  actions: {
    //获取tag标签数据，异步操作所以用async
    async getTags({commit}, params = {}) {
      //当前这个reqTags个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
      //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
      let result = await reqTags(params);
      if (result.data.code == 200) {
        commit("GET_TAG", result.data.data);
        return "ok"
      } else {
        return Promise.reject(new Error("faile"));
      }
    },
    //添加tag并更新vuex中的tag值
    async addTag({commit}, {form}) {
      let result = await addTags(form);
      if (result) {
        commit("ADD_TAG", result.data.data)
        return "ok"
      } else {
        return Promise.reject(new Error("faile"));
      }
    }
  },
  modules: {}
}

export default tag
