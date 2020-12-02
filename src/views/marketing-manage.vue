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
      <a-table class="a-table" :columns="columns" :data-source="data" bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
        <span slot="tags" slot-scope="tags">
          <a-tag
            v-for="tag in tags"
            :key="tag"
            :color="
              tag === 'loser'
                ? 'volcano'
                : tag.length > 5
                ? 'geekblue'
                : 'green'
            "
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <a>Invite 一 {{ record.name }}</a>
          <a-divider type="vertical" />
          <a>Delete</a>
          <a-divider type="vertical" />
          <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
        </span>
      </a-table>
    </div>
  </div>
</template>

<script>
import { Chart } from "@antv/g2";
import Vue from "vue";
import { Button, Table, Tag, Divider } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
Vue.use(Tag);
Vue.use(Divider);
const columns = [
  {
    dataIndex: "name",
    key: "name",
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    scopedSlots: { customRender: "tags" }
  },
  {
    title: "Action",
    key: "action",
    scopedSlots: { customRender: "action" }
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  },
  {
    key: "2",
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"]
  },
  {
    key: "3",
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "teacher"]
  }
];
export default {
  data() {
    return {
      btnType: 1,
      data,
      columns,
      active: 0
    };
  },
  mounted() {
    this.getchart();
    this.container();
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
     chart.legend('year', {
  position: 'right',
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
    getData(index) {
      this.btnType = index;
    }
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
</style>
