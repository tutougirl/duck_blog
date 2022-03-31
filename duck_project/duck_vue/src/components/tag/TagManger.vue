<!--
 * @Author: he yan ying
 * @Date: 2022-02-24 11:23:04
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-24 21:14:34
 * @Description: 
-->
<template>
  <el-card  class="tag-card">
    <el-table
      :data="tags"
      height="550"
      style="width: 100%"
      >
    <el-table-column
      label="创建时间"
      width="180">
      <template slot-scope="scope">
         <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.created }}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column
      label="标签名"
      width="180">
      <template slot-scope="scope">
         <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{scope.row.name}}</el-tag>
          </div>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row,$event)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <h3 @click="$emit('update:closeFlag',closeFlag=false)">X</h3>
        <el-button size="mini" @click="addTag">添加标签</el-button>
      </template>
    </el-table-column>
    </el-table>
    <tag-edit :visible.sync="visible" :rowInfo="tagInfo"></tag-edit>
  </el-card>
</template>

<script>
import {mapState, mapActions } from 'vuex'
import { getUserInfo } from "@/untils/userInfo";
import TagEdit from './TagEdit';
import {delTags} from '@/api/index' 
export default {
  name:'TagManger',
  components:{TagEdit},
  props:'closeFlag',
  computed:{
     ...mapState({
      tags:(state)=>state.tag.tags
    }),
    userInfo:function(){
      return getUserInfo()
    }
  },
  mounted(){
    this.getTags({userId:this.userInfo.id})
    console.log("9999")
  },
  data(){
    return{
      edit:true,
      visible:false,
      tagInfo:''
    }
  },
  methods:{
    ...mapActions([
      'getTags',
    ]),
    handleEdit(index, row,event) {
      this.visible=true;
      this.tagInfo=row
    },
    handleDelete(index, row) {
      let _this=this
      delTags({tagId:row.id}).then((res)=>{
        if(res.data.data){
         _this.$notify({
          title: '删除成功！',
          type: 'success',
          duration: 500
      });
        setTimeout(() =>  {
          _this.getTags({userId:_this.userInfo.id});
        }, 1000);
        }else{
          _this.$notify({
            title: '删除失败！',
            type: 'error',
            duration: 500
          });
        }
      })
    },
    addTag(){
      this.visible=true;
    },
    tbCellDbllCick(row){
      console.log(row)
    }
  }
}
</script>

<style>
.tag-card{
  width: 800px;
  height: 600px;
  position:fixed;
  top:50%;
  left:50%;
  transform:translateX(-50%) translateY(-50%);
  z-index: 9999;
}
.btn{
  display: flex;
  flex-direction: column;
  text-align: center;
}
.tag-row{
  margin: 20px;
}
</style>