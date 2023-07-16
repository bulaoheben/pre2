<template>
<div style="height:50px;line-height:50px;border-bottom: 1px solid #ccc;display:flex">
  <div style="width:200px;padding-left:30px;font-weight: bold;font-size: 24px;color: dodgerblue">智慧养老系统</div>
  <div style="flex:1"></div>
  <div style="width:100px;margin-top:15px">
    <el-dropdown>
    <el-button class="el-dropdown-link" @click="exit">
      退出登录
<!--      <el-icon class="el-icon&#45;&#45;right">-->
<!--        <arrow-down />-->
<!--      </el-icon>-->
    </el-button>
<!--      <template #dropdown>-->
<!--        <el-dropdown-menu>-->
<!--          <el-dropdown-item @click="information">个人信息</el-dropdown-item>-->
<!--          <el-dropdown-item @click="exit">退出登录</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </template>-->
    </el-dropdown>
  </div>
</div>
</template>

<script>
export default {
  name: "Header",
  methods:{
    information(){

    },
    exit(){
      this.$router.push("/login")
    }
  }
}
</script>

<style scoped>

</style>