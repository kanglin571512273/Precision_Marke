<template>
  <div class="Panorama-box">
    <div class="Panorama-left">
      <a-drawer
        title="Basic Drawer"
        width='35%'
        placement="left"
        :closable="false"
        :visible="visible"
        :get-container="false"
        :wrap-style="{ position: 'absolute' }"
        @close="onClose"
      >
        <p>Some contents...</p>
      </a-drawer>
      <div class="label-boxs">
        <span class="label-info">爱旅游</span>
        <span class="label-info">浙江杭州</span>
        <span class="label-info">高收入</span>
        <span class="label-info">年龄：25</span>
      </div>
      <div class="Panorama-gif">
        <div class="gif-font">{{ name }}</div>
      </div>
      <div class="label-boxs">
        <span class="label-info">爱旅游</span>
        <span class="label-info">浙江杭州</span>
        <span class="label-info">高收入</span>
        <span class="label-info">年龄：25</span>
      </div>
      <div>
        <div class="label" @click="showDrawer">增加标签</div>
      </div>
    </div>
    <div class="Panorama-right">
      <div class="label-cont">
        <ul style="display: flex;">
          <li
            class="bot-label "
            @click="num = 0"
            :class="{ 'bot-label-active': num == 0 }"
          >
            推荐产品
          </li>
          <li
            class="bot-label"
            @click="num = 1"
            :class="{ 'bot-label-active': num == 1 }"
          >
            客户资料
          </li>
          <li
            class="bot-label"
            @click="num = 2"
            :class="{ 'bot-label-active': num == 2 }"
          >
            本行业务办理
          </li>
          <li
            class="bot-label"
            @click="num = 3"
            :class="{ 'bot-label-active': num == 3 }"
          >
            跟进结果
          </li>
        </ul>
      </div>
      <div class="contentarea" v-show="num == 0">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
        >
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
        </a-table>
      </div>
      <div class="contentarea" v-show="num == 1">
        <div class="table-box">
          <table class="gridtablse">
            <tr>
              <th>客户姓名:</th>
              <td>李小男</td>
            </tr>
            <tr>
              <th>营业收入:</th>
              <td>1500万</td>
            </tr>
            <tr>
              <th>上级机构:</th>
              <td>中山支行</td>
            </tr>
            <tr>
              <th>参保人员:</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>客户姓名:</th>
              <td>李小男</td>
            </tr>
            <tr>
              <th>营业收入:</th>
              <td>1500万</td>
            </tr>
            <tr>
              <th>上级机构:</th>
              <td>中山支行</td>
            </tr>
            <tr>
              <th>参保人员:</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>资产总额</th>
              <td>20000万</td>
            </tr>
            <tr>
              <th>成立日期</th>
              <td>2017年1月5日</td>
            </tr>
            <tr>
              <th>企业电话</th>
              <td>400-800-8888</td>
            </tr>
          </table>
        </div>
        <div class="pone-label">
          <span>个人标签：</span>
          <div class="label-box">
            <span class="label-info">爱旅游</span>
            <span class="label-info">浙江杭州</span>
            <span class="label-info">高收入</span>
            <span class="label-info">年龄：25</span>
          </div>
        </div>
      </div>
      <div class="contentarea" v-show="num == 2">
        <a-table
          :columns="columns"
          :data-source="data"
          bordered
          :pagination="false"
        >
          <template slot="name" slot-scope="text">
            <a>{{ text }}</a>
          </template>
        </a-table>
      </div>
      <div class="contentarea" v-show="num == 3">
        <div class="time-cont">
          <template>
            <a-timeline>
              <a-timeline-item>
                <p>2020-01-26 11:02 跟进人：仁欣美</p>
                <p>沟通内容：海绵宝宝联名信用卡</p>
                <p>办理情况：感兴趣</p>
              </a-timeline-item>
              <a-timeline-item>
                <p>2020-01-26 11:02 跟进人：仁欣美</p>
                <p>沟通内容：海绵宝宝联名信用卡</p>
                <p>办理情况：感兴趣</p>
              </a-timeline-item>
              <a-timeline-item>
                <p>2020-01-26 11:02 跟进人：仁欣美</p>
                <p>沟通内容：海绵宝宝联名信用卡</p>
                <p>办理情况：感兴趣</p>
              </a-timeline-item>
              <a-timeline-item>
                <p>2020-01-26 11:02 跟进人：仁欣美</p>
                <p>沟通内容：海绵宝宝联名信用卡</p>
                <p>办理情况：感兴趣</p>
              </a-timeline-item>
            </a-timeline>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Timeline, Drawer } from "ant-design-vue";
Vue.use(Timeline);
Vue.use(Drawer);
const columns = [
  {
    title: "Name",
    dataIndex: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Cash Assets",
    className: "column-money",
    dataIndex: "money"
  },
  {
    title: "Address",
    dataIndex: "address"
  },
  {
    title: "pink",
    dataIndex: "pink"
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park",
    pink: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park",
    pink: "New York No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park",
    pink: "New York No. 1 Lake Park"
  }
];
export default {
  data() {
    return {
      name: "赵芳芳",
      num: 0,
      data,
      columns,
      visible: false
    };
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.visible = false;
    }
  }
};
</script>

<style lang="less" scoped>
.Panorama-box {
  width: 100%;
  display: flex;
  padding: 40px;
  .Panorama-left {
    width: 40%;
    height: 900px;
    border-right: 2px solid #7ab2f7;
    .label-boxs {
      display: flex;
      height: 100px;
      align-items: center;
      justify-content: space-around;
      position: relative;
    }
    .Panorama-gif {
      width: 600px;
      height: 600px;
      margin: 0 auto;
      background: url("../assets/image/Precisegif.gif") no-repeat;
      //   background: pink;
      background-size: cover;
      position: relative;
      .gif-font {
        width: 145px;
        height: 145px;
        line-height: 145px;
        background: #2343ff;
        color: #ffffff;
        font-weight: 600;
        font-size: 30px;
        border-radius: 50%;
        position: absolute;
        top: 229px;
        left: 225px;
      }
    }
  }
  .label {
    width: 118px;
    height: 43px;
    line-height: 43px;
    background: #0060ff;
    border-radius: 30px;
    color: #fff;
    margin: 0 auto;
  }
}
.label-info {
  display: block;
  width: 80px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: rgba(34, 101, 255, 0.04);
  margin-left: 20px;
}
.bot-label {
  width: 195px;
  height: 43px;
  line-height: 43px;
  border-radius: 30px;
  border: 2px solid #ced0d7;
  color: #999;
  font-size: 22px;
  margin-left: 20px;
}
.bot-label-active {
  width: 195px;
  height: 43px;
  line-height: 43px;
  border-radius: 30px;
  border: 2px solid #0060ff;
  color: #0060ff;
  font-size: 22px;
}
.contentarea {
  margin: 30px 0 0 11px;
}
.label-cont {
  margin-top: 20px;
}
.Panorama-right {
  width: 60%;
  margin-left: 30px;
}
.time-cont {
  width: 50%;
  margin-top: 60px;
}
.table-box {
  display: flex;
  justify-content: space-between;
}
.gridtablse {
  font-size: 18px;
}
.gridtablse tr td {
  width: 150px;
  text-align: left;
  padding-left: 20px;
}
.gridtablse tr {
  height: 50px;
}
.pone-label {
  font-size: 18px;
  display: flex;
  align-items: center;
}
.label-box {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
// .label-info:nth-child(2){
//   position: absolute;
//   top: 80px;
// }

.ant-timeline-item-content {
  p {
    text-align: left;
  }
}
</style>
