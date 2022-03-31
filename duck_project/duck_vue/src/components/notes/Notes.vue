<!--
 * @Author: he yan ying
 * @Date: 2022-03-09 16:33:33
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 19:32:32
 * @Description: 
-->
<template>
  <div class="note-list">
    <div class="note-item" v-for="note in notes" :key="note">
      <div class="title">
      <el-avatar :src="require('@/assets/css/img/user.jpg')" fit="cover">
      </el-avatar>
      <p style="margin-left:5px">小何同学</p>
      </div>
      <el-card shadow="always" class="note-card">
        <div>{{note.content}}</div>
        <div class="date">{{note.created}}</div>
      </el-card>
    </div>
    <el-pagination class="mpage"
                @current-change="page"
                background
                layout="prev, pager, next"
                :current-page="currentPage"
                :page-size="pageSize"
                :total="total"

    >
   });
    </el-pagination>
  </div>
</template>

<script>
import {notes} from '@/api/index'
export default {
  name:'Notes',
  data(){
    return{
      notes:{},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      empty:false
    }
  },
  created(){
    this.page(1)
  },
  methods:{
      // 分页
      page(currentPage){
        const _this=this
        notes({currentPage:currentPage,userId:1}).then((res) => {
          // console.log(res.data.data.records)
          _this.notes = res.data.data.records
          _this.currentPage = res.data.data["current"]
          _this.total = res.data.data["total"]
          _this.pageSize = res.data.data["size"]
          if(_this.total===0)
            _this.empty=true;
        })
      },
  }
}
</script>

<style>
.mpage{
  bottom: 50px;
  position:absolute;
  left: 50%;
}
.title{
  display: flex;
}
.date{
  bottom: 10px;
  right: 15px;
  position: absolute;
}
.note-card{
  min-height: 100px;
  position: relative;
}
.note-item{
  min-height:150px ;
  padding: 10px;
  margin-bottom:30px ;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
