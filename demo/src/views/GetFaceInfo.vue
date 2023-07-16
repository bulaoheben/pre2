<template>
  <div id="AddOld">
    <el-main style="padding: 0">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item style="padding: 10px 0 2px 10px; font-size: 1.5em">老人信息</el-breadcrumb-item>
        <el-breadcrumb-item  style="padding: 15px 0 2px 0; font-size: 1.1em">录入信息</el-breadcrumb-item>
      </el-breadcrumb>
    <div>
      <!--开启摄像头-->
      <el-button style="margin-left: 5px;" type="primary" @click="callCamera">开启摄像头</el-button>
      <!--确认-->
      <el-button size="mini" type="primary" @click="photograph">拍照</el-button>
      <!--canvas截取流-->
      <canvas ref="canvas" width="320" height="240"></canvas>
      <!--图片展示-->
      <video ref="video" width="320" height="240" autoplay></video>
    </div>
    <el-form ref="form" :model="form">
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item ref="form" :model="form" style="margin-top:40px;margin-left: 150px;width:50%" prop="userName">
              <el-input v-model="form.username" placeholder="姓名："></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form-item ref="form" :model="form" style="margin-top:40px;margin-left: 5px;width:50%" prop="password">
              <el-input v-model="form.gender" show-password placeholder="性别："></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item style="margin-top:1px;margin-left: 150px;width:50%" prop="gender">
              <el-input v-model="form.gender" placeholder="性别："></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form-item style="margin-top:1px;margin-left: 5px;width:50%" prop="phone">
              <el-input v-model="form.phone" placeholder="手机号："></el-input>
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <div>
            <el-form-item style="margin-top:1px;margin-left: 150px;width:50%" prop="id_card">
              <el-input v-model="form.id_card" placeholder="身份证号："></el-input>
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div>
            <el-form-item style="margin-top:1px;margin-left: 5px" prop="birthday">
              <el-date-picker
                  v-model="form.birthday"
                  type="date"
                  placeholder="生日："
                  format="YYYY-MM-DD"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
    </el-form>
    </el-main>
  </div>
</template>


<script>
export default {
  data () {
    return {
      form:{},
      headImgSrc: require('@/assets/images/1.webp')
    }
  },
  methods: {
    // 调用摄像头
    callCamera () {
      // 调用电脑摄像头API
      navigator.mediaDevices.getUserMedia({
        size:('100,100'),
        video: true
      }).then(success => {
        // 摄像头开启成功
        this.$refs['video'].srcObject = success
        // 实时拍照效果
        this.$refs['video'].play()
      }).catch(error => {
        console.error('摄像头开启失败，请检查摄像头是否可用！')
      })
    },
    // 拍照
    photograph () {
      let ctx = this.$refs['canvas'].getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(this.$refs['video'], 0, 0, 447, 482, 0, 0, 200, 200)
      // 转base64格式、图片格式转换、图片质量压缩
      let imgBase64 = this.$refs['canvas'].toDataURL('images/new.jpeg', 0.7)

      // 由字节转换为KB 判断大小
      let str = imgBase64.replace('data:image/jpeg;base64,', '')
      let strLength = str.length
      let fileLength = parseInt(strLength - (strLength / 8) * 2)
      // 图片尺寸
      let size = (fileLength / 1024).toFixed(2)
      console.log(size)

      // 上传拍照信息  调用接口上传图片 .........

      // 保存到本地
      this.dialogCamera = false
      let ADOM = document.createElement('a')
      ADOM.href = this.headImgSrc
      ADOM.download = new Date().getTime() + '.jpeg'
      ADOM.click()
    },
    // 关闭摄像头
    closeCamera () {
      if (!this.$refs['video'].srcObject) {
        this.dialogCamera = false
        return
      }
      let stream = this.$refs['video'].srcObject
      let tracks = stream.getTracks()
      tracks.forEach(track => {
        track.stop()
      })
      this.$refs['video'].srcObject = null
    },
  }
}
</script>


