<template>
  <div class="marketingManage">
    <div class="headBt">
      <a
        class="botton"
        @click="active = 0"
        :class="{ 'botton-active': active == 0 }"
        >信用卡</a
      >
      <a
        class="botton"
        @click="active = 1"
        :class="{ 'botton-active': active == 1 }"
        >贷款</a
      >
      <a
        class="botton"
        @click="active = 2"
        :class="{ 'botton-active': active == 2 }"
        >理财</a
      >
    </div>
    <div class="card-box">
      <div class="card">1</div>
      <div class="card card-item">2</div>
      <div class="card">3</div>
    </div>
    <div class="teable-box">
      <a-table class="a-table" :columns="columns" :data-source="data" bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
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
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag, Divider } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  data() {
    return {
      btnType: 1,
      data,
      columns,
      active: 0
    };
  },
  methods: {
    getData(index) {
      this.btnType = index;
    }
  }
};
</script>

<style lang="less" scoped>
.marketingManage {
  padding: 0 50px;
  .a-table {
    width: 80%;
    background-color: #fff;
    margin: 0 auto;
  }
  .headBt {
    height: 94px;
    line-height: 94px;
    display: flex;
    justify-content: center;
    align-items: center;
    .botton {
      width: 134px;
      height: 56px;
      line-height: 56px;
      border-radius: 30px;
      border: 2px solid #ced0d7;
      font-size: 22px;
      font-weight: 500;
      color: #999999;
    }
    .botton:nth-child(2) {
      margin: 0 69px;
    }
    .botton-active {
      width: 134px;
      height: 56px;
      line-height: 56px;
      color: #fff;
      background: #0060ff;
      box-shadow: 0px 2px 6px 0px rgba(0, 96, 255, 0.3);
      border-radius: 30px;
    }
  }
  .card-box {
    display: flex;
    margin-bottom: 20px;
    .card {
      width: 500px;
      height: 350px;
      background: pink;
      border-radius: 10px;
    }
    .card-item {
      flex: 1;
      margin: 0 30px;
    }
  }
  .teable-box {
    height: 530px;
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 96, 255, 0.05);
    border-radius: 10px;
  }
}
</style>
