<template>
  <div class="index">
    <div class="layoutH">
      <div class="userInfo">
        <a-avatar icon="user" />
        <span class="userInfo-font">工号：567898768576890</span>
      </div>
      <div class="title">{{ $route.meta.name }}</div>
      <div class="logout">
        <a @click="loginout">
          退出
          <a-icon type="close-circle" theme="twoTone" />
        </a>
      </div>
    </div>
    <div class="layoutC">
      <router-view></router-view>
    </div>
    <div class="layoutF">
      <router-link to="/marketingManage">
        <a-icon type="line-chart" />
        <span>营销管理</span>
      </router-link>
      <router-link to="/customerManage">
        <a-icon type="pic-center" />
        <span>客户管理</span>
      </router-link>
      <router-link to="/customerAnalysis">
        <a-icon type="pie-chart" />
        <span>客户分析</span>
      </router-link>
      <router-link to="/labelManage">
        <a-icon type="book" />
        <span>标签管理</span>
      </router-link>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Avatar, Icon } from "ant-design-vue";
Vue.use(Avatar);
Vue.use(Icon);

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    loginout() {
      localStorage.removeItem("token")
      // this.$confirm({
      //   title: "Do you want to delete these items?",
      //   content:
      //     "When clicked the OK button, this dialog will be closed after 1 second",
      //   onOk() {
      //     return new Promise((resolve, reject) => {
      //       setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
      //     }).catch(() => localStorage.removeItem("token"));
      //   },
      //   onCancel() {}
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: rgba(238, 240, 255, 0.3);
  .layoutH {
    height: 100px;
    display: flex;
    line-height: 100px;
    padding: 0 50px;
    border-bottom: 1px solid #ddd;
    .userInfo {
      width: 256px;
      line-height: 100px;
      .userInfo-font {
        font-size: 18px;
        margin-left: 15px;
      }
    }
    .title {
      flex: 1;
      font-weight: 400;
      color: #333333;
      line-height: 100px;
      font-size: 28px;
      text-align: center;
    }
    .logout {
      text-align: right;
      width: 256px;
      font-size: 18px;
      color: #333333;
    }
  }
  .layoutC {
    flex: 1;
  }
  .layoutF {
    height: 88px;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    font-size: 22px;
    a {
      display: inline-block;
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      color: #ccc;
      span {
        margin-top: 5px;
      }
    }
    a.router-link-exact-active {
      color: #0060ff;
    }
  }
}
</style>
