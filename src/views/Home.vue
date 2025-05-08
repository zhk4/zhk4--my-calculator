<template>
  <div class="home_container">
    <van-row
      style="display: flex; justify-content: center"
      class="van-row-class"
    >
      <van-col span="22" class="title">
        <img src="@/img/list5.png" alt="农资店铺商品价格计算器" />
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-around">
      <van-col
        span="10"
        v-for="(category, index) in categories"
        :key="index"
        class="van-row-class"
      >
        <div
          :class="['category-card', category.color]"
          :style="{ backgroundImage: 'url(' + category.image + ')' }"
          @click="goToCategory(category.name)"
        >
          <div class="category-content">
            {{ category.title }}
          </div>
        </div></van-col
      >
    </van-row>
  </div>
</template>
  
  <script>
export default {
  name: "Home",
  data() {
    return {
      categories: [
        {
          title: "农用膜类",
          image: require("@/img/list1.png"),
          color: "yellow",
          name: "membrane",
        },
        {
          title: "胶带商品",
          image: require("@/img/list2.png"),
          color: "blue",
          name: "tape",
        },
        {
          title: "瓶装肥料",
          image: require("@/img/list3.png"),
          color: "green",
          name: "fertilizer",
        },
        {
          title: "绳类商品",
          image: require("@/img/list4.png"),
          color: "orange",
          name: "rope",
        },
        {
          title: "历史记录",
          image: require("@/img/list6.png"),
          color: "green",
          name: "historicalRecords",
        },
        {
          title: "价格参考",
          image: require("@/img/list7.png"),
          color: "orange",
          name: "priceReference",
        },
      ],
    };
  },
  methods: {
    goToCategory(name) {
      this.$router.push({ name: name });
    },
  },
};
</script>
<style lang="scss" scoped>
// 当屏幕宽度大于1000px时触发的样式
@media (min-width: 1000px) {
  .home_container {
    width: 600px;
    margin: 0 auto;
  }

  .category-card {
    cursor: pointer;
    height: 250px !important;
    // background-size: 100% auto !important
    background-size: cover !important; // 确保背景图片完全覆盖
    background-position: center !important; // 让背景图片居中
  }
}
.category-card {
  cursor: pointer;
  height: 160px;
  background-size: 100% auto;
  position: relative;
  background-repeat: no-repeat;
}

.category-content {
  position: absolute;
  top: 30%;
  left: 30%;
  transform: translate(-50%, -50%);
  color: rgb(90, 90, 90);
  font-size: 18px;
  font-weight: bold;
  //   text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
}
.title {
  img {
    width: 100%;
    height: auto;
  }
}
.van-row-class {
  margin-bottom: 10px;
}
</style>