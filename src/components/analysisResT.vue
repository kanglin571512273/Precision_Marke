<template>
  <div class="analysisResT">
    <!-- 分析结果 -->
    <a-button shape="round" size="small" @click="back">返回</a-button>
    <br /><br />
    <a-table
      :columns="columns"
      :data-source="data"
      bordered
      @change="handleTableChange"
    >
      <!-- :row-selection="rowSelection" -->
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
          placeholder="搜索客户姓名"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block"
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.key)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.key)"
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
        <span v-if="searchText && searchedColumn === column.key">
          <template
            v-for="(fragment, i) in text.customerName
              .toString()
              .split(new RegExp(`(?<=${searchText})|(?=${searchText})`, 'i'))"
          >
            <!-- 索引值高亮 -->
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
          <!-- 判断是否是新人 -->
          <span
            :class="{ customerName: true, isNew: text.isNew ? true : false }"
            >{{ text.customerName }}</span
          >
        </template>
      </template>
      <!-- 客户标签  -->
      <span class="tags" slot="tags" slot-scope="tags">
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
        row == 1
          ? "分配客户"
          : row == 2
          ? "私有客户"
          : row == 3
          ? "共有客户"
          : ""
      }}</span>
    </a-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag, Input } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);

export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      filteredInfo: null,
      searchText: "", //搜索文本
      searchedColumn: "", //搜索高亮
      currPage: 1, //当前页
      pageSize: 10,
    };
  },
  computed: {
    columns() {
      let { filteredInfo } = this;
      filteredInfo = filteredInfo || {};
      const columns = [
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
          // dataIndex: "customerName",s
          scopedSlots: {
            filterDropdown: "filterDropdown", //外层的slot Name
            filterIcon: "filterIcon", //外层图标slot Name
            customRender: "customRender", //内层的 slot Name
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
        },
        {
          title: "分析时间",
          key: "anaTime",
          dataIndex: "anaTime",
          scopedSlots: { customRender: "operation" },
        },
      ];
      return columns;
    },
  },
  methods: {
    back() {
        this.$emit('back')
    },
    // 搜索
    handleSearch(selectedKeys, confirm, key) {
      confirm();
      this.searchText = selectedKeys[0];
      this.searchedColumn = key;
    },
    // 搜索重置
    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },
    handleTableChange(pagination, filters, sorter) {
      this.filteredInfo = filters;
    },
  },
};
</script>

<style lang="less" scoped>
.analysisResT {
  background-color: #fff;
  padding: 15px 20px;
  text-align: left;
  .customerName {
    color: #0060ff;
    display: block;
    position: relative;
  }
  .tags {
    text-align: center;
    display: block;
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