<!--
 * @Author: he yan ying
 * @Date: 2022-03-28 20:07:22
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-29 19:55:42
 * @Description: 修改个人资料
-->
<!--
 * @Author: he yan ying
 * @Date: 2021-05-16 13:56:48
 * @LastEditors: he yan ying
 * @LastEditTime: 2022-03-10 17:50:46
 * @Description: 
-->
<template>
<div class="main">
   <div class="list-box">
    <blog-info-list></blog-info-list>
    <tag-list></tag-list>
    </div>
    <Header showHome v-if="isReLoad"></Header>
    <!-- <Tag @selectTags='tagBlogs' class="tagList"></Tag> -->
     <div class="info-box" >
      <el-form :model="form" :rules="rules" ref="form" class="info-form" label-width="80px">
        <el-form-item  prop="avatar" class="item">
          <div  class="avatar">
         <el-avatar :size="80" :src="imgStr" fit="cover"></el-avatar>
          </div>
          <input type="file" name="image" accept="image/*" @change='onchangeImg($event)' class="upload-btn">
        </el-form-item>
        <el-form-item label="用户名" prop="username" class="item">
          <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="created" label="生日" class="item">
          <el-date-picker type="date" placeholder="选择日期" v-model="form.created" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item prop="email" label="邮箱" class="item">
          <el-input  placeholder="邮箱不能为空" v-model="form.email" style="width: 100%;" prefix-icon="el-icon-eleme"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button style="margin-left:40%" type="primary" @click="submit('form')">保存</el-button>
          </el-row>
        </el-form-item>
      </el-form>
     </div>
  </div>
</template>

<script>
 import {setUserInfo, getUserInfo } from "@/untils/userInfo";
 import BlogInfoList from '@/components/list/BlogInfoList'
import TagList from '@/components/list/TagList'
import {queryName,updateInfo,uploadImg} from '@/api/index'
  
  export default {
    data() {
      var test_username = (rule, value, callback) => {
        if(this.form.username===this.userInfo.username){
          callback();
        }
        queryName({
          username:this.form.username
        }).then(function (response) {
          if (response.data.data==false){
            callback(new Error(response.data.msg))
          }
          callback();
        })
      };
      return {
        rules: {
          username: [
            // 有多个那么失去焦点时按顺序执行
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
            {
              required: true,
              pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
              message: '姓名不支持特殊字符',
              trigger: 'blur'
            },{
              // 有message的话上面的error不会显示
              required: true,
              validator:test_username,
              trigger: 'blur'
            }
          ],
         created: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ]
        },
        isReLoad:true,
        form:{
          id:'',
          username:'',
          avatar:'',
          created:'',
          email:''
        },
        imgStr:require('@/assets/css/img/user.jpg'),
      }
    },
    components:{
      BlogInfoList,
      TagList 
    },
    mounted(){
      this.form=this.userInfo
      this.imgStr=this.userInfo.avatar
      console.log(this.userInfo)
    },
    computed: {
      userInfo:function(){
        return getUserInfo()
      }
    },
    methods: {
     async onchangeImg(e){
        var file = e.target.files[0]
      console.log(file)
      // 获取图片的大小，做大小限制有用
      let imgSize = file.size
      console.log(imgSize)
      var _this = this // this指向问题，所以在外面先定义
      // 比如上传头像限制5M大小，这里获取的大小单位是b
      if (imgSize <= 50 * 1024) {
        // 合格
        console.log('大小合适')
           // base64方法 2
        var reader = new FileReader()
        reader.readAsDataURL(file) // 读出 base64
        reader.onloadend = function () {
          // 图片的 base64 格式, 可以直接当成 img 的 src 属性值
          var dataURL = reader.result
          console.log(dataURL)
          _this.imgStr = dataURL
          _this.form.avatar=dataURL
        }
      }else{
        this.$message.error('图片太大了');
      }
      },
     submit(form){
       this.$refs[form].validate((valid) => {
         if(valid){
          updateInfo(this.form).then((res)=>{
            if(res.data.data){
              setUserInfo(this.form)
              this.$notify({
                title: '修改成功',
                type: 'success'
              });
              this.isReLoad=false;
              this.$nextTick(function(){
                this.isReLoad=true
              })
            }else{
              this.$notify({
                title: '修改失败',
                type: 'error'
              });
            }
          })
         }else {
            return false;
          }
       })
    }
    }

  }
</script>

<style scoped>
  .main{
    padding: 50px;
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
.info-box{
  width: 900px;
  min-height:700px ;
  top: 280px;
  left: 500px;
  position:absolute;
  background-color: rgba(255, 255, 255, 0.5);
}
.avatar{
  text-align: center;
  margin: 30px;
}
.upload-btn{
  margin-left: 30%;
}
.info-form{
  width: 550px;
  margin: 0 auto;
}
.item{
  margin: 40px;
}
</style>

