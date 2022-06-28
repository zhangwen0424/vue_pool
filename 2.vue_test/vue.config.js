/*
 * @Date: 2021-10-19 17:09:07
 * @LastEditors: zhangwen
 * @LastEditTime: 2021-11-24 15:37:15
 * @FilePath: /vue_test/vue.config.js
 */
module.exports = {
  pages: {
    index: {
      // entry: 'src/main.js'
      entry: '36.element-ui的使用/main.js'
    }
  },
  lintOnSave: false,// eslint-loader 是否在保存的时候检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      '^/server1': {
        target: 'http://localhost:5000',//允许跨域的目标服务器地址
				pathRewrite:{'^/server1':''},//请求路径是否要去掉/api
        // ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      },
      '^/server2': {
        target: 'http://localhost:5001',
				pathRewrite:{'^/server2':''},
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      }
    }
  }
}