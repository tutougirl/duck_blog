<!--
 * @Author: he yan ying
 * @Date: 2022-02-28 15:40:57
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-28 21:16:18
 * @Description: 
-->
<!--
 * @Author: he yan ying
 * @Date: 2022-02-11 20:00:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-02-28 15:39:39
 * @Description: 
-->
<template>
  <div  class="paper" @change="$emit('selectTags',checkList)">
  <el-tooltip class="item" effect="dark" placement="top-start">
  <div slot="content">在博客页面点击标签会分类显示该标签下的所有博客~<br/>点击“全部”标签会复原哦~</div>
  <h3>标签库</h3>
  </el-tooltip>
  <el-divider></el-divider>
  <div class="tag-box">
  <el-button size="mini" class="btn" :disable-transitions="false" v-show="empty">暂无数据</el-button>
  <el-button size="mini" class="btn" @click="handleClick({})">全部</el-button>
  <el-button size="mini" class="btn" v-for="tag in tags" :key="tag.id"   :disable-transitions="false" @click="handleClick(tag)">{{tag.name}}</el-button>
  </div>
  </div>
</template>

<script>
import {mapState, mapActions } from 'vuex'
import { getUserInfo } from "@/untils/userInfo";
export default {
  name:'TagList',
  data(){
     return {
        checkList: [],
        empty:false,
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
  mounted(){
    // this.getTags({userId:this.userInfo.id})
    //   if(this.tags.length===0){
    //     this.empty=true;
    //   }else{
    //     this.empty=false
    //   }
    this.getTagList(function(){
      this.$nextTick(()=>{
        if(this.tags.length===0){
           this.empty=true;
        }else{
          this.empty=false
       }
      })
    })
  },
  methods: {
    ...mapActions([
      'getTags',
    ]),
    handleClick(tag){
      this.$emit('clickTags',tag)
    },
    getTagList(callback){
      this.getTags({userId:this.userInfo.id}).then(()=>{
        callback()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-box{
  width: 250px;
}
.btn{
  float: left;
  margin: 5px; 
}
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
</style>