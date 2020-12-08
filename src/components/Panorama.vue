<template>
  <div class="Panorama-box">
    <div class="Panorama-left">
      <a-drawer
        width="37%"
        placement="left"
        :closable="false"
        :visible="visible"
        :get-container="false"
        :wrap-style="{
          position: 'absolute',
        }"
        @close="onClose"
      >
        <div class="outer-box">
          <div class="outer">
            <div class="inner">
              <div class="inner-font">请选择标签</div>
              <ul class="labelbox">
                <li
                  class="labelson"
                  :class="{ 'labelson-active': labelDatas.indexOf(index) > -1 }"
                  @click="active(index)"
                  v-for="(item, index) in labelData"
                  :key="index"
                >
                  {{ item.labelName }}
                </li>
              </ul>
              <div class="button-box">
                <div class="button-item" @click="onClose">确定</div>
                <div class="button-item" @click="onClose">取消</div>
              </div>
            </div>
          </div>
        </div>
      </a-drawer>
      <div class="label-boxs">
        <span class="label-info">爱旅游</span>
        <span class="label-info">浙江杭州</span>
        <span class="label-info">高收入</span>
        <span class="label-info">年龄：25</span>
      </div>
      <div class="Panorama-gif">
        <div class="gif-font">{{ datas.customerName }}</div>
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
        <ul style="display: flex">
          <li
            class="bot-label"
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
          :columns="firstColumns"
          :data-source="fitstData"
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
              <th>客户姓名：</th>
              <td>{{ datas.customerName }}</td>
            </tr>
            <tr>
              <th>教育程度：</th>
              <td>本科</td>
            </tr>
            <tr>
              <th>住房贷款：</th>
              <td>5151</td>
            </tr>
            <tr>
              <th>账户余额：</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>性别：</th>
              <td>男</td>
            </tr>
            <tr>
              <th>婚姻状况:</th>
              <td>1500万</td>
            </tr>
            <tr>
              <th>个人贷款：</th>
              <td>599</td>
            </tr>
            <tr>
              <th>信用情况：</th>
              <td>599</td>
            </tr>
          </table>

          <table class="gridtablse">
            <tr>
              <th>身份证号：</th>
              <td>{{ datas.identifyNum }}</td>
            </tr>
            <tr>
              <th>工作单位：</th>
              <td>{{ datas.addr }}</td>
            </tr>
            <tr>
              <th>定期存款：</th>
              <td>否</td>
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
                <p>2020/11/30 13:20:00 跟进人：陈志坚</p>
                <p>沟通内容:“安心得利”理财</p>
                <p>办理情况：有意向</p>
              </a-timeline-item>
              <a-timeline-item>
                <p>2020/11/15 16:20:00 跟进人：陈志坚</p>
                <p>沟通内容:网易云音乐联名卡</p>
                <p>办理情况：有意向</p>
              </a-timeline-item>
              <a-timeline-item>
                <p>2020/11/12 8:20:00 跟进人：陈志坚</p>
                <p>沟通内容:个人汽车贷款</p>
                <p>办理情况：不感兴趣</p>
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
const firstColumns = [
  {
    title: "序号",
    key: "index",
    width: "65px",
    customRender: (t, r, index) => {
      return parseInt((1 - 1) * 10 + index + 1);
    },
  },
  {
    title: "产品类型",
    key: "productType",
    dataIndex: "productType",
  },
  {
    title: "产品名称",
    key: "productName",
    dataIndex: "productName",
  },
  {
    title: "最近跟进时间",
    key: "updateTime",
    dataIndex: "updateTime",
  },
  {
    title: "跟进结果",
    key: "resoult",
    dataIndex: "resoult",
  },
];
const columns = [
  {
    title: "序号",
    key: "index",
    width: "65px",
    customRender: (t, r, index) => {
      return parseInt((1 - 1) * 10 + index + 1);
    },
  },
  {
    title: "产品名称",
    key: "productName",
    dataIndex: "productName",
  },
  {
    title: "是否办理",
    key: "isItHandled",
    dataIndex: "isItHandled",
  },
];

const fitstData = [
  {
    key: "1",
    productType: "理财",
    productName: "'安心得利'理财",
    updateTime: "2020/11/30 13:20",
    resoult: "有意向",
  },
  {
    key: "2",
    productType: "信用卡",
    productName: "网易云音乐联名卡",
    updateTime: "2020/11/15 13:20",
    resoult: "有意向",
  },
  {
    key: "3",
    productType: "贷款",
    productName: "个人汽车贷款",
    updateTime: "2020/11/12 13:20",
    resoult: "不敢兴趣",
  },
];

const data = [
  {
    key: "1",
    productName: "'安心得利'理财",
    isItHandled: "否",
  },
  {
    key: "2",
    productName: "网易云音乐联名卡",
    isItHandled: "否",
  },
  {
    key: "3",
    productName: "个人汽车贷款",
    isItHandled: "否",
  },
];
export default {
  props: {
    datas: Object,
  },
  data() {
    return {
      num: 0,
      data,
      columns,
      firstColumns,
      fitstData,
      visible: false,
      isShow: 0,
      labelData: [],
      labelDatas: [],
    };
  },
  mounted() {
    this.labelData = JSON.parse(localStorage.getItem("labelData"));
  },
  methods: {
    afterVisibleChange(val) {
      console.log("visible", val);
    },
    showDrawer() {
      this.visible = true;
    },
    onClose() {
      this.labelDatas = [];
      this.visible = false;
    },
    active(index) {
      let arrIndex = this.labelDatas.indexOf(index);
      console.log(arrIndex);

      if (arrIndex > -1) {
        this.labelDatas.splice(arrIndex, 1);
      } else {
        this.labelDatas.push(index);
      }
      console.log(this.labelDatas, 2222);
      // this.isShow = index;
      // console.log(index,2222)
    },
  },
};
</script>

<style lang="less" scoped>
.Panorama-box {
  width: 100%;
  margin: 40px 40px 40px 0;
  display: flex;
  .Panorama-left {
    width: 40%;
    height: 900px;
    border-right: 2px solid #7ab2f7;
    .label-box {
      height: 100px;
      position: relative;
      .label-info:nth-child(1) {
        position: absolute;
        top: 100px;
        left: 50px;
      }
      .label-info:nth-child(2) {
        position: absolute;
        top: 40px;
        left: 200px;
      }
      .label-info:nth-child(3) {
        position: absolute;
        top: 40px;
        left: 350px;
      }
      .label-info:nth-child(4) {
        position: absolute;
        top: 100px;
        left: 500px;
      }
    }
    .label-boxs {
      height: 100px;
      position: relative;
      .label-info:nth-child(1) {
        position: absolute;
        top: 0px;
        left: 50px;
      }
      .label-info:nth-child(2) {
        position: absolute;
        top: 40px;
        left: 200px;
      }
      .label-info:nth-child(3) {
        position: absolute;
        top: 40px;
        left: 350px;
      }
      .label-info:nth-child(4) {
        position: absolute;
        top: 0px;
        left: 500px;
      }
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

.outer {
  height: 560px;
  width: 555px;
  margin: auto 0;
  z-index: 1;
}
.outer:before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  filter: blur(90px);
  background: url(../assets/image/Snipaste.png) no-repeat 50% 50%;
  background-size: 50%;
  z-index: -1;
}
.inner {
  height: 100%;
  width: 600px;
  padding-top: 40px;
  .inner-font {
    font-size: 33px;
    font-weight: 600;
    color: #333333;
    line-height: 50px;
    text-align: left;
  }
}
.outer-box {
  height: 950px;
  width: 555px;
  position: relative;
}
.labelbox {
  width: 100%;
  height: 600px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  .labelson {
    width: 118px;
    height: 50px;
    line-height: 50px;
    background: #ffffff;
    border-radius: 25px;
    border: 2px dashed #ced0d7;
    margin: 10px 30px 31px 0;
  }
  .labelson-active {
    border: 2px solid #0060ff;
  }
}
.button-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 250px;
  .button-item {
    width: 112px;
    height: 43px;
    line-height: 43px;
    background: #0060ff;
    border-radius: 30px;
    color: #fff;
    font-size: 22px;
  }
  .button-item:nth-child(2) {
    background: rgba(8, 0, 0, 0);
    border: 2px solid #ced0d7;
    margin-left: 30px;
    color: #999999;
  }
}
.ant-timeline-item-content {
  p {
    font-size: 24px;
  }
}
</style>
<style>
.ant-modal-body {
  padding-left: 0;
}
.ant-drawer-content {
  box-shadow: 0px 2px 10px 0px rgba(0, 74, 196, 0.07);
  border-radius: 10px;
}
</style>
