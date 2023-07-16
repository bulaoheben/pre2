<template>
<div style="width:100%;height:100vh;overflow: hidden" id="login">
  <div style="width:400px;margin :150px auto">
    <div style="color: darkblue; font-weight:bold; font-size: 28px;text-align: center;margin-top:90px">智能养老系统</div>
    <div style="color:black;font-weight:bold; font-size: 20px;text-align: center;margin-top:50px">登录</div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item ref="form" :model="form" prop="username" style="margin-top:20px">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item style="margin-top:15px" prop="password">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 100%; margin-top:15px" type="primary" @click="login">登录</el-button>
      </el-form-item>
      <a href=" " style="color:white;margin-right: 20px" @click="goToRegister">没密码？去注册</a>
    </el-form>
  </div>
</div>
</template>

<script>
import api from "@/api";

export default {
  name: "Login",
  data(){
    return{
      form:{},
      rules:{
        username:[{
          required:true,
          message:'请输入用户名',
          trigger:blur
        }],
        password:[{
          required:true,
          message:'请输入密码',
          trigger:blur
        }]
      }
    }
  },
  methods:{
  login(){
    this.$refs['form'].validate((valid=>{
      if(valid){
        // 现在尝试用你封装过的axios接口请求
        api.post('http://localhost:8080/api/login',this.form, {
          headers: {
            "content-type": "multipart/form-data"
          }
        }).then(res=>{
              // 后面如何处理返回200和400的情况你自己看一看
              if(res.code === '200'){
                this.$message({
                  type:"success",
                  message:"登录成功"
                })
                this.$router.push("/home")
              }
              else{
                this.$message({
                  type:"error",
                  message:"用户名或密码错误"
                })
              }
            })
            .catch(err=>{
              // 这里为什么要把错误信息放进请求表单里？
               this.form = 'error' + err;
            });
      }
    }))
  },
    goToRegister() {
      // 在此处执行跳转至注册界面的操作
      this.$router.push('/register');
    }

  }
}
</script>

<style scoped>
#login{
  background: url("../assets/images/background.png") no-repeat;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>