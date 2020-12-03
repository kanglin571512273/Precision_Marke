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
      <div class="card">
        <div class="card-title">今日情况</div>
        <ul class="card-ul">
          <li class="card-li">
            <div class="card-font">
              <span class="round"></span>
              <span>总客户数</span>
            </div>
            <span class="card-bot">67879789</span>
          </li>
          <li class="card-li">
            <div class="card-font">
              <span class="round color-1"></span>
              <span>新增客户</span>
            </div>
            <span class="card-bot">987655</span>
          </li>
          <li class="card-li">
            <div class="card-font">
              <span class="round color-2"></span>
              <span>待跟进</span>
            </div>
            <span class="color-bot">5678</span>
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
          @edit="edit"
        ></tableCom>
      </div>
     
    </div>
  </div>
</template>

<script>
import tableCom from "../components/tableCom";
import { Chart } from "@antv/g2";
import Vue from "vue";
import { Button, Table, Tag, Divider,Modal } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
Vue.use(Modal);
const data = [
  {
    key: "1",
    customerId: "678974932",
    customerName: "李明明",
    customerTel: 10086,
    customerTags: ["青年才俊", "高收入"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 3,
    isNew: false,
    status: "已跟进"
  },
  {
    key: "2",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进"
  },
  {
    key: "3",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进"
  },
  {
    key: "4",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进"
  },
  {
    key: "5",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进"
  },
  {
    key: "6",
    customerId: "678974933",
    customerName: "赵芳芳",
    customerTel: 10085,
    customerTags: ["青年才俊", "高收入", "购物狂"],
    RecomProducts: ["网易云联名卡", "付费卡"], //推荐产品
    customerType: 1,
    isNew: true,
    status: "待跟进"
  }
];
export default {
  components: {
    tableCom, 
  },
  data() {
    return {
      resdata: data,
      page: {
        currPage: 1, //当前页
        pageSize: 10
      },
      currentBtn: 0,
      isCusAnalysis: false,
      btnArr: ["所有客户", "分配客户", "私有客户"],
      active: 0,
    };
  },
  mounted() {
    this.getchart();
    this.container();
  },
  computed: {
    columns() {
      const columns = [
        {
          title: "状态",
          key: "status",
          dataIndex: "status",
          filters: [
            { text: "待跟进", value: "待跟进" },
            { text: "已跟进", value: "已跟进" }
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
          title: "操作",
          key: "indexOperation",
          scopedSlots: { customRender: "indexOperation" }
        }
      ];
      return columns;
    }
  },
  methods: {
    getchart() {
      const data = [
        { item: "事例一", count: 40, percent: 0.4 },
        { item: "事例二", count: 21, percent: 0.21 },
        { item: "事例三", count: 17, percent: 0.17 },
        { item: "事例四", count: 13, percent: 0.13 },
        { item: "事例五", count: 9, percent: 0.09 }
      ];
      const chart = new Chart({
        container: "charts",
        autoFit: true,
        height: 500
      });
      chart.data(data);
      chart.scale("percent", {
        formatter: val => {
          val = val * 100 + "%";
          return val;
        }
      });
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      // 辅助文本
      chart
        .annotation()
        .text({
          position: ["50%", "50%"],
          content: "主机",
          style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetY: -20
        })
        .text({
          position: ["50%", "50%"],
          content: "200",
          style: {
            fontSize: 20,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetX: -10,
          offsetY: 20
        })
        .text({
          position: ["50%", "50%"],
          content: "台",
          style: {
            fontSize: 14,
            fill: "#8c8c8c",
            textAlign: "center"
          },
          offsetY: 20,
          offsetX: 20
        });
      chart
        .interval()
        .adjust("stack")
        .position("percent")
        .color("item")
        .label("percent", percent => {
          return {
            content: data => {
              return `${data.item}: ${percent * 100}%`;
            }
          };
        })
        .tooltip("item*percent", (item, percent) => {
          percent = percent * 100 + "%";
          return {
            name: item,
            value: percent
          };
        });
      chart.legend("year", {
        position: "right"
      });
      chart.interaction("element-active");

      chart.render();
    },
    container() {
      const data = [
        { month: "Jan", city: "Tokyo", temperature: 7 },
        { month: "Jan", city: "London", temperature: 3.9 },
        { month: "Feb", city: "Tokyo", temperature: 6.9 },
        { month: "Feb", city: "London", temperature: 4.2 },
        { month: "Mar", city: "Tokyo", temperature: 9.5 },
        { month: "Mar", city: "London", temperature: 5.7 },
        { month: "Apr", city: "Tokyo", temperature: 14.5 },
        { month: "Apr", city: "London", temperature: 8.5 },
        { month: "May", city: "Tokyo", temperature: 18.4 },
        { month: "May", city: "London", temperature: 11.9 },
        { month: "Jun", city: "Tokyo", temperature: 21.5 },
        { month: "Jun", city: "London", temperature: 15.2 },
        { month: "Jul", city: "Tokyo", temperature: 25.2 },
        { month: "Jul", city: "London", temperature: 17 },
        { month: "Aug", city: "Tokyo", temperature: 26.5 },
        { month: "Aug", city: "London", temperature: 16.6 },
        { month: "Sep", city: "Tokyo", temperature: 23.3 },
        { month: "Sep", city: "London", temperature: 14.2 },
        { month: "Oct", city: "Tokyo", temperature: 18.3 },
        { month: "Oct", city: "London", temperature: 10.3 },
        { month: "Nov", city: "Tokyo", temperature: 13.9 },
        { month: "Nov", city: "London", temperature: 6.6 },
        { month: "Dec", city: "Tokyo", temperature: 9.6 },
        { month: "Dec", city: "London", temperature: 4.8 }
      ];

      const chart = new Chart({
        container: "container",
        autoFit: true,
        height: 500
      });

      chart.data(data);
      chart.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      chart.axis("temperature", {
        label: {
          formatter: val => {
            return val + " °C";
          }
        }
      });
      chart.legend({
        position: "top"
      });
      chart
        .line()
        .position("month*temperature")
        .color("city")
        .shape("smooth");

      chart
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      chart.render();
    },
    // 按钮切换
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
    getData(index) {
      this.btnType = index;
    },
    edit(id) {
      console.log(id);
    },
     
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
      background: #fff;
      border-radius: 10px;
      padding: 30px;
      .card-title {
        font-weight: 600;
        color: #666666;
        line-height: 30px;
        font-size: 22px;
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
  font-size: 16px;
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
font-size:22px
}
.teabox:nth-child(2){
  margin: 0 20px;
}
.activeBtn {
  border: 2px solid #0060ff;
  color: #0060ff;
}

</style>
