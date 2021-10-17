// 官网：https://www.webpackjs.com/
const path = require("path");

module.exports = {
  // 入口
  entry: "./src/index.js",
  output: {
    // 虚拟打包路径（文件夹不会真正生成，在8080端口生成）
    publicPath: "xuni",
    filename: "bundle.js",
  },
  devServer: {
    // 端口号
    port: 8080,
    // 静态资源文件夹
    contentBase: "www",
  },
};
