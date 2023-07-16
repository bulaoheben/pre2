<template>
  <div style="width:100%;height:100vh;overflow: hidden" id="reg">
    <div style="width:400px;margin:150px auto">
      <div style="color:black;font-size: 28px;text-align: center;margin-top:120px">欢迎注册</div>
      <el-form ref="form" :model="form" :rules="rules">
      <el-row>
        <el-col :span="12">
          <div>
              <el-form-item ref="form" :model="form" style="margin-top:40px;margin-right: 5px" prop="userName">
                <el-input v-model="form.userName" placeholder="用户名："></el-input>
              </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
              <el-form-item ref="form" :model="form" style="margin-top:40px;margin-left: 5px" prop="password">
                <el-input v-model="form.password" show-password placeholder="密码："></el-input>
              </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
              <el-form-item style="margin-top:1px;margin-right: 5px" prop="realName">
                <el-input v-model="form.realName" placeholder="真实姓名："></el-input>
              </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
              <el-form-item style="margin-top:1px;margin-left: 5px" prop="sex">
                <el-input v-model="form.sex" placeholder="性别："></el-input>
              </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
              <el-form-item style="margin-top:1px;margin-right: 5px" prop="email">
                <el-input v-model="form.email" placeholder="邮箱："></el-input>
              </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
              <el-form-item style="margin-top:1px;margin-left: 5px" prop="phone">
                <el-input v-model="form.phone" placeholder="手机号码："></el-input>
              </el-form-item>
          </div>
        </el-col>
      </el-row>
      </el-form>
      <el-form-item>
        <el-button style="width: 100%;margin-top:15px" type="primary" @click="reg">注册</el-button>
      </el-form-item>
    </div>
  </div>
</template>

<script>
import api from "@/api";

export default {
  name: "register",
  data() {
    return {
      form: {},
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
  methods: {
    reg() {
      this.$refs['form'].validate((valid=>{
        if(valid){
          // 现在尝试用你封装过的axios接口请求
          api.post('http://localhost:8080/api/register',this.form, {
            headers: {
              "content-type": "multipart/form-data"
            }
          })
              .then(res=>{
                if(res.code === '200'){
                  this.$message({
                    type:"success",
                    message:"注册成功"
                  })
                  this.$router.push("/login")
                }
                else{
                  this.$message({
                    type:"error",
                    message:"用户名已存在"
                  })
                }
              })
              .catch(err=>{
                this.form = 'error' + err;
              });
        }
      }))
    }}
}
</script>

<style scoped>
#reg{
  background: url("../assets/images/background.png") no-repeat;
  width:100%;
  height:100%;
  position:fixed;
  background-size:100% 100%;
}
</style>