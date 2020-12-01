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
        <canvas id="container" width="700px" height="290px"></canvas>
      </div>
      <div class="card">
        <canvas id="charts" width="440px" height="290px"></canvas>
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
import F2 from "@antv/f2";
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
        {
          name: "网易云联名卡",
          percent: 40,
          a: "1"
        },
        {
          name: "环保卡",
          percent: 10,
          a: "1"
        },
        {
          name: "诗意生活信用卡",
          percent: 30,
          a: "1"
        },
        {
          name: "爱奇艺联名信用卡",
          percent: 20,
          a: "1"
        }
      ];

      const map = {};
      data.forEach(function(obj) {
        map[obj.name] = obj.percent + "%";
      });

      const chart = new F2.Chart({
        id: "charts",
        pixelRatio: window.devicePixelRatio,
        padding: [20, "auto"]
      });
      chart.source(data, {
        percent: {
          formatter: function formatter(val) {
            return val + "%";
          }
        }
      });
      chart.tooltip(false);
      chart.legend({
        position: "right",
        itemFormatter: function itemFormatter(val) {
          return val + "    " + map[val];
        }
      });
      chart.coord("polar", {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      });
      chart.axis(false);
      chart
        .interval()
        .position("a*percent")
        .color("name", ["#0052FF", "#5AD8A6", "#5D7092", "#FF6D3F"])
        .adjust("stack");
      chart.render();
    },
    container() {
      const data = [
        {
          time: "2016-08-08 00:00:00",
          value: 10,
          type: "预期收益率"
        },
        {
          time: "2016-08-08 00:10:00",
          value: 22,
          type: "预期收益率"
        },
        {
          time: "2016-08-08 00:30:00",
          value: 16,
          type: "预期收益率"
        },
        {
          time: "2016-08-09 00:35:00",
          value: 26,
          type: "预期收益率"
        },
        {
          time: "2016-08-09 01:00:00",
          value: 12,
          type: "预期收益率"
        },
        {
          time: "2016-08-09 01:20:00",
          value: 26,
          type: "预期收益率"
        },
        {
          time: "2016-08-10 01:40:00",
          value: 18,
          type: "预期收益率"
        },
        {
          time: "2016-08-10 02:00:00",
          value: 26,
          type: "预期收益率"
        },
        {
          time: "2016-08-10 02:20:00",
          value: 12,
          type: "预期收益率"
        },
        {
          time: "2016-08-08 00:00:00",
          value: 4,
          type: "实际收益率"
        },
        {
          time: "2016-08-08 00:10:00",
          value: 3,
          type: "实际收益率"
        },
        {
          time: "2016-08-08 00:30:00",
          value: 6,
          type: "实际收益率"
        },
        {
          time: "2016-08-09 00:35:00",
          value: -12,
          type: "实际收益率"
        },
        {
          time: "2016-08-09 01:00:00",
          value: 1,
          type: "实际收益率"
        },
        {
          time: "2016-08-09 01:20:00",
          value: 9,
          type: "实际收益率"
        },
        {
          time: "2016-08-10 01:40:00",
          value: 13,
          type: "实际收益率"
        },
        {
          time: "2016-08-10 02:00:00",
          value: -3,
          type: "实际收益率"
        },
        {
          time: "2016-08-10 02:20:00",
          value: 11,
          type: "实际收益率"
        }
      ];
      const chart = new F2.Chart({
        id: "container",
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        time: {
          type: "timeCat",
          tickCount: 3,
          mask: "hh:mm",
          range: [0, 1]
        },
        value: {
          tickCount: 3,
          formatter: function formatter(ivalue) {
            return ivalue + "%";
          }
        }
      });
      chart.axis("time", {
        line: null,
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        }
      });
      chart.axis("tem", {
        grid: function grid(text) {
          if (text === "0%") {
            return {
              lineDash: null,
              lineWidth: 1
            };
          }
        }
      });
      chart.legend({
        position: "bottom",
        offsetY: -5
      });
      chart
        .line()
        .position("time*value")
        .color("type")
        .shape("type", function(type) {
            return "line";
        });

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
      background: #FFF;
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
    height: 530px;
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
</style>
