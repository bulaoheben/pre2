<template>
  <div>
    <h1>实时报表</h1>
    <ul>
      <li v-for="dataItem in dataItems" :key="dataItem.id">{{ dataItem.value }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dataItems: []
    };
  },
  mounted() {
    this.connectWebSocket(); // 连接WebSocket
  },
  methods: {
    connectWebSocket() {
      const socket = new WebSocket('ws://localhost:5000/ws'); // WebSocket连接地址
      socket.onmessage = event => {
        const newDataItem = JSON.parse(event.data);
        this.dataItems.push(newDataItem); // 接收到新数据时将其添加到列表中
      };
    }
  }
};
</script>
