<template>
  <div class="marketingManage">
    <div class="headBt">
      <a-button
        :type="btnType === 1 ? 'primary' : 'default'"
        shape="round"
        @click="getData(1)"
      >
        信用卡
      </a-button>
      <a-button
        :type="btnType === 2 ? 'primary' : 'default'"
        shape="round"
        @click="getData(2)"
      >
        贷款
      </a-button>
      <a-button
        :type="btnType === 3 ? 'primary' : 'default'"
        shape="round"
        @click="getData(3)"
      >
        理财
      </a-button>
    </div>
    <a-table class="a-table" :columns="columns" :data-source="data" bordered>
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="
            tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
          "
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag,Divider } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" },
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" },
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" },
  },
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
export default {
  data() {
    return {
      btnType: 1,
      data,
      columns,
    };
  },
  methods: {
    getData(index) {
      this.btnType = index;
    },
  },
};
</script>

<style lang="less" scoped>
.marketingManage {
  padding: 10px;
  .a-table{
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
  }
}
</style>