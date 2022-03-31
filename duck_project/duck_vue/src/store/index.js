/*
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-15 15:07:03
 * @Description:
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tag from './modules/tag'

Vue.use(Vuex)


export default new Vuex.Store({
  modules: {
    user,
    tag
  },
  state: {},
  mutations: {},
  actions: {},
  getters: {}
})
