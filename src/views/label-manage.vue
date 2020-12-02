<template>
  <div class="labelManage">
    <tableCom
      :data="resdata"
      :page="page"
      :column="columns"
      @edit="edit"
    ></tableCom>
  </div>
</template>

<script>
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
    status: "已跟进",
  },
  {
    key: "2",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进",
  },
];
export default {
  components: {
    tableCom,
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
  computed: {
    columns() {
      const columns = [
        {
          title: "状态",
          key: "status",
          dataIndex: "status",
          filters: [
            { text: "待跟进", value: "待跟进" },
            { text: "已跟进", value: "已跟进" },
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0,
        },
        {
          title: "操作",
          key: "indexOperation",
          scopedSlots: { customRender: "indexOperation" },
        },
      ];
      return columns;
    },
  },
  methods: {
    edit(id) {
      console.log(id);
    },
  },
};
</script>

<style>
</style>