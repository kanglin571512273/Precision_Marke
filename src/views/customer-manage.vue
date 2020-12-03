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
            column
          }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            placeholder="搜索客户姓名"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block"
            @change="
              e => setSelectedKeys(e.target.value ? [e.target.value] : [])
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
      width="1820px"
      :bodyStyle="{ textAlign: 'left' }"
    >
      <!-- 个人信息 -->
      <div class="personalInfo">
        <p>个人信息</p>
        <div class="personalForm">
          <a-form-model
            ref="ruleForm"
            :model="form"
            :rules="rules"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-row>
              <a-col :span="8">
                <a-form-model-item label="客户姓名: " prop="name">
                  <a-input placeholder="请输入您的姓名" v-model="form.name" />
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="性别: " prop="gender">
                  <a-select v-model="form.gender" placeholder="请输入您的性别">
                    <a-select-option value="man"> 男 </a-select-option>
                    <a-select-option value="woman"> 女 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="邮箱地址: " prop="email">
                  <a-input v-model="form.email" placeholder="请输入您的邮箱" />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-model-item label="证件类型: " prop="certificatesType">
                  <a-select
                    v-model="form.certificatesType"
                    placeholder="请输入您的证件类型"
                  >
                    <a-select-option :value="1"> 身份证 </a-select-option>
                    <a-select-option :value="2"> 护照 </a-select-option>
                    <a-select-option :value="3"> 军官证 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="证件号码: " prop="identifyNum">
                  <a-input
                    v-model="form.identifyNum"
                    placeholder="请输入您的邮箱"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="联系电话: " prop="tel">
                  <a-input
                    v-model="form.tel"
                    placeholder="请输入您的电话号码"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="8">
                <a-form-model-item label="婚姻状况: " prop="maritalStatus">
                  <a-select
                    v-model="form.maritalStatus"
                    placeholder="请输入您的婚姻状况"
                  >
                    <a-select-option :value="1"> 未婚 </a-select-option>
                    <a-select-option :value="2"> 已婚 </a-select-option>
                    <a-select-option :value="3"> 离异 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="教育状况: " prop="educationStatus">
                  <a-select
                    v-model="form.educationStatus"
                    placeholder="请输入您的教育状况"
                  >
                    <a-select-option :value="1"> 全日制本科 </a-select-option>
                    <a-select-option :value="2"> 研究生 </a-select-option>
                    <a-select-option :value="3"> 高中 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="8">
                <a-form-model-item label="是否私有客户: " prop="private">
                  <a-select v-model="form.private" placeholder="您是否私有客户">
                    <a-select-option :value="1"> 是 </a-select-option>
                    <a-select-option :value="2"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-model-item label="联系地址: " prop="addr">
                  <a-input
                    v-model="form.addr"
                    placeholder="请输入您的联系地址"
                    type="textarea"
                  ></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-form-model-item label="公司单位: " prop="company">
                  <a-input
                    v-model="form.company"
                    placeholder="请输入您的公司单位"
                    type="textarea"
                  ></a-input>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
      </div>
      <!-- 经济情况 -->
      <div class="economicSituat">
        <p>经济情况</p>
        <div class="economicForm">
          <a-form-model
            ref="ruleeconomicForm"
            :model="form"
            :rules="ruleeconomic"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
          >
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="住房贷款: " prop="housingLoan">
                  <a-select
                    v-model="form.housingLoan"
                    placeholder="请输入您的住房贷款"
                  >
                    <a-select-option :value="1"> 是 </a-select-option>
                    <a-select-option :value="2"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="个人贷款: " prop="personalLoan">
                  <a-select
                    v-model="form.personalLoan"
                    placeholder="请输入您的个人贷款"
                  >
                    <a-select-option :value="1"> 是 </a-select-option>
                    <a-select-option :value="2"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="12">
                <a-form-model-item label="信用情况: " prop="credit">
                  <a-select
                    v-model="form.credit"
                    placeholder="请输入客户的信用情况"
                  >
                    <a-select-option :value="1"> 良好 </a-select-option>
                    <a-select-option :value="2"> 一般 </a-select-option>
                    <a-select-option :value="3"> 差 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :span="12">
                <a-form-model-item label="定期存款: " prop="timeDeposit">
                  <a-select
                    v-model="form.timeDeposit"
                    placeholder="请输入您的定期存款"
                  >
                    <a-select-option :value="1"> 是 </a-select-option>
                    <a-select-option :value="2"> 否 </a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
// import analysisResT from "../components/analysisResT";
import { formatDate } from "../utils";
import tableCom from "../components/tableCom";
import Vue from "vue";
import {
  Button,
  Table,
  Tag,
  Input,
  Spin,
  Modal,
  FormModel,
  Select,
  Row,
  Col
} from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Spin);
Vue.use(Modal);
Vue.use(FormModel);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);

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
    isNew: false
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
    isNew: true
  }
];
export default {
  components: {
    tableCom
  },
  data() {
    return {
      filteredInfo: null,
      data,
      searchText: "", //搜索文本
      searchedColumn: "", //搜索高亮
      page: {
        currPage: 1, //当前页
        pageSize: 10
      },
      currentBtn: 0, //所有客户、分配客户、私有客户、公有客户
      btnArr: ["所有客户", "分配客户", "私有客户", "公有客户"],
      isCusAnalysis: false, //是否点击了客户分析
      selectedCheckbox: [], //被勾选的项
      analysisResoult: false, //显示分析结果的表格
      spinning: false, //加载中
      visible: false, //弹框显示隐藏
      labelCol: { span: 9 },
      wrapperCol: { span: 14 },
      other: "",
      form: {
        name: "",
        gender: "man",
        email: "",
        certificatesType: 1, //证件类型
        identifyNum: null, //证件号码
        tel: null, //联系电话
        maritalStatus: 1, //婚姻状况
        educationStatus: 1, //教育状况
        private: 1, //您是否为私有客户
        addr: null, //联系地址
        company: null, //公司单位
        housingLoan: 1, //住房贷款
        personalLoan: 1, //个人贷款
        credit: 1, //信用状况
        timeDeposit: 1 //定期存款
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入您的姓名",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "请输入您的真实姓名",
            trigger: "blur"
          }
        ],
        gender: [
          {
            required: true,
            message: "请选择您的性别",
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: "请输入您的邮箱",
            trigger: "blur"
          }
        ],
        certificatesType: [
          {
            required: true,
            message: "请选择您的证件类别",
            trigger: "change"
          }
        ],
        identifyNum: [
          {
            required: true,
            message: "请输入您的证件号码",
            trigger: "blur"
          }
        ],
        tel: [
          {
            required: true,
            message: "请输入您的电话号码",
            trigger: "blur"
          }
        ],
        maritalStatus: [
          {
            required: true,
            message: "请选择您的婚姻状况",
            trigger: "change"
          }
        ],
        educationStatus: [
          {
            required: true,
            message: "请选择您的教育状况",
            trigger: "change"
          }
        ],
        private: [
          {
            required: true,
            message: "您是否为私有客户",
            trigger: "change"
          }
        ],
        addr: [
          {
            required: true,
            message: "请输入您的联系地址",
            trigger: "change"
          }
        ],
        company: [
          {
            required: true,
            message: "请输入您的公司单位",
            trigger: "change"
          }
        ]
      },
      ruleeconomic: {
        housingLoan: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        personalLoan: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        credit: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ],
        timeDeposit: [
          {
            required: true,
            message: "请选择",
            trigger: "change"
          }
        ]
      }
    };
  },
  computed: {
    column() {
      const columns = [
        {
          title: "分析时间",
          key: "anaTime",
          dataIndex: "anaTime"
        }
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
          }
        },
        {
          title: "客户号",
          key: "customerId",
          dataIndex: "customerId"
        },
        {
          title: "客户姓名",
          key: "customerName",
          // dataIndex: "customerName",s
          scopedSlots: {
            filterDropdown: "filterDropdown", //外层的slot Name
            filterIcon: "filterIcon", //外层图标slot Name
            customRender: "customRender" //内层的 slot Name
          },
          onFilter: (
            value,
            record //筛选
          ) =>
            record.customerName
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase()),

          onFilterDropdownVisibleChange: visible => {
            //自动聚焦
            if (visible) {
              setTimeout(() => {
                this.searchInput.focus();
              }, 0);
            }
          }
        },
        {
          title: "联系电话",
          key: "customerTel",
          dataIndex: "customerTel"
        },
        {
          title: "客户标签",
          key: "customerTags",
          dataIndex: "customerTags",
          scopedSlots: { customRender: "tags" }
        },
        {
          title: "推荐产品",
          key: "RecomProducts",
          dataIndex: "RecomProducts",
          scopedSlots: { customRender: "RecomProducts" }
        },
        {
          title: "客户类别",
          key: "customerType",
          dataIndex: "customerType",
          scopedSlots: { customRender: "customerType" }
        },
        {
          title: "客户经理",
          key: "handeler",
          dataIndex: "handeler"
        },
        {
          title: "操作",
          key: "operation",
          scopedSlots: { customRender: "operation" }
        }
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
          this.selectedCheckbox = selectedRows.map(element => {
            element.isNew = false;
            element.anaTime = time;
            return element;
          });
        }
      };
    }
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
      this.visible = true;
    },
    //所有客户、分配客户、私有客户、公有客户
    filterDataBtn(index) {
      this.currentBtn = index;
      if (index) {
        this.data = data.filter(item => {
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
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    }
  }
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
}
.economicForm,
.personalForm {
  border-radius: 5px;
  box-shadow: 1px 2px 8px 1px rgba(0, 74, 196, 0.07) !important;
  margin: 10px 0;
  padding-top: 15px;
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
