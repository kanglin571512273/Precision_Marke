<template>
  <div class="labelManage">
    <div class="tableContainer">
      <a-table
        :data-source="data"
        :columns="columns"
        bordered
        :scroll="{ y: 400 }"
        :pagination="false"
      >
        <!-- 用户名搜索 -->
        <!-- 搜索弹框 -->
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="(c) => (searchInput = c)"
            placeholder="搜索标签名称"
            :value="selectedKeys[0]"
            style="
              width: 188px;
              height: 25px;
              font-size: 12px;
              margin-bottom: 8px;
              display: block;
            "
            @change="(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.key)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px; height: 25px; font-size: 12px"
            @click="() => handleSearch(selectedKeys, confirm, column.key)"
          >
            搜索
          </a-button>
          <a-button
            size="small"
            style="width: 90px; height: 25px; font-size: 12px"
            @click="() => handleReset(clearFilters)"
          >
            重置
          </a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{
            color: filtered ? '#108ee9' : undefined,
            fontSize: '14px',
            top: '3px',
            right: '5px',
            height: '20px',
            background: '#fafafa',
          }"
        />
        <template slot="customRender" slot-scope="text, record, index, column">
          <span v-if="searchText && searchedColumn === column.key">
            <template
              v-for="(fragment, i) in text.labelName
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
            <span>{{ text.labelName }}</span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Input } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Input);

export default {
  data() {
    return {
      data: [],
      currPage: 1,
      pageSize: 10,
      searchText: "", //搜索文本
      searchedColumn: "", //搜索高亮
    };
  },
  created() {
    this.data = JSON.parse(localStorage.getItem("labelData"));
  },
  computed: {
    columns() {
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
          title: "标签名称",
          key: "labelName",
          // dataIndex: "customerName",
          scopedSlots: {
            filterDropdown: "filterDropdown", //外层的slot Name
            filterIcon: "filterIcon", //外层图标slot Name
            customRender: "customRender", //内层的 slot Name
          },
          onFilter: (
            value,
            record //筛选
          ) => record.labelName.toString().toLowerCase().includes(value.toLowerCase()),

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
          title: "标签类型",
          key: "labelType",
          dataIndex: "labelType",
          filters: [
            {
              text: "基本标签",
              value: "基本标签",
            },
            {
              text: "特征标签",
              value: "特征标签",
            },
          ],
          onFilter: (value, record) => record.labelType.indexOf(value) === 0,
        },
        {
          title: "来源",
          key: "source",
          dataIndex: "source",
          filters: [
            {
              text: "自定义",
              value: "自定义",
            },
            {
              text: "系统",
              value: "系统",
            },
          ],
          onFilter: (value, record) => record.source.indexOf(value) === 0,
        },
        {
          title: "使用次数",
          key: "resoult",
          dataIndex: "resoult",
        },
      ];
      return columns;
    },
  },
  methods: {
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
.labelManage {
  padding: 10px 15px;
  .tableContainer {
    background-color: #fff;
    padding: 15px;
    border-radius: 15px;
  }
}
</style>
