<!--
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 19:36:50
 * @Description: 
-->
<template>
  <div class="m-content">
    <!-- <h3>欢迎来到{{userInfo.username}}的博客</h3> -->
    <div class="block">
      <el-avatar :size="50" :src="userInfo.avatar" fit="cover"></el-avatar>
      <h3>{{ userInfo.username }}</h3>
    </div>
    <el-menu :default-active="activeIndex" class="menu" mode="horizontal" text-color="#303133" active-text-color="#1989FB" router>
      <el-tooltip class="item" effect="dark" content="何同学碎碎念~" placement="top-start">
      <el-menu-item index="/home" class="menu-item">主页</el-menu-item>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="发表一篇博客吧！" placement="top-start">
      <el-menu-item index="/add"  class="menu-item">发表</el-menu-item>
      </el-tooltip>
      <el-menu-item index="/blogs"  class="menu-item">博客</el-menu-item>
      <el-submenu index="4" class="menu-item">
        <template slot="title">我的</template>
        <el-menu-item index="/info" >修改资料</el-menu-item>
        <el-menu-item index="4-2" @click="visible=true">标签管理</el-menu-item>
        <el-menu-item index="4-3" @click="layOut">退出登录</el-menu-item>
      </el-submenu>
      <el-menu-item class="menu-item">
        <el-tooltip class="item" effect="dark" content="凑数而已，显的功能很多的样子" placement="top-start">
        <img :src="require('@/assets/css/img/hashiqi.svg')" class="dog-img">
        </el-tooltip>
      </el-menu-item>
      <!-- <el-menu-item class="menu-item">
        <el-tooltip class="item" effect="dark" content="别看了，我也是凑数的~" placement="top-start">
        <img :src="require('@/assets/css/img/bage.svg')" class="dog-img">
        </el-tooltip>
      </el-menu-item> -->
    </el-menu>
    <tag-manger v-show="visible" @mouseleave.native="leaveManger" :closeFlag.sync="visible"></tag-manger>
    <!-- 另一种导航栏样式 -->
    <!-- <div>
      <el-divider direction="vertical" v-if="showHome"></el-divider>
      <el-link class="el-icon-s-home" @click="toHome" type="primary" v-show="showHome">主页</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link class="el-icon-edit-outline" @click="toAdd" type="primary">发表</el-link>
      <el-divider direction="vertical" v-if="showBlogs"></el-divider>
      <el-link class="el-icon-document-copy" type="danger" @click="toBlogs" v-show="showBlogs">博客</el-link>
      <el-divider direction="vertical"></el-divider>
      <el-link class="el-icon-user" type="danger" @mouseenter.native="toCenter" @mouseleave.native="leaveCenter">我的</el-link>
      <el-divider direction="vertical"></el-divider>
      <transition name="center">
      <Center v-show="showCenter" :x="mouse_x" :y="mouse_y" @mouseenter.native=" mouseEnterCard"  @mouseleave.native="leaveCenter"></Center>
    </transition>
    </div> -->
  </div>
</template>
<script>
import { getUserInfo } from "@/untils/userInfo";
import TagManger from '../tag/TagManger'
  export default {
    name: "Header",
    components: { TagManger },
    props:{
      showHome:{default:false,type:Boolean},
      showBlogs:{default:false,type:Boolean}
    },
    data() {
      return {
        activeIndex: '1',
        hasLogin: false,
        visible:false,
        mouse_x:'',
        mouse_y:'',
        timer:null,
        blogs: {},
        currentPage: 1,
        total: 0
      }
    },
     computed: {
      userInfo:function(){
        return getUserInfo()
      }
    },
    methods: {
      layOut(){
        this.$store.dispatch('layOut')
        this.$router.push('/login')
      },
      toCenter(event){
        const{x,y}=event
        this.mouse_x=x;
        this.mouse_y=y;
        this.showCenter=true;
      },
      leaveCenter(){
        //离开我的定时关闭卡片
        this.timer=setTimeout(() => {
          this.showCenter=false;
        }, 500);
      },
     mouseEnterCard() {
      if(this.timer) {
        //进入卡片清除定时器
        clearTimeout(this.timer)
      }
    }
    },
    // 从store中取出用户信息存到data中定义的变量user中
    created() {
      if(this.userInfo.username) {
        this.hasLogin = true
      }
      // //2秒之后如果鼠标所在元素的class或者父元素的class不是el-card__body就关闭卡片
      // window.addEventListener('mouseover',this.handelMouse)
    },
  }
</script>

<style scoped>
  .dog-img{
    width: 80px;
    height: 50px;
  }
  .m-content{
    text-align: center;
  }
  .menu{
    width: 100%;
    display: flex;
  }
  .menu-item{
    width: 300px;
  }
  /* .center-enter-active, .center-leave-active {
  transition: opacity .5s;
  } */
 /* .center-enter, .center-leave-to {
  opacity: 0;
  }
  */
</style>

