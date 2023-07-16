<template>
  <div>
    <video ref="videoElement" autoplay></video>
    <el-form>
      <el-form-item>
        <el-button style="width: 100%; margin-top:15px" type="primary" @click="mounted">查看视频流</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import api from "@/api";

export default {
  methods:{
    mounted() {
      const videoElement = this.$refs.videoElement;

      // 创建一个新的MediaSource对象
      const mediaSource = new MediaSource();
      videoElement.src = URL.createObjectURL(mediaSource);

      // 在MediaSource打开时触发事件
      mediaSource.addEventListener('sourceopen', () => {
        // 创建一个SourceBuffer对象
        const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.42E01E"');

        // 获取视频流数据
        api.get('http://localhost:8080/api/video/video_feed', { responseType: 'arraybuffer' })
            .then(response => {
              const videoData = new Uint8Array(response.data);
              // 将视频流数据追加到SourceBuffer中
              sourceBuffer.appendBuffer(videoData);
            })
            .catch(error => {
              console.error('Error fetching video stream:', error);
            });
      });
      this.$router.push('../api/video/video_feed')
    }
  }
}
</script>

<style>
/* 样式可以根据需要进行自定义 */
</style>
