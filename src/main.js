import Vue from "vue";
import App from "./App.vue";
import router from "./router"; // 引入刚刚创建的路由实例
import Vant from "vant";
import axios from "axios";
import BigNumber from "bignumber.js";
import "vant/lib/index.css";

Vue.use(Vant);
// 全局配置 Axios
Vue.prototype.$http = axios;
// 将 BigNumber 挂载到 Vue 实例原型上
Vue.prototype.$BigNumber = BigNumber;
Vue.config.productionTip = false;

new Vue({
  router, // 挂载路由
  render: (h) => h(App),
}).$mount("#app");
