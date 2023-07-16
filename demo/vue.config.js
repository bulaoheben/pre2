const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  // 处理前后端跨域问题
  devServer: {
      // host:'127.0.0.1',
      // port:5000,
      // client: {
      //     webSocketURL: 'ws://127.0.0.1:5000/ws',
      // },
      headers: {
          'Access-Control-Allow-Origin': '*',
      },
      proxy:
      {
        // 任意名字，这里用api
          '/api': {
              target: 'http://localhost:5000/', // 需要跨域访问的目标域名和端口号
              changeOrigin: true,
              // 重写请求到后端
              pathRewrite: {
                '^/api': ''
              },
              ['/api/']:''
          }
      }
  }
})

