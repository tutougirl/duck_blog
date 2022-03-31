/*
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-28 20:13:08
 * @Description:
 */
import Vue from 'vue'
import Router from 'vue-router'
import Login from "../view/Login";
import Home from "../view/home/Home";
import Blogs from "../view/blog/Blogs";
import Regist from "../view/Regist";
import BlogEdit from "../view/blog/BlogEdit";
import BlogDetail from "../view/blog/BlogDetail";
import tagManger from "@/components/tag/tagManger";
import Info from "@/view/infoCard/Info";

Vue.use(Router)


export default new Router({
  routes: [
    // 重定向
    {
      path: "/",
      redirect: '/login'

    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/home",
      name: "Home",
      meta: {
        requireAuth: true
      },
      component: Home
    },
    {
      path: "/regist",
      name: "Regist",
      component: Regist
    },
    {
      path: "/add",
      name: "Edit",
      meta: {
        requireAuth: true
      },
      component: BlogEdit
    },
    {
      path: "/blogs",
      name: "Home",
      meta: {
        requireAuth: true
      },
      component: Blogs
    },
    {
      path: "/info",
      name: "Info",
      meta: {
        requireAuth: true
      },
      component: Info
    },
    {
      path: "/blog_detail",
      name: "BlogDetail",
      meta: {
        requireAuth: true
      },
      component: BlogDetail
    },
    {
      path: "/tagManger",
      name: "tagManger",
      meta: {
        requireAuth: true
      },
      component: tagManger
    },
  ]
})
