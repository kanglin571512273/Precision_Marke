<template>
  <div class="labelManage">
    <!-- <tableCom :data="resdata" :page="page"></tableCom> -->
    <analysisResT></analysisResT>
  </div>
</template>

<script>
// import tableCom from "../components/tableCom";
import analysisResT from "../components/analysisResT";
const data = [
  {
    key: "1",
    customerId: "678974932",
    customerName: "李明明",
    customerTel: 10086,
    customerTags: ["青年才俊", "高收入"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 3,
    handeler: "唐倩颖",
    isNew: false,
  },
  {
    key: "2",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    handeler: "潘唐颖",
    isNew: true,
  },
];
export default {
  components: {
    // tableCom,
    analysisResT,
  },
  data() {
    return {
      resdata: data,
      page: {
        currPage: 1, //当前页
        pageSize: 10,
      },
    };
  },
};
</script>

<style>
</style>