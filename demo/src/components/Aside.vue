<template>
<div>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
          style="width:200px; min-height:calc(100vh - 50px)"
          active-text-color="#ffd04b"
          background-color="#545c64"
          class="el-menu-vertical-demo"
          default-active="2"
          text-color="#fff"
      >
        <el-sub-menu index="1">
          <template #title>
            <el-icon><location/></el-icon>
            <span style="font-size:16px">主页</span>
          </template>
            <el-menu-item index="1-1" @click="userlist">管理员信息列表</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><icon-menu/></el-icon>
            <span style="font-size:16px">人员管理</span>
          </template>
          <el-menu-item index="2-1" @click="Employee">工作人员信息列表</el-menu-item>
          <el-menu-item index="2-2" @click="volunteer">义工信息列表</el-menu-item>
          <el-menu-item index="2-3" @click="oldPeople">老人信息列表</el-menu-item>
          <el-menu-item index="2-4" @click="GetFace">人脸信息采集</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><document/></el-icon>
            <span style="font-size:16px">统计分析</span>
          </template>
          <el-menu-item index="3-1" @click="oldStatistics">义工年龄段统计</el-menu-item>
          <el-menu-item index="3-2" @click="statistics">老人年龄段统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><document/></el-icon>
            <span style="font-size:16px">事件记录</span>
          </template>
          <el-menu-item index="4-1" @click="event">事件监测</el-menu-item>
          <el-menu-item index="4-2" @click="video">交互检测</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
            <template #title>
                <el-icon><location/></el-icon>
                <span style="font-size:16px" @click="voice">语音助手</span>
            </template>
        </el-sub-menu>
        <el-sub-menu index="6">
          <template #title>
            <el-icon><icon-menu/></el-icon>
            <span style="font-size:16px">摄像头</span>
          </template>
          <el-menu-item index="2-1" @click="camera">人脸识别</el-menu-item>
          <el-menu-item index="2-2" @click="camera1">跌倒检测</el-menu-item>
          <el-menu-item index="2-3" @click="camera2">禁区入侵</el-menu-item>
        </el-sub-menu>
<!--        <el-menu-item index="4">-->
<!--          <el-icon><setting /></el-icon>-->
<!--          <span style="font-size:16px">统计分析</span>-->
<!--        </el-menu-item>-->
      </el-menu>
    </el-col>
  </el-row>



</div>
</template>

<script>
export default {
  name: "Aside",
  methods:{
    userlist(){
      this.$router.push("/userlist")
    },
    volunteer(){
      this.$router.push("/Volunteer")
    },
    stranger(){
      this.$router.push("/Stranger")
    },
    Employee(){
      this.$router.push("/employee")
    },
    video(){
      this.$router.push("/video/video_feed")
    },
    oldPeople(){
      this.$router.push("/oldPeopleInfo")
    },
    GetFace(){
      this.$router.push("/video/collect_face")
    },
    voice(){
      this.$router.push("/voice")
    },
    statistics(){
      this.$router.push("/statistics")
    },
    oldStatistics(){
      this.$router.push("/oldStatistics")
    },
    event(){
      this.$router.push("/Event")
    },
    camera(){
      this.$router.push("/camera")
    },
    camera1(){
      this.$router.push("/camera1")
    },
    camera2(){
      this.$router.push("/camera2")
    }
  }
}
</script>

<style scoped>

</style>