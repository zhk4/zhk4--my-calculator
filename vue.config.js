const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // 后端服务地址
        changeOrigin: true, // 支持虚拟目录
        pathRewrite: {
          "^/api": "", // 请求路径重写，去掉 /api 前缀
        },
      },
    },
  },
});
