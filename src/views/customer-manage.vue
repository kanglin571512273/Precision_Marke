<template>
  <div class="customerManage">
    <div class="container">
      <div class="btn-container">
        <a-button type="primary" shape="round" size="small">新增客户</a-button>
        <a-button type="primary" shape="round" size="small">客户分析</a-button>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        @change="handleTableChange"
      >
        <!-- 判断是否是新人 -->
        <span
          :class="{ customerName: true, isNew: row.isNew ? true : false }"
          slot="customerName"
          slot-scope="row"
          >{{ row.customerName }}</span
        >
        <!-- 用户名搜索 -->
        <!-- 搜索弹框 -->
        <div
          slot="filterDropdown"
          slot-scope="{
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            column,
          }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="(c) => (searchInput = c)"
            :placeholder="`Search ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
            "
            @pressEnter="
              () => handleSearch(selectedKeys, confirm, column.dataIndex)
            "
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            搜索
          </a-button>
          <a-button
            size="small"
            style="width: 90px"
            @click="() => handleReset(clearFilters)"
          >
            重置
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
          <span v-if="searchText && searchedColumn === column.dataIndex">
            <template
              v-for="(fragment, i) in text
                .toString()
                .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
            >
              <mark
                v-if="fragment.toLowerCase() === searchText.toLowerCase()"
                :key="i"
                class="highlight"
                >{{ fragment }}</mark
              >
              <template v-else>{{ fragment }}</template>
            </template>
          </span>
          <template v-else>
            {{ text }}
          </template>
        </template>
        <!-- 客户标签  -->
        <span slot="tags" slot-scope="tags">
          <a-tag class="my-tag" v-for="tag in tags" :key="tag">
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
        <!-- 推荐产品 -->
        <span slot="RecomProducts" slot-scope="RecomProducts">
          <span
            class="RecomProducts"
            v-for="(item, index) in RecomProducts"
            :key="index"
            >{{ item + " / " }}</span
          >
        </span>
        <!-- 客户类别 -->
        <span slot="customerType" slot-scope="row">{{
          row == 1 ? "分配客户" : row == 2 ? "私有客户" : "共有客户"
        }}</span>
        <!-- 编辑框 -->
        <a-button
          class="editBtn"
          slot="operation"
          slot-scope="row"
          icon="edit"
          shape="round"
          size="small"
          @click="edit(row.key)"
          >编辑</a-button
        >
      </a-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag, Input } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);

const data = [
  {
    key: "1",
    customerId: "678974932",
    customerName: "李明明",
    customerTel: 10086,
    customerTags: ["青年才俊", "高收入"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 0,
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
  data() {
    return {
      columns: [
        {
          title: "序号",
          key: "index",
          width: "65px",
          customRender: (t, r, index) => {
            return parseInt((this.currPage - 1) * this.pageSize + index + 1);
          },
        },
        {
          title: "客户号",
          key: "customerId",
          dataIndex: "customerId",
        },
        {
          title: "客户姓名",
          key: "customerName",
          // dataIndex: "customerName",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "customerName",
          },
          onFilter: (
            value,
            record //筛选
          ) =>
            record.customerName
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),

          onFilterDropdownVisibleChange: (visible) => {
            //自动聚焦
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          },
        },
        {
          title: "联系电话",
          key: "customerTel",
          dataIndex: "customerTel",
        },
        {
          title: "客户标签",
          key: "customerTags",
          dataIndex: "customerTags",
          scopedSlots: { customRender: "tags" },
        },
        {
          title: "推荐产品",
          key: "RecomProducts",
          dataIndex: "RecomProducts",
          scopedSlots: { customRender: "RecomProducts" },
        },
        {
          title: "客户类别",
          key: "customerType",
          dataIndex: "customerType",
          scopedSlots: { customRender: "customerType" },
          filters: [
            { text: "所有客户", value: 0 },
            { text: "分配客户", value: 1 },
            { text: "私有客户", value: 2 },
            { text: "共有客户", value: 3 },
          ],
          filterMultiple: false,
        },
        {
          title: "客户经理",
          key: "handeler",
          dataIndex: "handeler",
        },
        {
          title: "操作",
          key: "handel",
          scopedSlots: { customRender: "operation" },
        },
      ],
      data,
      searchText: "",
      currPage: 1, //当前页
      pageSize: 10,
    };
  },
  methods: {
    edit(id) {
      console.log(id);
    },
    // 搜索
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = dataIndex;
    },
    // 重置
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    handleTableChange(pagination, filters, sorter) {
      console.log(this.data);
      this.data.filter((item) => {
        console.log(item.customerType);
        console.log(filters.customerType[0]);
        return item.customerType === filters.customerType[0];
      });
    },
  },
};
</script>

<style lang="less" scoped>
.customerManage {
  width: 100%;
  height: 100%;
  padding: 20px 40px;
  .container {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 15px 20px;
    text-align: left;
    .btn-container {
      margin-bottom: 15px;
    }
  }
  .editBtn {
    background: #d78a4e;
    color: #fff;
    border: 1px solid #d78a4e;
  }
  .customerName {
    color: #0060ff;
    display: block;
    position: relative;
    background-color: #fff;
  }
  .isNew {
    background-color: pink;
  }
  .my-tag {
    border: none;
    border-radius: 50px;
    background-color: #eee;
    padding: 6px 16px;
  }
  .RecomProducts {
    color: #5ad8a6;
  }
}
</style>