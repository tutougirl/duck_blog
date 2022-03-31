<!--
 * @Author: he yan ying
 * @Date: 2022-02-28 15:04:21
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-28 21:13:51
 * @Description: 
-->
<template>
  <div class="paper">
  <h3>博客信息</h3>
  <el-divider></el-divider>
  <ul class="blog_list">
    <li>已发表博客{{blogTotal}}篇</li>
    <li>博客标签共{{tagTotal}}个</li>
    <li>最近登录时间:<br/> {{userInfo.loginTime}}</li>
  </ul>
</div>
</template>

<script>
import {mapState, mapActions } from 'vuex'
import { getUserInfo } from "@/untils/userInfo";
import { getBlogTotal,getTagTotal} from "@/untils/list";

export default {
name:'BlogInfoList',
data(){
  return{
  
  }
},
created(){

},
computed:{
  userInfo:function(){
    return getUserInfo()
  },
  blogTotal:function(){
    return getBlogTotal()
  },
  tagTotal:function(){
    return getTagTotal()
  }
},
}
</script>

<style lang="scss" scoped>
  .paper {
    width: 250px;
    position: relative;
    float: left;
    margin: 30px auto;
    padding: 30px 20px;
    border: 1px solid #efefef;
    background-color: #FFFFFD;
    background-image: url('~@/assets/css/img/paper.png');
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06) inset;

    &::before, &::after {
      content: '';
      z-index: -1;
      position: absolute;
      left: 10px;
      bottom: 10px;
      width: 45%;
      height: 55%;
      max-height: 100px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
      transform: skew(-15deg) rotate(-4deg);
    }
    &::after {
      left: auto;
      right: 10px;
      transform: skew(15deg) rotate(4deg);
    }

    h3{
      text-align: center;
    }
  }
  .blog_list{
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
    // font-size: 15px;
    // font-weight: bold;
    line-height:40px;
    -webkit-background-clip: text;

    li{
      list-style: none;
    }

    }
</style>