<template>
  <div class="main">
      <Header showHome showBlogs></Header>
      <div class="blog-form">
        <el-form ref="ruleForm" :model="editForm" label-width="80px" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="摘要" prop="description">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>
          <el-form-item label="标签">
            <Tag @selectTags='getTag' :tagArr="tagArr"></Tag>
          </el-form-item>
          <el-form-item label="可见范围" prop=" status">
            <el-radio-group v-model="editForm.status">
              <el-radio  label="1" >公开</el-radio>
              <el-radio  label="0">私密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="内容" class="content_input" prop="content">
            <mavon-editor v-model="editForm.content"></mavon-editor>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="SubmitFrom">立即创建</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </div>
  </div>
</template>
<script>
  import Header from "@/components/header/Header";
  import {blogDetail,newBlog} from '@/api/index.js'
  import Tag from "@/components/tag/Tag";
  import {debounce} from 'lodash'
  export default {
    components: {Header,Tag},
    data() {
      return {
        editForm: {
          user_id:this.$store.state.user.userInfo.id,
          title:'',
          description:'',
          tagId:'',
          status:'1',
          content:''
        },
        tagArr:[],
        rules: {
          title: [
            {required: true, message: '请输入标题', trigger: 'blur'},
            {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
          ],
          content:[{required: true, message: '内容不能为空！', trigger: 'blur'}],
          status:[ {required: true, message: '请选择是否公开', trigger: 'blur'}],
          description: [
            {required: true, message: '请输入摘要', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      const blogId = this.$route.query.blogId
      const _this = this
      if(blogId) {
        blogDetail(blogId).then((res) => {
          const blog = res.data.data
          _this.tagArr=res.data.data.tagId.split(',').map(Number)
          _this.editForm.tagId=blog.tagId
          _this.editForm.id = blog.id
          _this.editForm.title = blog.title
          _this.editForm.status=blog.status
          _this.editForm.description = blog.description
          _this.editForm.content = blog.content
        });
      }
    },
    methods: {
      //提交表单增加防抖
      SubmitFrom:_.debounce(function(){
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            var _this=this
              // 向后端发起请求，提交数据
              newBlog(this.editForm)
              .then(function (response){
                if (response.data.data === true){
                  _this.tips()
                _this.$router.push({
                  path:'/blogs'
                })
                }else{
                  console.log("8888")
                 _this.$notify.error({
                  title: '错误',
                  message: response.data.msg
                });
                }
              })
          } 
        });
      },1000),
      getTag(tagList){
        this.editForm.tagId=tagList.sort().toString()
      },
      tips() {
        this.$notify({
          title: '上传成功',
          message: '博客已成功上传！',
          type: 'success',
          duration:1000
        });
      }
    }
  }
</script>
<style>
.blog-form{
  position: absolute;
  left: 120px;
  top:280px;
  width: 1200px;
}
.main{
  padding: 50px;
}
</style>
