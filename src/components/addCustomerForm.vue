<template>
  <div class="addCustomerForm">
    <!-- 个人信息 -->
    <div class="personalInfo">
      <p>个人信息</p>
      <div class="personalForm">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :wrapper-col="wrapperCol"
          labelAlign="right"
          :label-col="labelCol"
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
                <a-input v-model="form.tel" placeholder="请输入您的电话号码" />
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
              <a-form-model-item
                :labelCol="{ span: 2 }"
                :wrapperCol="{ span: 22 }"
                label="联系地址: "
                prop="addr"
              >
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
              <a-form-model-item
                :labelCol="{ span: 2 }"
                :wrapperCol="{ span: 22 }"
                label="公司单位: "
                prop="company"
              >
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
            <a-col :span="8">
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
            <a-col :span="8">
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
            <a-col :span="8">
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
            <a-col :span="8">
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
  </div>
</template>

<script>
import Vue from "vue";
import { FormModel, Select, Row, Col } from "ant-design-vue";
Vue.use(FormModel);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
export default {
  data() {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
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
        timeDeposit: 1, //定期存款
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入您的姓名",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "请输入您的真实姓名",
            trigger: "blur",
          },
        ],
        gender: [
          {
            required: true,
            message: "请选择您的性别",
            trigger: "change",
          },
        ],
        email: [
          {
            required: true,
            message: "请输入您的邮箱",
            trigger: "blur",
          },
        ],
        certificatesType: [
          {
            required: true,
            message: "请选择您的证件类别",
            trigger: "change",
          },
        ],
        identifyNum: [
          {
            required: true,
            message: "请输入您的证件号码",
            trigger: "blur",
          },
        ],
        tel: [
          {
            required: true,
            message: "请输入您的电话号码",
            trigger: "blur",
          },
        ],
        maritalStatus: [
          {
            required: true,
            message: "请选择您的婚姻状况",
            trigger: "change",
          },
        ],
        educationStatus: [
          {
            required: true,
            message: "请选择您的教育状况",
            trigger: "change",
          },
        ],
        private: [
          {
            required: true,
            message: "您是否为私有客户",
            trigger: "change",
          },
        ],
        addr: [
          {
            required: true,
            message: "请输入您的联系地址",
            trigger: "change",
          },
        ],
        company: [
          {
            required: true,
            message: "请输入您的公司单位",
            trigger: "change",
          },
        ],
      },
      ruleeconomic: {
        housingLoan: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        personalLoan: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        credit: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
        timeDeposit: [
          {
            required: true,
            message: "请选择",
            trigger: "change",
          },
        ],
      },
    };
  },
};
</script>

<style lang="less" scoped>
.economicForm,
.personalForm {
  border-radius: 5px;
  box-shadow: 1px 2px 8px 1px rgba(0, 74, 196, 0.07) !important;
  margin: 20px 0;
  padding: 30px 15px 15px;
}
</style>