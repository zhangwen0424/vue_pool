/*
 * @Date: 2021-10-19 17:09:07
 * @LastEditors: zhangwen
 * @LastEditTime: 2022-06-28 13:56:21
 * @FilePath: /vue_pool/2.vue_test/vue.config.js
 */
module.exports = {
  pages: {
    index: {
      // entry: "src/main.js",
      // entry: "09.src_全局事件总线$bus/main.js",
      entry: "18.插槽/2.src_具名插槽/main.js",
      // entry: "36.element-ui的使用/main.js",
    },
  },
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  //开启代理服务器（方式一）
  /* devServer: {
    proxy: 'http://localhost:5000'
  }, */
  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      "^/server1": {
        target: "http://localhost:5000", //允许跨域的目标服务器地址
        pathRewrite: { "^/server1": "" }, //请求路径是否要去掉/api
        // ws: true, //用于支持websocket
        changeOrigin: true, //用于控制请求头中的host值
      },
      "^/server2": {
        target: "http://localhost:5001",
        pathRewrite: { "^/server2": "" },
        // ws: true, //用于支持websocket
        // changeOrigin: true //用于控制请求头中的host值
      },
    },
  },
};
