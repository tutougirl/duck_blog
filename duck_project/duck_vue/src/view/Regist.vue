<template>
  <div>
    <el-container>
      <el-form :model="form" :rules="rules" ref="form" class="demo-form">
        <el-form-item label="用户名" prop="username" required>
          <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" required>
          <el-input type="password" v-model="form.password" autocomplete="off" prefix-icon="iconfont icon-unlock"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" required>
          <el-input type="password" v-model="form.checkPass" autocomplete="off" prefix-icon="iconfont icon-unlock"></el-input>
        </el-form-item>
        <el-form-item label="生日" required>
          <el-col :span="11">
            <el-form-item prop="created">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.created" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" required>
          <el-input v-model="form.email" prefix-icon="el-icon-eleme"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-button class="regist_button" type="primary" @click="submitForm('form')">立即注册</el-button>
            <el-button class="reset_button" @click="resetForm('form')">重置</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-container>
  </div>
</template>

<script>
  import {queryName,regist} from '@/api/index.js'

  export default {
    data() {
      var test_Pass = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error("两次输入的密码不一致！"));
        } else {
          callback();
        }
      };
      var test_username = (rule, value, callback) => {
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
        form: {
          username: '',
          password: '',
          created: '',
          email:'',
          status:'0'
        },
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
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              // pattern: /([a-zA-Z0-9][!@#$%^&()*])|([!@#$%^&()*][a-zA-Z0-9])+/,
              message: '密码必须由字母、数字、特殊符号组成，区分大小写',
              trigger: 'blur'
            }
          ],
          checkPass:[
            {
              required: true,
              message:'请确认密码！',
              trigger: 'blur'
            },
            {
              required: true,
              validator: test_Pass,
              trigger:'blur'
            }
          ],
         created: [
            { required: true, message: '请选择日期', trigger: 'blur' }
          ],
         email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            {pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+/,message:'请输入正确的邮箱格式！',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            var _this=this
            regist(this.form).then(function (response) {
              if (response.data.data===true){
                _this.tips();
                _this.$router.push({
                  path:'/login'
                })
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(form) {
        this.$refs[form].resetFields();
      },
      tips() {
        this.$notify({
          title: '成功',
          message: '注册成功请登陆！',
          type: 'success'
        });
      },
    }
  }
</script>

<style scoped lang="less">
  .el-form{
    background-color: #ffffff;
    /*表单边框*/
    border: 1px solid #DCDFE6;
    width: 350px;
    height: 550px;
    margin: 150px auto;
    /*设置各边上内边距的宽度*/
    padding: 35px 35px 15px 35px;
    /*设置圆角边框*/
    border-radius: 5px;
    /*处理圆角效果的*/
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    /*添加阴影*/
    box-shadow: 0 0 25px SlateGray;
    /*设置表单透明度*/
    filter:alpha(Opacity=90);
    -moz-opacity:0.9;
    opacity: 0.9;
  }
  .el-row{
    margin-top: 30px;
  }
  .reset_button{
    position: absolute;
    margin-left: 180px;
  }
</style>

