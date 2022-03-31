<!--
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 20:55:11
 * @Description: 
-->
<template>
  <div class="main">
    <Header showHome showBlogs></Header>
    <div class="mblog">
      <h2>{{ blog.title }}</h2>
      <el-link type="success" class="edit" icon="el-icon-edit" v-if="ownBlog" @click="toEdit">编辑</el-link>
      <el-link type="danger" class="del" icon="el-icon-delete" @click="toDel">删除</el-link>
      <el-divider></el-divider>
         <div class="content markdown-body" v-html="blog.description"></div>
      <el-divider></el-divider>
      <div class="content markdown-body" v-html="blog.content"></div>
    </div>
  </div>
</template>

<script>
  import 'github-markdown-css/github-markdown.css' // 然后添加样式markdown-body
  import Header from "@/components/header/Header";
  import {blogDetail,delBlog} from '@/api/index.js'
  import { getUserInfo } from "@/untils/userInfo";

  export default {
    name: "BlogDetail",
    components: {
      Header
    },
    data() {
      return {
        blog: {
          userId: null,
          title: "",
          description: "",
          content: ""
        },
        ownBlog: false
      }
    },
    computed: {
      userInfo:function(){
        return getUserInfo()
      }
    },
    methods: {
      getBlog() {
        // this.$route.params来获取路由中的参数
        const blogId = this.$route.query.blogId
        const _this = this
       blogDetail(blogId).then((res) => {
          console.log(res)
          console.log(res.data.data)
          _this.blog = res.data.data
          var MarkdownIt = require('markdown-it'),
            md = new MarkdownIt();
          var result = md.render(_this.blog.content);
          _this.blog.content = result
          // 判断是否是自己的文章，能否编辑,暂时没有用处
          _this.ownBlog =  (_this.blog.userId === _this.userInfo.id)
          console.log(_this.userInfo.id)
        });
      },
      toEdit(){
        const blogId = this.$route.query.blogId
        console.log(blogId)
        this.$router.push({
          path:'/add',
          query:{blogId:blogId}
        })
      },
      toDel(){
        this.$confirm('确定删除这篇优秀的博客吗 ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
            const blogId = this.$route.query.blogId
            console.log(blogId)
            delBlog(blogId).then((res)=>{
              if(res.data.data){
                this.$notify({
                    title: '删除成功',
                    type: 'success'
                  });
                this.$router.push({
                  path:'/blogs'
                })
              }else{
                  this.$notify({
                    title: '删除失败',
                    type: 'error'
                  });
              }
            })
        })
      }
    },
    created() {
      this.getBlog()
    }
  }
</script>

<style scoped>
  .del{
    margin-left: 10px;
  }
  .main{
  padding: 50px;
  }
  .mblog{
    margin-top: 50px;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.5);
  }
</style>
