
<template>
  <div class="login-back">
    <el-container>
      <el-main>
        <!--      绑定script中data数据model="submitForm"-->
        <el-form :model="submitForm" :rules="rules" ref="ruleForm" class="LoginForm">
          <el-form-item label="用户名" prop="username">
            <!--  v-model  绑定data中数据"-->
            <el-input v-model="submitForm.username" prefix-icon="iconfont icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="submitForm.password" prefix-icon="iconfont icon-unlock"></el-input>
          </el-form-item>
          <el-row>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button  @click="regist">注册</el-button>
          </el-row>
        </el-form>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {login} from '@/api/index.js'
  import {mapActions} from 'vuex'
  export default {
    data() {
      return {
        // 登录表单的数据绑定对象
        submitForm: {
          username: '',
          password: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
            {
              required: true,
              pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9.·-]+$/,
              message: '姓名不支持特殊字符',
              trigger: 'blur'
            }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'change' },
            {
              // pattern: /([a-zA-Z0-9][!@#$%^&()*])|([!@#$%^&()*][a-zA-Z0-9])+/,
              message: '密码必须由字母、数字、特殊符号组成，区分大小写',
              trigger: 'blur'
            }
          ]
        }
      };
    },
    methods: {
       ...mapActions([
        'userLogin',
      ]),
     login() {
        // 发起请求后this会丢失，先保存
        var that=this
        this.$refs.ruleForm.validate( async(valid) => {
          if (valid) {
            // 向后端发起请求，提交数据
           try {
            await this.$store.dispatch('userLogin',this.submitForm)
            console.log('555')
              alert("登陆成功！")
              that.$router.push({
                path:'/home'
              })
           } catch (error) {
              that.$notify.error({
              title: '错误',
              message: "登陆失败"
            });
           }
          } else {
            console.log('校验不通过');
            return false;
          }
        });
      },
      regist(){
         this.$router.push({
            path:'/regist'
          })
      }      
    }
  }
</script>

<style scoped lang="less">
.login-back{
  background-image: url("~@/assets/css/img/login.jpg");
}
  .el-form{
    background-color: white;
    /*表单边框*/
    border: 1px solid #DCDFE6;
    width: 350px;
    height: 300px;
    margin: 200px auto;
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
    margin-top: 50px;
    /*文本对齐方式*/
    text-align: center;
  }
  .el-button{
    text-align: center;
    width:150px ;
    margin-top: 0px;

  }
</style>

