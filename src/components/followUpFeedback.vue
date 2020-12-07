<template>
  <div class="followUpFeedback">
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      :pagination="false"
    >
      <!-- 编辑框 -->

      <i
        :class="{
          iconfont: true,
          'iconCheck-circle1': true,
          'active-iconCheck-circle1': row.intention,
        }"
        slot="intention"
        slot-scope="row"
        @click="edit(row, 1)"
      ></i>
      <i
        :class="{
          iconfont: true,
          'iconCheck-circle1': true,
          'active-iconCheck-circle1': row.noIntention,
        }"
        slot="noIntention"
        slot-scope="row"
        @click="edit(row, 2)"
      ></i>
    </a-table>
    <div class="btnContainer">
      <button class="mybtn sureBtn" @click="makeSure">确定</button>
      <button class="mybtn cancleBtn" @click="cancle">取消</button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag, Divider, Modal } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);

const columns = [
  {
    title: "推荐产品",
    key: "RecomProducts",
    dataIndex: "RecomProducts",
    width: "600px",
  },

  {
    title: "有意向",
    key: "intention",
    // dataIndex: "intention",
    scopedSlots: { customRender: "intention" },
  },
  {
    title: "无意向",
    key: "noIntention",
    // dataIndex: "noIntention",
    scopedSlots: { customRender: "noIntention" },
  },
];
const data = [
  {
    key: 1,
    RecomProducts: "'安心得利'理财",
    intention: false,
    noIntention: true,
  },
  {
    key: 2,
    RecomProducts: "网易云联名卡",
    intention: true,
    noIntention: false,
  },
  {
    key: 3,
    RecomProducts: "个人汽车贷款",
    intention: true,
    noIntention: false,
  },
];
export default {
  data() {
    return {
      columns,
      data,
    };
  },
  methods: {
    edit(row, index) {
      if (index == 1) {
        let flag = !row.intention;
        row.intention = flag;
        row.noIntention = !flag;
      } else {
        let flag = !row.noIntention;
        row.noIntention = flag;
        row.intention = !flag;
      }
    },
    makeSure() {
      console.log(this.data);
      this.$emit("hiddenModel");
    },
    cancle() {
      this.data = data;
      console.log(data, this.data);
      this.$emit("hiddenModel");
    },
  },
};
</script>

<style lang="less" scoped>
.followUpFeedback {
  .iconCheck-circle1 {
    color: #e8e8e8;
    font-size: 35px;
  }
  .active-iconCheck-circle1 {
    color: #0060ff;
  }
  .btnContainer {
    padding: 30px 0 20px;
    text-align: center;
    .mybtn {
      padding: 3px 34px;
      background-color: #fff;
      border: none;
      border-radius: 50px;
      font-size: 22px;
      outline: none;
    }
    .sureBtn {
      background-color: #0060ff;
      color: #fff;
      margin-right: 25px;
    }
    .cancleBtn {
      color: #999999;
      border: 1px solid#CED0D7;
    }
  }
}
</style>