<template>
  <div>
    <video ref="videoElement" autoplay></video>
    <div v-if="countdown > 0" class="countdown">{{ countdown }}</div>
    <button @click="capture" style="height: 40px">截图</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countdown: 0,
      stream: null,
    };
  },
  mounted() {
    this.initializeCamera();
  },
  methods: {
    async initializeCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.$refs.videoElement.srcObject = stream;
        this.stream = stream;
      } catch (error) {
        console.error('Failed to initialize camera: ', error);
      }
    },
    capture() {
      this.countdown = 3;
      const countdownTimer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(countdownTimer);
          this.takeSnapshot();
        }
      }, 1000);
    },
    takeSnapshot() {
      const videoElement = this.$refs.videoElement;
      const canvas = document.createElement('canvas');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      canvas.getContext('2d').drawImage(videoElement, 0, 0);
      const imageDataUrl = canvas.toDataURL('image/jpeg');

      // 发送图像数据到后端
      const name = 'wj'; // 替换采集对象的名字
      axios.post('http://localhost:8080/api/video/collect_face', { name, imageDataUrl })
          .then(() => {
            console.log('Face collection completed.');
          })
          .catch((error) => {
            console.error('Failed to collect face:', error);
          });
    },
  },
  beforeDestroy() {
    if (this.stream) {
      this.stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  },
};
</script>
