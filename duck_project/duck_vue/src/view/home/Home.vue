<!--
 * @Author: he yan ying
 * @Date: 2022-02-08 19:19:52
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-10 15:43:14
 * @Description: 
-->
<template>
<div class="main">
<Header showBlogs></Header>
<div class="list-box">
<blog-info-list></blog-info-list>
<tag-list></tag-list>
</div>
<div class="notes-box">
  <Notes></Notes>
</div>
</div>
</template>

<script>
import BlogInfoList from '@/components/list/BlogInfoList'
import TagList from '@/components/list/TagList'
 import { getUserInfo } from "@/untils/userInfo";
import { setBlogTotal, setTagTotal} from "@/untils/list";
 import {blogs,getTagsTotal} from '@/api/index.js'
import Notes from '@/components/notes/Notes';
export default {
  components: { BlogInfoList,TagList,Notes },
  created(){
    blogs({currentPage:1,userId:this.userInfo.id}).then((res) => {
      setBlogTotal(res.data.data["total"])   
    })
    getTagsTotal({userId:this.userInfo.id}).then((res)=>{
      //持久存储tag数量
      setTagTotal(res.data.data)
    })
  },
  computed: {
      userInfo:function(){
        return getUserInfo()
      }
  },
    

}
</script>

<style lang="scss" scoped>
.main{
  padding: 50px;
}
.list-box{
  width: 300px;
  min-height:800px ;
  top: 250px;
  position:absolute;
}
.notes-box{
  width: 900px;
  min-height:700px ;
  top: 280px;
  left: 500px;
  position:absolute;
}
</style>