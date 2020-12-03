<template>
  <div class="Panorama-box">
    <div class="Panorama-left">
      <div class="label-box">
        <span class="label-info">爱旅游</span>
        <span class="label-info">浙江杭州</span>
        <span class="label-info">高收入</span>
        <span class="label-info">年龄：25</span>
      </div>
      <div class="Panorama-gif">
        <div class="gif-font">{{ name }}</div>
      </div>
      <div class="label-box">
        <span class="label-info">爱旅游</span>
        <span class="label-info">浙江杭州</span>
        <span class="label-info">高收入</span>
        <span class="label-info">年龄：25</span>
      </div>
      <div>
        <div class="label">增加标签</div>
      </div>
    </div>
    <div class="Panorama-right">
      <div class="label-cont">
        <ul style="display: flex;">
          <li class="bot-label bot-label-active">推荐产品</li>
          <li class="bot-label">客户资料</li>
          <li class="bot-label">本行业务办理</li>
          <li class="bot-label">跟进结果</li>
        </ul>
      </div>
      <div class="contentarea">
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
    </div>
  </div>
</template>

<script>
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
  }
];

const data = [
  {
    key: "1",
    name: "John Brown",
    money: "￥300,000.00",
    address: "New York No. 1 Lake Park"
  },
  {
    key: "2",
    name: "Jim Green",
    money: "￥1,256,000.00",
    address: "London No. 1 Lake Park"
  },
  {
    key: "3",
    name: "Joe Black",
    money: "￥120,000.00",
    address: "Sidney No. 1 Lake Park"
  }
];
export default {
  data() {
    return {
      name: "渠俊娴",
      data,
      columns
    };
  }
};
</script>

<style lang="less" scoped>
.Panorama-box {
  width: 100%;
  display: flex;
  .Panorama-left {
    width: 40%;
    height: 900px;
    border-right: 2px solid #7ab2f7;
    .label-box {
      width: 100%;
      height: 100px;
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
  padding: 0 16px;
  height: 35px;
  line-height: 35px;
  border-radius: 20px;
  background: rgba(34, 101, 255, 0.04);
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
  margin: 83px 0 0 11px;
}
</style>
