<template>
  <div class="customerManage">
    <a-spin :spinning="spinning"> </a-spin>
    <div class="container" v-if="analysisResoult">
      <a-button shape="round" @click="back">返回</a-button>
      <tableCom
        :data="selectedCheckbox"
        :page="page"
        :column="column"
      ></tableCom>
    </div>
    <div class="container" v-if="!analysisResoult">
      <div class="btn-container">
        <div class="left">
          <button
            class="langPand primary round mybtn"
            v-show="!isCusAnalysis"
            @click="visible = true"
          >
            新增客户
          </button>
          <button
            class="langPand primary round mybtn"
            v-show="isCusAnalysis"
            @click="analysisFun"
          >
            客户分析
          </button>
        </div>
        <div class="right" v-show="!isCusAnalysis">
          <button
            v-for="(item, index) in btnArr"
            :key="index"
            :class="[
              'mybtn',
              'round',
              'langPand',
              'plain',
              { activeBtn: currentBtn === index },
            ]"
            @click="filterDataBtn(index)"
          >
            {{ item }}
          </button>
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
          @click="edit(row.key)"
          >编辑</a-button
        >
      </a-table>
    </div>
    <!-- 弹框 -->
    <a-modal
      v-model="visible"
      @ok="handleOk"
      :closable="false"
      width="90%"
      :centered="true"
      :bodyStyle="{ textAlign: 'left' }"
      :footer="null"
    >
      <addCustomerForm
        @resetForm="visible = false"
        @submit="submit"
        ref="child"
      ></addCustomerForm>
      <!-- :data="currentCustom" -->
    </a-modal>
  </div>
</template>

<script>
import { formatDate } from "../utils";
import tableCom from "../components/tableCom";
import addCustomerForm from "../components/addCustomerForm";
import Vue from "vue";
import { Button, Table, Tag, Input, Spin, Modal } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Spin);
Vue.use(Modal);

export default {
  components: {
    tableCom,
    addCustomerForm,
  },
  mounted() {
    let proxy = new Proxy(
      {},
      {
        get: function (target, propKey) {
          return 35;
        },
        set: function (target, propKey) {
          return 33;
        },
      }
    );
    console.log(proxy.a);
  },
  data() {
    return {
      filteredInfo: null,
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
      visible: false, //弹框显示隐藏
      // currentCustom: {}, //查看当前客户的信息
    };
  },
  computed: {
    data() {
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
      return data;
    },
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
          let time = formatDate(date);
          console.log(time);
          this.isCusAnalysis = Boolean(selectedRowKeys.length);
          this.selectedCheckbox = selectedRows.map((element) => {
            element.isNew = false;
            element.anaTime = time;
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
      this.isCusAnalysis = false;
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
      this.visible = true;
      let currentCustom = this.data.find((item) => {
        return item.key === id;
      });
      // console.log(this.$refs.child.dataForm(currentCustom));
      setTimeout(() => {
        this.$refs.child.dataForm && this.$refs.child.dataForm(currentCustom);
      }, 0);
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
    // 表单提交
    submit(form) {
      let index = this.data.findIndex((item) => {
        return item.key == form.key;
      });
      if (index !== -1) {
        this.data[index] = form;
      } else {
        this.data.push(form);
      }
      this.visible = false;
      console.log(this.data);
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
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

  /////////////////////按钮
  .mybtn {
    font-size: 22px;
    line-height: 43px;
    outline: none;
    margin: 0 5px;
  }
  .langPand {
    width: 195px;
    height: 43px;
  }
  .primary {
    color: #fff;
    background: #0060ff;
    border: 1px solid #0060ff;
  }
  .round {
    border-radius: 30px;
  }
  .plain {
    background-color: #fff;
    color: #999999;
    border: 1px solid #999;
  }
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
  .economicForm,
  .personalForm {
    height: 20px;
  }
}
</style>