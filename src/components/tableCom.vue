<template>
  <div class="tableCom">
    <a-table
      :columns="lastColumns"
      :data-source="data"
      bordered
      @change="handleTableChange"
      :pagination="false"
      :scroll="{ y: 400 }"
      size="default"
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
        style="padding: 18px"
      >
        <a-input
          v-ant-ref="(c) => (searchInput = c)"
          placeholder="搜索客户姓名"
          :value="selectedKeys[0]"
          style="
            width: 188px;
            height: 25px;
            font-size: 12px;
            margin-bottom: 8px;
            display: block;
          "
          @change="
            (e) => setSelectedKeys(e.target.value ? [e.target.value] : [])
          "
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.key)"
        />
        <a-button
          type="primary"
          icon="search"
          style="width: 90px; margin-right: 8px; height: 25px; font-size: 12px"
          @click="() => handleSearch(selectedKeys, confirm, column.key)"
        >
          搜索
        </a-button>
        <a-button
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
            @click="showModal(text)"
            :class="{ customerName: true, isNew: text.isNew ? true : false }"
            >{{ text.customerName }}</span
          >
        </template>
      </template>
      <!-- 客户标签  -->
      <span class="tags" slot="tags" slot-scope="tags">
        <a-tag class="my-tag" v-for="tag in tags.slice(0, 3)" :key="tag">
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <!-- 推荐产品 -->
      <span slot="RecomProducts" slot-scope="RecomProducts">
        <span class="RecomProducts">{{
          RecomProducts.slice(0, 3).toString().replace(/\,/g, " / ")
        }}</span>
        <!-- v-for="(item, index) in RecomProducts.slice(0, 3)"
          :key="index" -->
      </span>
      <!-- 客户类别 -->
      <span slot="customerType" slot-scope="row">{{
        row == 1 ? "分配客户" : row == 2 ? "私有客户" : "共有客户"
      }}</span>
      <!-- 编辑框 -->
      <a-button
        slot="operation"
        slot-scope="row"
        class="editBtn"
        icon="edit"
        shape="round"
        size="small"
        @click="edit(row.key)"
        >编辑</a-button
      >
      <!-- 跟进，待跟进 -->
      <div style="text-align: center" slot="indexOperation" slot-scope="row">
        <a-button
          :class="row.followUpStatus === '已跟进' ? 'orangeBtn' : 'blueBtn'"
          shape="round"
          @click="followUp(row)"
          size="large"
          >{{ row.followUpStatus === "已跟进" ? "继续跟进" : "跟进" }}</a-button
        >
      </div>
    </a-table>
    <a-modal v-model="visible" width="90%" :footer="null" @ok="hideModal">
      <Panorama :datas="name"></Panorama>
    </a-modal>
  </div>
</template>

<script>
import Panorama from "@/components/Panorama.vue";
import Vue from "vue";
import { Button, Table, Tag, Input } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);
export default {
  components: {
    Panorama,
  },
  props: {
    data: {
      type: Array,
      default: () => data,
    },
    column: { type: Array, default: () => [] },
    page: { type: Object, default: () => {} },
  },
  data() {
    return {
      filteredInfo: null,
      searchText: "", //搜索文本
      searchedColumn: "", //搜索高亮
      currPage: 1, //当前页
      pageSize: 10,
      visible: false,
      name: {},
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
          width: "50px",
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
          width: "80px",
          // dataIndex: "customerName",
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
          width: "80px",
          dataIndex: "customerTel",
        },
        {
          title: "客户标签",
          key: "customerTags",
          dataIndex: "customerTags",
          width: "200px",
          scopedSlots: { customRender: "tags" },
        },
        {
          title: "推荐产品",
          key: "RecomProducts",
          dataIndex: "RecomProducts",
          width: "200px",
          ellipsis: true,
          scopedSlots: { customRender: "RecomProducts" },
        },
        {
          title: "客户类别",
          key: "customerType",
          dataIndex: "customerType",
          scopedSlots: { customRender: "customerType" },
        },
      ];
      return columns;
    },
    lastColumns() {
      let aacolumns = [...this.columns, ...this.column];
      return aacolumns;
    },
  },
  created() {
    // this.columns.push(...this.column);
    // console.log(this.$route);
  },
  methods: {
    edit(key) {
      // console.log(key);
      this.$emit("edit", key);
    },
    followUp(key) {
      this.$emit("followUp", key);
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
    showModal(index) {
      this.name = index;
      this.visible = true;
    },
    hideModal() {
      this.visible = false;
    },
  },
};
</script>

<style lang="less" scoped>
.tableCom {
  background-color: #fff;
  margin: 15px 0px;
}
.editBtn {
  background: #d78a4e;
  color: #fff;
  border: 1px solid #d78a4e;
}
.orangeBtn {
  background: #ffa400;
  color: #fff;
  border: 1px solid#FFA400;
  font-size: 18px;
  font-weight: 700;
}
.blueBtn {
  font-size: 18px;
  font-weight: 700;
  background: #0060ff;
  color: #fff;
  border: 1px solid #0060ff;
}
.customerName {
  color: #0060ff;
  display: block;
  position: relative;
}

td {
  position: relative;
}
.isNew {
  // background-color: pink;
  display: block;
  // position: relative;
  &::after {
    content: "";
    position: absolute;
    // top: -20px;
    // right: -16px; 0.083333rem 0.083333rem;
    top: -18px;
    right: -16px;
    background: url(../assets/image/newPeople.png) no-repeat;
    background-size: contain;
    width: 44px;
    height: 44px;
  }
}
.tags {
  text-align: center;
  display: block;
}
.my-tag {
  font-size: 18px;
  border: none;
  border-radius: 50px;
  background-color: #eee;
  padding: 6px 16px;
}
.RecomProducts {
  color: #5ad8a6;
}
.highlight {
  background-color: orange;
}
</style>
<style lang="less">
tr.ant-table-row {
  font-size: 20px;
}
.ant-table-thead tr {
  font-size: 24px;
}
</style>
