<template>
  <div class="customerAnalysis">
    <tableCom :data="data" :page="page" :column="column"></tableCom>
  </div>
</template>

<script>
import Vue from "vue";
import { Modal } from "ant-design-vue";
Vue.use(Modal);
import tableCom from "../components/tableCom";
const data = [
  {
    key: "1",
    customerId: "678974932",
    customerName: "李明明",
    customerTel: 10086,
    customerTags: ["青年才俊", "高收入"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 3,
    isNew: false,
    anaTime: "2020-12-02 13:41:50",
    differ: false,
  },
];
export default {
  components: {
    tableCom,
  },
  data() {
    return {
      data,
      page: {
        currPage: 1, //当前页
        pageSize: 10,
      },
    };
  },
  created(){
    this.data = JSON.parse(localStorage.getItem('customData'))
  },
  computed: {
    column() {
      const columns = [
        {
          title: "分析时间",
          key: "anaTime",
          width: "150px",
          dataIndex: "anaTime",
        },
      ];
      return columns;
    },
  },
};
</script>

<style lang="less" scoped>
.customerAnalysis {
  width: 100%;
  height: 100%;
  padding: 15px 30px;
}
</style>