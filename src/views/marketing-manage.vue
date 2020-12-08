<template>
  <div class="marketingManage">
    <div class="headBt">
      <a
        class="botton"
        @click="botactive(index)"
        :class="{ 'botton-active': active == index }"
        v-for="(item, index) in barr"
        :key="index"
        >{{ item }}</a
      >
    </div>
    <div class="card-box">
      <div class="card">
        <div class="card-title">今日情况</div>
        <ul class="card-ul">
          <li class="card-li">
            <div class="card-font">
              <span class="round"></span>
              <span>总客户数</span>
            </div>
            <span class="card-bot">{{ customers.total }}</span>
          </li>
          <li class="card-li">
            <div class="card-font">
              <span class="round color-1"></span>
              <span>新增客户</span>
            </div>
            <span class="card-bot">{{ customers.new }}</span>
          </li>
          <li class="card-li">
            <div class="card-font">
              <span class="round color-2"></span>
              <span>待跟进</span>
            </div>
            <span class="color-bot">{{ customers.followed }}</span>
          </li>
        </ul>
      </div>
      <div class="card card-item">
        <div id="container"></div>
      </div>
      <div class="card">
        <div id="charts"></div>
      </div>
    </div>
    <div class="teable-box">
      <div class="teable-conter">
        <div class="teable-font">客户列表</div>
        <div class="right" v-show="!isCusAnalysis">
          <div
            class="teabox"
            v-for="(item, index) in btnArr"
            :key="index"
            :class="currentBtn == index ? 'activeBtn' : ''"
            @click="filterDataBtn(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div class="labelManage">
        <tableCom
          :data="resdata"
          :page="page"
          :column="columns"
          @followUp="followUp"
        ></tableCom>
      </div>
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
      @cancel="resetForm"
    >
      <followUpFeedback
        @hiddenModel="hiddenModel"
        @closeModel="visible = false"
      ></followUpFeedback>
    </a-modal>
  </div>
</template>

<script>
import tableCom from "../components/tableCom";
import followUpFeedback from "../components/followUpFeedback";
import { Chart } from "@antv/g2";
import Vue from "vue";
import { Button, Table, Tag, Modal, Switch } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Modal);
const data = JSON.parse(localStorage.getItem("customData"));
export default {
  components: {
    tableCom,
    followUpFeedback,
  },
  data() {
    return {
      resdata: data,
      page: {
        currPage: 1, //当前页
        pageSize: 10,
      },
      currentBtn: 0,
      isCusAnalysis: false,
      btnArr: ["所有客户", "分配客户", "私有客户"],
      active: 0,
      visible: false,
      currentRow: {}, //跟进 继续跟进的操作时选中的当前项
      barr: ["信用卡", "贷款", "理财"],
      customers: {},
      customers1: { total: 300, new: 100, followed: 120 },
      customers2: { total: 600, new: 200, followed: 302 },
      data: [],
      data1: [
        { month: "1日", city: "总客户数", temperature: 100 },
        { month: "1日", city: "新增客户", temperature: 100 },
        { month: "2日", city: "总客户数", temperature: 150 },
        { month: "2日", city: "新增客户", temperature: 50 },
        { month: "3日", city: "总客户数", temperature: 200 },
        { month: "3日", city: "新增客户", temperature: 50 },
        { month: "4日", city: "总客户数", temperature: 220 },
        { month: "4日", city: "新增客户", temperature: 20 },
        { month: "5日", city: "总客户数", temperature: 280 },
        { month: "5日", city: "新增客户", temperature: 60 },
        { month: "6日", city: "总客户数", temperature: 400 },
        { month: "6日", city: "新增客户", temperature: 120 },
        { month: "7日", city: "总客户数", temperature: 460 },
        { month: "7日", city: "新增客户", temperature: 60 },
        { month: "8日", city: "总客户数", temperature: 490 },
        { month: "8日", city: "新增客户", temperature: 30 },
        { month: "9日", city: "总客户数", temperature: 570 },
        { month: "9日", city: "新增客户", temperature: 80 },
        { month: "10日", city: "总客户数", temperature: 600 },
        { month: "10日", city: "新增客户", temperature: 30 },
      ],
      data2: [
        { month: "1日", city: "总客户数", temperature: 30 },
        { month: "1日", city: "新增客户", temperature: 30 },
        { month: "2日", city: "总客户数", temperature: 70 },
        { month: "2日", city: "新增客户", temperature: 40 },
        { month: "3日", city: "总客户数", temperature: 80 },
        { month: "3日", city: "新增客户", temperature: 10 },
        { month: "4日", city: "总客户数", temperature: 90 },
        { month: "4日", city: "新增客户", temperature: 10 },
        { month: "5日", city: "总客户数", temperature: 110 },
        { month: "5日", city: "新增客户", temperature: 20 },
        { month: "6日", city: "总客户数", temperature: 160 },
        { month: "6日", city: "新增客户", temperature: 50 },
        { month: "7日", city: "总客户数", temperature: 180 },
        { month: "7日", city: "新增客户", temperature: 20 },
        { month: "8日", city: "总客户数", temperature: 190 },
        { month: "8日", city: "新增客户", temperature: 10 },
        { month: "9日", city: "总客户数", temperature: 240 },
        { month: "9日", city: "新增客户", temperature: 50 },
        { month: "10日", city: "总客户数", temperature: 300 },
        { month: "10日", city: "新增客户", temperature: 60 },
      ],
      data3: [
        { month: "1日", city: "总客户数", temperature: 100 },
        { month: "1日", city: "新增客户", temperature: 100 },
        { month: "2日", city: "总客户数", temperature: 150 },
        { month: "2日", city: "新增客户", temperature: 50 },
        { month: "3日", city: "总客户数", temperature: 200 },
        { month: "3日", city: "新增客户", temperature: 50 },
        { month: "4日", city: "总客户数", temperature: 220 },
        { month: "4日", city: "新增客户", temperature: 20 },
        { month: "5日", city: "总客户数", temperature: 280 },
        { month: "5日", city: "新增客户", temperature: 60 },
        { month: "6日", city: "总客户数", temperature: 400 },
        { month: "6日", city: "新增客户", temperature: 120 },
        { month: "7日", city: "总客户数", temperature: 460 },
        { month: "7日", city: "新增客户", temperature: 60 },
        { month: "8日", city: "总客户数", temperature: 490 },
        { month: "8日", city: "新增客户", temperature: 30 },
        { month: "9日", city: "总客户数", temperature: 570 },
        { month: "9日", city: "新增客户", temperature: 80 },
        { month: "10日", city: "总客户数", temperature: 600 },
        { month: "10日", city: "新增客户", temperature: 30 },
      ],
      ring: [
        { item: "网易云音乐联名卡", count: 30, percent: 0.3 },
        { item: "环保卡", count: 20, percent: 0.2 },
        { item: "诗意生活信用卡", count: 24, percent: 0.24 },
        { item: "爱奇艺联名信用卡", count: 26, percent: 0.26 },
      ],
      ring1: [
        { item: "汇利丰结构性存款2020年第1167期", count: 50, percent: 0.5 },
        { item: "安心·270天”人民币理财产品", count: 25, percent: 0.25 },
        { item: "农银私行·安心得利·灵珑", count: 5, percent: 0.05 },
        { item: "农银私享·稳健·日增利", count: 2, percent: 0.2 },
      ],
      ring2: [
        { item: "安居贷", count: 30, percent: 0.3 },
        { item: "消费贷", count: 80, percent: 0.8 },
        { item: "创业贷", count: 5, percent: 0.05 },
        { item: "特色贷", count: 12, percent: 0.12 },
      ],
    };
  },
  created() {
    this.resdata = data.filter((item) => item.customerType !== 3);
  },
  mounted() {
    this.getchart(this.ring);
    this.data = this.data1;
    this.container(this.data);
  },
  computed: {
    columns() {
      const columns = [
        {
          title: "状态",
          key: "followUpStatus",
          dataIndex: "followUpStatus",
          width: "50px",
          filters: [
            { text: "待跟进", value: "待跟进" },
            { text: "已跟进", value: "跟进" },
          ],
          onFilter: (value, record) =>
            record.followUpStatus.indexOf(value) === 0,
        },
        {
          title: "操作",
          key: "indexOperation",
          scopedSlots: { customRender: "indexOperation" },
        },
      ];
      return columns;
    },
  },
  methods: {
    getchart(data) {
      this.customers = { total: 600, new: 100, followed: 102 };
      const chart = new Chart({
        container: "charts",
        autoFit: true,
        height: 500,
      });
      chart.data(data);
      chart.scale("percent", {
        formatter: (val) => {
          val = val * 100 + "%";
          return val;
        },
      });
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });
      // 辅助文本
      chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item")
        .label("percent", (percent) => {
          position: "top";
          return {
            content: (data) => {
              return `${data.item}: ${percent * 100}%`;
            },
          };
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent,
          };
        });
      chart.legend("year", {
        position: "right",
      });
      chart.interaction("element-active");

      chart.render();
    },
    container(data) {
      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500,
      });

      chart.data(data);
      chart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
        },
      });
      chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      chart.scale("temperature", {
        title: {
          style: {
            fill: "#1890ff",
          },
        },
      });
      chart.axis("temperature", {
        label: {
          formatter: (val) => {
            return val + " 户";
          },
        },
      });
      chart.legend({
        position: "top",
      });
      chart.line().position("month*temperature").color("city").shape("smooth");

      chart.point().position("month*temperature").color("city").shape("circle");

      chart.render();
    },
    // 按钮切换
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
    botactive(index) {
      this.active = index;
      switch (index) {
        case 0:
          this.customers = { total: 600, new: 100, followed: 102 };
          this.data = [];
          // this.container(this.data);
          // this.container(this.data);
          break;
        case 1:
          this.data = [];
          this.customers = this.customers1;
          // this.container(this.data2);

          // this.getchart(this.ring1);
          break;
        default:
          this.data = [];
          this.customers = this.customers2;
        // this.container(this.data3);
        // this.getchart(this.ring2);
      }
    },
    getData(index) {
      this.btnType = index;
    },
    edit(id) {
      console.log(id);
    },
    //点击跟进
    followUp(row) {
      // console.log(row);
      this.currentRow = row;
      this.visible = true;
    },
    // 跟进弹框中的确定
    hiddenModel(row) {
      // console.log(row);
      let { followUpStatus, RecomProducts, key } = this.currentRow;
      let arr = [];
      row.forEach((element) => {
        if (element.intention) {
          arr.push(element.RecomProducts);
        }
      });

      this.currentRow.followUpStatus = "跟进";
      this.currentRow.RecomProducts = [...arr, ...RecomProducts];
      let data = JSON.parse(localStorage.getItem("customData"));
      this.resdata = data.filter((item) => {
        if (item.key == key) {
          item.followUpStatus = "跟进";
          item.RecomProducts = [...arr, ...RecomProducts];
        }
        return item.customerType !== 3;
      });
      localStorage.setItem("customData", JSON.stringify(data));

      console.log(arr);
      this.visible = false;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
    resetForm() {
      // this.$refs.child.resetForm();
    },
  },
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
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      .card-title {
        font-weight: 700;
        color: #666666;
        line-height: 30px;
        font-size: 24px;
        text-align: left;
      }
    }
    .card-item {
      flex: 1;
      margin: 0 30px;
    }
  }
  .teable-box {
    background: #ffffff;
    box-shadow: 0px 2px 4px 0px rgba(0, 96, 255, 0.05);
    border-radius: 10px;
    padding: 30px;
  }
}
.round {
  display: block;
  width: 12px;
  height: 12px;
  background: #0052ff;
  border-radius: 50%;
  margin-right: 5px;
}
.card-li {
  display: flex;
  justify-content: space-between;
}
.card-ul {
  margin-top: 54px;
}
.card-font {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #666666;
}
.card-bot {
  font-size: 28px;
  font-weight: bold;
  color: #666666;
}
.color-1 {
  background: #73deb3;
}
.color-2 {
  background: #ff6d3f;
}
.color-bot {
  font-size: 60px;
  font-weight: bold;
  color: #ffa400;
  line-height: 70px;
}
.card-li:nth-child(2) {
  margin: 48px 0 30px 0;
}
#container {
  width: 700px;
  height: 300px;
}
#charts {
  width: 440px;
  height: 300px;
}
.teable-conter {
  height: 73px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .teable-font {
    font-size: 22px;
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.teabox {
  width: 195px;
  height: 43px;
  line-height: 43px;
  border-radius: 30px;
  border: 2px solid #ccc;
  font-size: 22px;
}
.teabox:nth-child(2) {
  margin: 0 20px;
}
.activeBtn {
  border: 2px solid #0060ff;
  color: #0060ff;
}
</style>
<style>
.ant-table-thead tr td {
  font-size: 18px;
}
</style>
