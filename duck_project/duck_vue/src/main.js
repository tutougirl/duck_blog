/*
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-28 12:44:15
 * @Description:
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, {MessageBox} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import less from 'less'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 添加全局样式
import './assets/css/globle.css';
// 引入iconfront
import './assets/font/iconfont.css'
// 引入vuex-store
import store from './store/index';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
//引入路由守卫
import './permission'

//全局注册组件
import Header from "@/components/header/Header";
import Center from "@/components/center/Center"

Vue.use(mavonEditor)
Vue.prototype.$confirm = MessageBox.confirm
Vue.use(less)
Vue.prototype.$axios = axios;
Vue.use(ElementUI);

Vue.config.productionTip = false
Vue.component('Header', Header)
Vue.component('Center', Center)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
router.beforeEach((to, from, next) => {　//出现进度条
  NProgress.start()
  next()
})

router.afterEach(() => {  //进度条消失
  NProgress.done()
})
