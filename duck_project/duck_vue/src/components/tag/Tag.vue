<!--
 * @Author: he yan ying
 * @Date: 2022-02-11 20:00:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 20:13:01
 * @Description: 
-->
<template>
  <el-checkbox-group v-model="checkList" class="tag-group" @change="$emit('selectTags',checkList)">
  <el-checkbox class="tag" v-for="tag in tags" :key="tag.id"  :label="tag.id">{{tag.name}}</el-checkbox>
  <el-tag class="btn" @click="showTagEdit" v-show="$route.path!='/blogs'">+添加标签</el-tag>
  <tag-edit :visible.sync="showPopover" :title="title">
  </tag-edit>
  </el-checkbox-group>
</template>

<script>
import {mapState, mapActions } from 'vuex'
import { getUserInfo } from "@/untils/userInfo";
import TagEdit from './TagEdit';

export default {
  components: { TagEdit },
  name:'Tag',
  data(){
     return {
        checkList: [],
        form:{
          name:''
        },
        title:'添加标签',
        showPopover:false
      };
  },
  props:["tagArr"],
  computed: {
    ...mapState({
      tags:(state)=>state.tag.tags
    }),
    userInfo:function(){
      return getUserInfo()
    }
  },
   watch:{
   tagArr:function(val){
     this.checkList=val
     console.log(val)
   },
 },
  mounted(){
    this.getTags({userId:this.userInfo.id})
    console.log("9999")
  },
  methods: {
      ...mapActions([
      'getTags',
    ]),
  showTagEdit(){
    if(this.showPopover===false){
        this.showPopover=true
    }
  },
  }
}
</script>

<style>
.tag-group{
  margin: 5px 0px;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
}
.tag{
  min-width:60px;
  min-height: 30px;
}
.btn{
  width:90px;
  height: 30px;
  margin-top: 5px;
  margin-left: 10px;
}
</style>