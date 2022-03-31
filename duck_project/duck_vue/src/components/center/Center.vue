<!--
 * @Author: he yan ying
 * @Date: 2022-02-10 15:11:36
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-09 16:26:28
 * @Description: 
-->
<template>
<div>
  <el-card class="center-card"  :style="sty">
  <div class="text-item">
    <a>修改资料</a>
    <a @click="TagMag">标签管理</a>
    <a @click="layOut">退出账号</a>
    <a>在线反馈</a>
  </div>
</el-card>
 <tag-manger v-show="visible" @mouseleave.native="leaveManger"></tag-manger>
</div>
</template>

<script>
import { getToken } from '@/untils/token'
import TagManger from '../tag/TagManger'
export default {
  components: { TagManger },
  name:'Center',
  props:['x','y'],
  data(){
   return {
     sty:{
       top:'',
       left:''
     },
     visible:false
   }
  },
 watch:{
   x:function(val){
     this.sty.left=(val+10)+'px'
   },
   y:function(val){
     this.sty.top=(val+30)+'px'
   }
 },
 methods:{
   layOut(){
     this.$store.dispatch('layOut')
     console.log(getToken())
     this.$router.push('/login')
   },
   TagMag(){
     this.visible=true
   },
   leaveManger(){
     this.visible=false;
   }
 }
}
</script>

<style scoped>
.center-card{
  width: 150px;
  height: 200px;
  position: absolute;
  z-index: 10;
}
.text-item  {
  display: flex;
  flex-direction: column;
}
.text-item  a{
  margin-top: 10px;
}
a:hover{
  color:#8DD35F; /* 鼠标划过链接 */
}
</style>

