<!--
 * @Author: he yan ying
 * @Date: 2022-02-25 10:06:52
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-10 16:06:50
 * @Description: 
-->
<template>
  <el-dialog :visible.sync="visible" :show-close="false" :title="title" :modal-append-to-body="false">
    <el-form  :model="form">
      <el-form-item label="标签名称:" prop="tagName">
        <el-input  v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:30px">
        <el-button size="small" style="float:left"  @click="closeDialog">取 消</el-button>
        <el-button type="primary"  size="small" style="float:right" @click="addTag">确认</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapActions } from 'vuex'
import { getUserInfo } from "@/untils/userInfo";
import {updateTags} from '@/api/index' 
export default {
  name:'TagEdit',
  props:['visible','title','rowInfo'],
  computed:{
    userInfo:function(){
      return getUserInfo()
    }
  },
  data(){
     return {
        form:{
          id:'',
          name:''
        },
      };
  },
  watch:{
    rowInfo:function(val){
      this.form.id=val.id
      this.form.name=val.name
    }
  },
  methods:{
    ...mapActions([
      'getTags',
    ]),
  async addTag(){
    var _this=this
    if(this.rowInfo){
      updateTags(this.form).then((res)=>{
      if(res.data.data){
        _this.$notify({
          title: '修改成功！',
          type: 'success',
          duration: 500
      });
      this.closeDialog()
          setTimeout(() =>  {
          _this.getTags({userId:_this.userInfo.id});
        }, 1000);
      }else{
       _this.$notify({
        title: '添加失败',
        type: 'error',
        duration: 500
      });
      }
      })
    }else{
  //async直接返回promise对象，addTag加上async await会接受到return的东西
    try {
      await this.$store.dispatch('addTag',{form:this.form})
       _this.$notify({
        title: '添加成功！',
        type: 'success',
        duration: 500
      });
      this.closeDialog()
      setTimeout(() =>  {
          _this.getTags({userId:_this.userInfo.id});
        }, 1000);
    } catch (error) {
       _this.$notify({
        title: '失败',
        message: error,
        type: 'error',
        duration: 500
      });
    }
    }
  },
  closeDialog(){
    this.$emit('update:visible',false)
    this.form.name=''
  }
  }
}
</script>

<style>

</style>