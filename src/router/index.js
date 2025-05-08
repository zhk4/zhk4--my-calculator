// src/router/index.js
import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import MembranePage from "@/components/MembranePage.vue";
import TapePage from "@/components/TapePage.vue";
import FertilizerPage from "@/components/FertilizerPage.vue";
import RopePage from "@/components/RopePage.vue";

import historicalRecordsPage from "@/components/historicalRecordsPage.vue";
import priceReferencePage from "@/components/priceReferencePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history", // 或者 'hash'，推荐 history 模式
  routes: [
    {
      path: "/",
      name: "RedirectToHome",
      redirect: "/home", // 设置根路径重定向到 /home
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    { path: "/membrane", component: MembranePage, name: "membrane" },
    { path: "/tape", component: TapePage, name: "tape" },
    { path: "/fertilizer", component: FertilizerPage, name: "fertilizer" },
    { path: "/rope", component: RopePage, name: "rope" },
    {
      path: "/historicalRecords",
      component: historicalRecordsPage,
      name: "historicalRecords",
    },
    {
      path: "/priceReference",
      component: priceReferencePage,
      name: "priceReference",
    },
  ],
});
