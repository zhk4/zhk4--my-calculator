<template>
  <div class="membrane-layout">
    <!-- 返回导航栏 -->
    <van-nav-bar
      :fixed="true"
      title="农用膜类"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 表单 -->
    <van-form ref="formRef" @submit="onSubmit">
      <!-- 动态组列表 -->
      <div
        v-for="(group, index) in groups"
        :key="index"
        style="margin-bottom: 16px"
      >
        <van-collapse v-model="group.collapseActive">
          <van-collapse-item :name="index.toString()">
            <!-- 自定义标题 -->
            <template #title>
              <van-button
                v-show="groups.length > 1"
                color="linear-gradient(to right, #ff6034, #ee0a24)"
                size="mini"
                type="danger"
                icon="cross"
                style="float: left; margin-right: 10px"
                @click.stop="removeGroup(index)"
              >
              </van-button>
              第 {{ index + 1 }} 组
            </template>
            <!-- 规格选择 -->
            <van-field
              v-model="group.city"
              label="规格选择"
              placeholder="请选择规格"
              readonly
              clickable
              is-link
              required
              :rules="[{ required: true, message: '请规格选择' }]"
              @click="
                showCityPicker = true;
                activeGroupIndex = index;
              "
            />
            <!-- 单价输入 -->
            <van-field
              v-model.number="group.unitPrice"
              type="number"
              label="单价(元/㎡)"
              placeholder="请输入单价"
              required
              :rules="[{ required: true, message: '请输入单价' }]"
              style="margin-bottom: 0"
            />
            <!-- 产品品类 -->
            <van-field
              v-model="group.productType"
              label="产品品类"
              placeholder="请选择品类"
              readonly
              clickable
              is-link
              required
              :rules="[{ required: true, message: '请选择产品品类' }]"
              @click="
                showProductPicker = true;
                activeGroupIndex = index;
              "
            />

            <!-- 长度 -->
            <van-field label="长度(m)" name="area">
              <template #input>
                <van-stepper v-model.number="group.area" min="0" max="100000" />
              </template>
            </van-field>

            <!-- 宽度 -->
            <van-field label="宽度(m)" name="quantity">
              <template #input>
                <van-stepper
                  v-model.number="group.quantity"
                  min="0"
                  max="100000"
                />
              </template>
            </van-field>
            <van-row :gutter="10">
              <van-col span="12">
                <van-field
                  v-model.number="group.pressLength"
                  type="number"
                  label="压长(m)"
                  placeholder="压长"
                  style="margin-bottom: 0"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model.number="group.pressLengthPrice"
                  type="number"
                  label="单价(元/m)"
                  placeholder="单价"
                  style="margin-bottom: 0"
                />
              </van-col>
            </van-row>

            <van-row :gutter="10">
              <van-col span="12">
                <van-field
                  v-model.number="group.pressWidth"
                  type="number"
                  label="压宽(m)"
                  placeholder="压宽"
                  style="margin-bottom: 0"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model.number="group.pressWidthPrice"
                  type="number"
                  label="单价(元/m)"
                  placeholder="单价"
                  style="margin-bottom: 0"
                />
              </van-col>
            </van-row>

            <van-row :gutter="10">
              <van-col span="12">
                <van-field
                  v-model.number="group.innerPants"
                  type="number"
                  label="内粘裤(m)"
                  placeholder="内粘裤"
                  style="margin-bottom: 0"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model.number="group.innerPantsPrice"
                  type="number"
                  label="单价(元/m)"
                  placeholder="单价"
                  style="margin-bottom: 0"
                />
              </van-col>
            </van-row>

            <van-row :gutter="10">
              <van-col span="12">
                <van-field
                  v-model.number="group.outerPants"
                  type="number"
                  label="外粘裤(m)"
                  placeholder="外粘裤"
                  style="margin-bottom: 0"
                />
              </van-col>
              <van-col span="12">
                <van-field
                  v-model.number="group.outerPantsPrice"
                  type="number"
                  label="单价(元/m)"
                  placeholder="单价"
                  style="margin-bottom: 0"
                />
              </van-col>
            </van-row>

            <!-- 折扣 -->
            <van-field label="折扣(%)" name="thickness">
              <template #input>
                <van-stepper
                  v-model.number="group.thickness"
                  step="0.1"
                  min="0"
                  max="100"
                />
              </template>
            </van-field>
            <!-- 显示当前组的价格 -->
            <div
              v-if="group.originalPrice && group.discountedPrice"
              style="text-align: right; padding-right: 16px; margin-top: 8px"
            >
              <span
                >原价：<strong>{{ group.originalPrice }} 元</strong></span
              ><br />
              <span
                >折后价：<strong>{{ group.discountedPrice }} 元</strong></span
              >
            </div>
            <!-- 删除按钮 -->
            <!-- <div style="text-align: right; padding-right: 16px">
              <van-button
                size="mini"
                type="danger"
                native-type="button"
                @click.stop="removeGroup(index)"
                >删除</van-button
              >
            </div> -->
          </van-collapse-item>
        </van-collapse>
      </div>
      <!-- 结果展示 -->
      <van-row type="flex" justify="space-around" v-if="isSubmitted">
        <van-col span="23">
          <div class="van-item-class">
            <van-row type="flex" justify="center">
              <van-col span="23" class="van-item-class-title"
                >得出价格:</van-col
              >
            </van-row>
            <div class="bottom">
              <van-row type="flex" justify="space-around">
                <van-col span="11" class="van-item-class-title">
                  商品总原价：<span class="van-item-title"
                    >{{ result.originalPrice }}元</span
                  >
                </van-col>
                <van-col span="11" class="van-item-class-title-2">
                  商品折后价：<span class="van-item-title-2"
                    >{{ result.discountedPrice }}元</span
                  >
                </van-col>
              </van-row>
            </div>
          </div>
        </van-col>
      </van-row>
      <!-- 添加组按钮 -->
      <div style="margin: 16px">
        <van-button
          native-type="button"
          plain
          round
          block
          type="primary"
          @click="addGroup($event)"
          icon="plus"
          >添加一组</van-button
        >
      </div>

      <!-- 提交按钮 -->
      <div style="padding: 0 16px 16px">
        <van-button
          native-type="submit"
          round
          block
          type="info"
          icon="cash-back-record-o"
          >开 始 计 算</van-button
        >
      </div>
    </van-form>

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
      // 所有组
      groups: [
        {
          city: null,
          productType: null,
          area: 50,
          quantity: 50,
          thickness: 10,
          collapseActive: ["0"], // 默认展开
          unitPrice: null, //单价
          pressLength: null,
          pressLengthPrice: null,
          pressWidth: null,
          pressWidthPrice: null,
          innerPants: null,
          innerPantsPrice: null,
          outerPants: null,
          outerPantsPrice: null,
          originalPrice: 0, // 新增：原价
          discountedPrice: 0, // 新增：折扣后价格
        },
      ],
      activeGroupIndex: 0,

      showCityPicker: false,
      showProductPicker: false,

      cityColumns: ["10丝", "15丝", "20丝"],
      productColumns: ["地膜", "大棚膜", "保温膜", "防草膜"],

      result: {
        originalPrice: null,
        discountedPrice: null,
      },
      isSubmitted: false,
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    addGroup(event) {
      event.stopPropagation(); // 阻止事件冒泡
      this.groups.push({
        city: "",
        productType: "",
        area: 0,
        quantity: 0,
        thickness: 10,
        collapseActive: [this.groups.length.toString()],
        unitPrice: "", //单价
      });
    },

    removeGroup(index) {
      if (this.groups.length > 1) {
        this.groups.splice(index, 1);
      }
    },

    onCityConfirm(value) {
      this.groups[this.activeGroupIndex].city = value;
      this.showCityPicker = false;
    },

    onProductConfirm(value) {
      this.groups[this.activeGroupIndex].productType = value;
      this.showProductPicker = false;
    },
    /*
主膜价格 = 长 × 宽 × 单价
附加项价格 = 压长×单价 + 压宽×单价 + 内粘裤×单价 + 外粘裤×单价（仅当填写时计算）
总原始价格 = 主膜价格 + 附加项价格
折扣后价格 = 总原始价格 × (1 - 折扣%)
*/
    onSubmit() {
      let totalOriginal = 0;
      let totalDiscounted = 0;

      const BigNumber = require("bignumber.js");

      this.groups.forEach((group) => {
        // 主膜参数
        const length = group.area || 0;
        const width = group.quantity || 0;
        const unitPrice = group.unitPrice || 0;
        const discountRate = 1 - (group.thickness || 0) / 100;

        // 主膜原价
        const mainOriginal = length * width * unitPrice;

        // 初始化附加项总费用
        let extraCost = 0;

        // 压长
        if (group.pressLength > 0 && group.pressLengthPrice > 0) {
          extraCost += group.pressLength * group.pressLengthPrice;
        }

        // 压宽
        if (group.pressWidth > 0 && group.pressWidthPrice > 0) {
          extraCost += group.pressWidth * group.pressWidthPrice;
        }

        // 内粘裤
        if (group.innerPants > 0 && group.innerPantsPrice > 0) {
          extraCost += group.innerPants * group.innerPantsPrice;
        }

        // 外粘裤
        if (group.outerPants > 0 && group.outerPantsPrice > 0) {
          extraCost += group.outerPants * group.outerPantsPrice;
        }

        // 总原始价格（主膜 + 附加项）
        const groupOriginal = mainOriginal + extraCost;
        // 折扣后价格（全部参与折扣）
        const groupDiscounted = new BigNumber(groupOriginal)
          .multipliedBy(discountRate)
          .toNumber();
        // 更新当前组的价格属性
        group.originalPrice = parseFloat(groupOriginal.toFixed(2));
        group.discountedPrice = parseFloat(groupDiscounted.toFixed(2));
        // 累加到总计
        totalOriginal += groupOriginal;
        totalDiscounted += groupDiscounted;
      });

      // 更新结果
      this.result.originalPrice = totalOriginal.toFixed(2);
      this.result.discountedPrice = totalDiscounted.toFixed(2);
      this.isSubmitted = true;

      this.$toast.success("计算完成");
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