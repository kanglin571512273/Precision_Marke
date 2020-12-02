<template>
  <div class="customerManage">
    <a-spin :spinning="spinning"> </a-spin>
    <div class="container" v-if="analysisResoult">
      <a-button shape="round" size="small" @click="back">返回</a-button>
      <tableCom
        :data="selectedCheckbox"
        :page="page"
        :column="column"
      ></tableCom>
    </div>
    <div class="container" v-if="!analysisResoult">
      <div class="btn-container">
        <div class="left">
          <a-button
            type="primary"
            shape="round"
            size="small"
            v-show="!isCusAnalysis"
            >新增客户</a-button
          >
          <a-button
            type="primary"
            shape="round"
            size="small"
            v-show="isCusAnalysis"
            @click="analysisFun"
            >客户分析</a-button
          >
        </div>
        <div class="right" v-show="!isCusAnalysis">
          <a-button
            shape="round"
            size="small"
            v-for="(item, index) in btnArr"
            :key="index"
            :class="currentBtn == index ? 'activeBtn' : ''"
            @click="filterDataBtn(index)"
            >{{ item }}</a-button
          >
        </div>
      </div>
      <a-table
        :columns="columns"
        :data-source="data"
        bordered
        @change="handleTableChange"
        :row-selection="rowSelection"
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
      </a-table>
    </div>
  </div>
</template>

<script>
// import analysisResT from "../components/analysisResT";
import tableCom from "../components/tableCom";
import Vue from "vue";
import { Button, Table, Tag, Input, Spin } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Spin);

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
    tableCom,
  },
  data() {
    return {
      filteredInfo: null,
      data,
      searchText: "", //搜索文本
      searchedColumn: "", //搜索高亮
      page: {
        currPage: 1, //当前页
        pageSize: 10,
      },
      currentBtn: 0, //所有客户、分配客户、私有客户、公有客户
      btnArr: ["所有客户", "分配客户", "私有客户", "公有客户"],
      isCusAnalysis: false, //是否点击了客户分析
      selectedCheckbox: [], //被勾选的项
      analysisResoult: false, //显示分析结果的表格
      spinning: false, //加载中
    };
  },
  computed: {
    column() {
      const columns = [
        {
          title: "分析时间",
          key: "anaTime",
          dataIndex: "anaTime",
        },
      ];
      return columns;
    },
    columns() {
      let { filteredInfo } = this;
      filteredInfo = filteredInfo || {};
      const columns = [
        {
          title: "序号",
          key: "index",
          width: "65px",
          customRender: (t, r, index) => {
            return parseInt(
              (this.page.currPage - 1) * this.page.pageSize + index + 1
            );
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
          title: "客户经理",
          key: "handeler",
          dataIndex: "handeler",
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" },
        },
      ];
      return columns;
    },
    // 选中某一项
    rowSelection() {
      return {
        onChange: (selectedRowKeys, selectedRows) => {
          // selectedRowKeys: 对应表格data里的key属性
          let date = new Date();
          let Y = date.getFullYear();
          let M =
            (date.getMonth() + 1).toString().length == 2
              ? date.getMonth() + 1
              : "0" + (date.getMonth() + 1);
          let D =
            date.getDate().toString().length == 2
              ? date.getDate()
              : "0" + date.getDate();
          let hh =
            date.getHours().toString().length == 2
              ? date.getHours()
              : "0" + date.getHours();
          let mm =
            date.getMinutes().toString().length == 2
              ? date.getMinutes()
              : "0" + date.getMinutes();
          let ss =
            date.getSeconds().toString().length == 2
              ? date.getSeconds()
              : "0" + date.getSeconds();
          this.isCusAnalysis = Boolean(selectedRowKeys.length);
          this.selectedCheckbox = selectedRows.map((element) => {
            element.isNew = false;
            element.anaTime = `${Y}-${M}-${D} ${hh}:${mm}:${ss}`;
            return element;
          });
        },
      };
    },
  },
  methods: {
    // 客户分析之后返回
    back() {
      this.analysisResoult = false;
    },
    analysisFun() {
      this.spinning = true;
      setTimeout(() => {
        this.analysisResoult = true;
        this.spinning = false;
      }, 1500);
    },
    // 编辑
    edit(id) {
      console.log(id);
    },
    //所有客户、分配客户、私有客户、公有客户
    filterDataBtn(index) {
      this.currentBtn = index;
      if (index) {
        this.data = data.filter((item) => {
          return item.customerType == index;
        });
        return;
      }
      this.data = data;
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
      display: flex;
      justify-content: space-between;
      .activeBtn {
        border: 1px solid #0060ff;
        color: #0060ff;
      }
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
      top: -21px;
      right: -17px;
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
    border: none;
    border-radius: 50px;
    background-color: #eee;
    padding: 6px 16px;
  }
  .RecomProducts {
    color: #5ad8a6;
  }
  //  加载中
  // .spin-content {
  //   border: 1px solid #91d5ff;
  //   background-color: #e6f7ff;
  //   padding: 30px;
  // }
}
</style>
<style lang="less">
.customerManage {
  .ant-btn-round.ant-btn-sm {
    padding: 0 30px;
    margin: 0 5px;
  }
  .ant-btn:hover,
  .ant-btn:focus {
    color: #0060ff;
    background-color: #fff;
    border-color: #0060ff;
  }
}
</style>