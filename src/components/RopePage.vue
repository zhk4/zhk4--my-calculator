<template>
  <div class="membrane-layout">
    <!-- 返回导航栏 -->
    <van-nav-bar
      title="绳类商品"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单 -->
    <van-form @submit="onSubmit" ref="formRef">
      <!-- 城市选择 -->
      <van-field
        v-model="form.city"
        label="绳子品类"
        placeholder="请选择绳子品类"
        readonly
        clickable
        is-link
        :rules="[{ required: true, message: '请选择绳子品类' }]"
        @click="showCityPicker = true"
      />

      <!-- 产品品类选择 -->
      <!-- <van-field
        v-model="form.productType"
        label="产品品类"
        placeholder="请选择品类"
        readonly
        clickable
        is-link
        :rules="[{ required: true, message: '请选择产品品类' }]"
        @click="showProductPicker = true"
      /> -->

      <!-- 步进器1 - 面积 -->
      <van-field
        v-model.number="form.area"
        name="area"
        label="长度(m)"
        :rules="[{ required: false, message: '请输入长度' }]"
      >
        <template #input>
          <van-stepper v-model="form.area" integer min="0" max="100000" />
        </template>
      </van-field>

      <!-- 步进器2 - 数量 -->
      <!-- <van-field
        v-model.number="form.quantity"
        name="quantity"
        label="宽度(m)"
        :rules="[{ required: false, message: '请输入宽度' }]"
      >
        <template #input>
          <van-stepper v-model="form.quantity" integer min="0" max="100000" />
        </template>
      </van-field> -->

      <!-- 步进器3 - 厚度(mm) -->
      <van-field
        v-model.number="form.thickness"
        name="thickness"
        label="折扣(%)"
        :rules="[{ required: false, message: '请输入折扣' }]"
      >
        <template #input>
          <van-stepper
            v-model="form.thickness"
            step="0.1"
            min="0.01"
            max="100"
          />
        </template>
      </van-field>
      <van-row type="flex" justify="space-around" v-if="isSubmitted">
        <van-col span="23">
          <div class="van-item-class">
            <van-row type="flex" justify="space-around">
              <van-col span="23" class="van-item-class-title">得出价格</van-col>
            </van-row>
            <div class="bottom">
              <van-row type="flex" justify="space-around">
                <van-col span="11" class="van-item-class-title"
                  >商品原价：<span class="van-item-title"
                    >{{ result.originalPrice }}元</span
                  >
                </van-col>
                <van-col span="11" class="van-item-class-title-2"
                  >商品折扣价：<span class="van-item-title-2"
                    >{{ result.discountedPrice }}元</span
                  ></van-col
                >
              </van-row>
            </div>
          </div>
        </van-col>
      </van-row>
      <div style="margin: 16px">
        <van-button native-type="submit" round block type="info"
          >开 始 计 算</van-button
        >
      </div>
    </van-form>
    <!-- 提交按钮 -->

    <!-- 城市选择弹窗 -->
    <van-popup v-model="showCityPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="cityColumns"
        @confirm="onCityConfirm"
        @cancel="showCityPicker = false"
      />
    </van-popup>

    <!-- 产品品类选择弹窗 -->
    <van-popup v-model="showProductPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="productColumns"
        @confirm="onProductConfirm"
        @cancel="showProductPicker = false"
      />
    </van-popup>
  </div>
</template>
    
    <script>
export default {
  name: "MembranePage",
  data() {
    return {
      form: {
        city: "",
        productType: "",
        area: 0, // 长度
        quantity: 0, // 宽度
        thickness: 10, // 折扣
      },
      showCityPicker: false,
      showProductPicker: false,

      cityColumns: ["10丝", "15丝", "20丝"],
      productColumns: ["地膜", "大棚膜", "保温膜", "防草膜"],

      // 新增：计算后的价格数据
      result: {
        originalPrice: null,
        discountedPrice: null,
      },

      // 是否已提交过表单（用于控制结果显示）
      isSubmitted: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    // 城市选择确认
    onCityConfirm(value) {
      this.form.city = value;
      this.showCityPicker = false;
    },

    // 产品品类选择确认
    onProductConfirm(value) {
      this.form.productType = value;
      this.showProductPicker = false;
    },

    // 表单提交
    onSubmit(values) {
      console.log("Form data:", this.form); // 调试信息
      //   this.$refs.formRef.validate().then((valid) => {
      //     if (valid) {

      //     } else {
      //       this.$toast.fail("请检查并填写所有必填项");
      //     }
      //   });
      const length = this.form.area;
      //   const width = this.form.quantity;
      const discount = this.form.thickness;

      const unitPrice = 2; // 假设单价是 2 元/㎡

      const originalPrice = length * unitPrice;

      // 使用 bignumber.js 进行精确计算（防止浮点误差）
      const BigNumber = require("bignumber.js");

      const discountedPrice = new BigNumber(originalPrice)
        .multipliedBy(
          new BigNumber(1).minus(new BigNumber(discount).dividedBy(100))
        )
        .toFixed(2); // 保留两位小数

      // 更新结果并显示
      this.result.originalPrice = originalPrice.toFixed(2);
      this.result.discountedPrice = discountedPrice;
      this.isSubmitted = true;

      this.$toast.success(`计算完成`);
    },
  },
};
</script>
    
    <style lang="scss" scoped>
@media (min-width: 1000px) {
  .membrane-layout {
    width: 600px;
    margin: 0 auto;
  }
}

.van-form {
  height: 55vh;
}
.van-item-class {
  margin-top: 15px;
  height: 90px;
  /* background-image: url(@/img/zhk1.png); */
  background-image: linear-gradient(to right, #6599ff, white);
  /* background-size: 100% auto;
    background-repeat: no-repeat; */
  padding-top: 15px;
  border-radius: 5px;
}
.van-item-class-title {
  font-weight: 600;
  margin-bottom: 5px;
}
.van-item-title {
  font-size: 20px;
  text-decoration: line-through; /* 添加划线穿过 */
}
.van-item-title-2 {
  font-size: 20px;
  color: red;
}
.van-item-class-title-2 {
  font-weight: 600;
  margin-bottom: 5px;
  color: #3b7cff;
  font-style: italic; /* 添加字体倾斜 */
}
</style>