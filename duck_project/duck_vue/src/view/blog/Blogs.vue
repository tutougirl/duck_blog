<!--
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 20:28:20
 * @Description: 
-->
<template>
<div class="main">
   <div class="list-box">
    <blog-info-list></blog-info-list>
    <tag-list @clickTags='handelTag'></tag-list>
    </div>
    <Header showHome></Header>
    <!-- <Tag @selectTags='tagBlogs' class="tagList"></Tag> -->
    <div class="block"  @click="toBlog">
      <el-timeline>
        <el-timeline-item class="blog-card" :timestamp="blog.created" placement="top" v-for="blog in blogs" :key="blog">
          <el-card class="blog-card">
            <a>
              <h4 :data-blogId="blog.id">{{blog.title}}</h4>
            </a>
            <p>{{blog.description}}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
      <!--    分页-->
    <el-pagination class="mpage"
                   @current-change="page"
                   background
                   layout="prev, pager, next"
                   :current-page="currentPage"
                   :page-size="pageSize"
                   :total="total"
                   v-show="!empty"

    >
      });
    </el-pagination>
    </div>
    <!-- <h1 style="margin-left:400px" v-show="empty">暂无博客</h1> -->
    <el-empty description="暂无博客" v-show="empty"></el-empty>
  </div>
</template>

<script>
  import {blogs,sortBlogs} from '@/api/index.js'
  import Tag from "@/components/tag/Tag";
 import { getUserInfo } from "@/untils/userInfo";
 import BlogInfoList from '@/components/list/BlogInfoList'
import TagList from '@/components/list/TagList'
  
  export default {
    name: "Blogs",
    data() {
      return {
        blogs: {},
        currentPage: 1,
        total: 0,
        pageSize: 5,
        empty:false
      }
    },
    components:{
      Tag,
      BlogInfoList,
      TagList 
    },
    computed: {
      userInfo:function(){
        return getUserInfo()
      }
    },
    methods: {
      // 分页
      page(currentPage){
        const _this=this
        console.log("id---"+this.userInfo.id)
        blogs({currentPage:currentPage,userId:this.userInfo.id}).then((res) => {
          // console.log(res.data.data.records)
          _this.blogs = res.data.data.records
          _this.currentPage = res.data.data["current"]
          _this.total = res.data.data["total"]
          _this.pageSize = res.data.data["size"]
          if(_this.total===0)
            _this.empty=true;
        })
      },
      //按招tag分类展示blogs
      handelTag(tag){
        if(tag.id===null||tag.id===undefined){
          this.page(1)
          return
        }
        const _this=this
        sortBlogs({currentPage:1,tagId:tag.id,userId:this.userInfo.id}).then((res)=>{
           _this.blogs = res.data.data.records
          _this.currentPage = res.data.data["current"]
          _this.total = res.data.data["total"]
          _this.pageSize = res.data.data["size"]
        })
      },
      toBlog(event){
        let element=event.target;
        //dataset获取自定义标签，解构出自定义标签值
        let {blogid}=element.dataset;
        if(blogid){
          this.$router.push({
            name:'BlogDetail',
            query:{
              blogId:blogid
            }
        })
        }
      }
    },
    created() {
      this.page(1)
    }

  }
</script>

<style scoped>
  .main{
    padding: 50px;
  }
  .mpage{
    bottom: 50px;
    position:absolute;
    left: 50%;
  }
  .block{
    min-height: 700px;
    left: 450px;
    top:280px;
    position: absolute;
  }
  .blog-card{
    width: 900px;
  }
  .tagList{
    margin: 20px 60px;
  }
  .list-box{
  width: 300px;
  min-height:800px ;
  top: 250px;
   position:absolute;
}
</style>

