/*
 * @Author: he yan ying
 * @Date: 2022-02-07 17:19:06
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 20:51:47
 * @Description: 接口统一管理
 */
import request from './request'


export const login = (param) => request({url: '/login', method: 'post', data: param});
export const regist = (param) => request({url: '/regist', method: 'post', data: param});
export const queryName = (param) => request({url: '/query_name', method: 'post', data: param});
export const blogs = (param) => request({url: '/blogs', method: 'get', params: param});
export const blogDetail = (param) => request({url: '/blog/' + param, method: 'get'});
export const newBlog = (param) => request({url: '/blog/edit', method: 'post', data: param});
export const delBlog = (param) => request({url: '/delete/' + param, method: 'get'})
export const reqTags = (param) => request({url: '/tags', method: 'get', params: param})
export const addTags = (param) => request({url: '/addTag', method: 'post', data: param})
export const getTagsTotal = (param) => request({url: '/tagsTotal', method: 'get', params: param})
export const updateTags = (param) => request({url: '/updateTags', method: 'post', data: param})
export const delTags = (param) => request({url: '/delTags', method: 'get', params: param})
export const sortBlogs = (param) => request({url: '/sortBlog', method: 'get', params: param});
export const notes = (param) => request({url: '/notes', method: 'get', params: param});
export const updateInfo = (param) => request({url: '/save', method: 'post', data: param});



