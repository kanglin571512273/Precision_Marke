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
          <span class="iconfont icontuichu"></span>
        </a>
      </div>
    </div>
    <div class="layoutC">
      <router-view></router-view>
    </div>
    <div class="layoutF">
      <div class="layoutf">
        <router-link to="/marketingManage">
          <span class="iconfont iconyingxiaoguanli"></span>
          <span>营销管理</span>
        </router-link>
      </div>
      <div class="layoutf">
        <router-link to="/customerManage">
          <span class="iconfont iconkehuguanli1"></span>
          <span>客户管理</span>
        </router-link>
      </div>
      <div class="layoutf">
        <router-link to="/customerAnalysis">
          <span class="iconfont iconkehuguanli"></span>
          <span>客户分析</span>
        </router-link>
      </div>
      <div class="layoutf">
        <router-link to="/labelManage">
          <span class="iconfont iconbiaoqianguanli"></span>
          <span>标签管理</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Avatar, Icon, Modal } from "ant-design-vue";
Vue.use(Avatar);
Vue.use(Icon);

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    loginout() {
      let that = this;
      Modal.confirm({
        content: "确定退出登录吗？",
        width: "400px",
        centered: true,
        footer: {},
        onOk() {
          localStorage.removeItem("token");
          localStorage.removeItem("customData");
          localStorage.removeItem("labelData");
          that.$router.push("/login");
        },
        onCancel() {},
      });
    },
  },
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
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    display: flex;
    line-height: 100px;
    padding: 0 50px;
    border-bottom: 1px solid #ddd;
    background-color: rgba(238, 240, 255, 1);
    .userInfo {
      width: 270px;
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
      a {
        color: #333333;
      }
    }
  }
  .layoutC {
    flex: 1;
    padding: 100px 0;
  }
  .layoutF {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 108px;
    background-color: #fff;
    border-radius: 40px 40px 0 0;
    display: flex;
    padding: 10px 20px;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    box-shadow: 1px 1px 10px 0px #ddd;
    .layoutf {
      width: 25%;
    }
    a {
      display: inline-block;
      display: flex;
      flex-direction: column;
      margin: 0 10px;
      color: #aaa;
      font-size: 22px;
      span {
        margin-top: 5px;
      }
    }
    a.router-link-exact-active {
      color: #0060ff;

      font-size: 22px;
    }
  }
}
.iconfont {
  font-size: 40px;
}
.icontuichu {
  color: #0060ff;
}
</style>
<style lang="less">
.index {
  .ant-modal-confirm-body-wrapper {
    text-align: center;
  }
}
  .ant-modal-confirm-body {
    width: 200px;
    margin: 0 auto;
    background-color: pink;
  }
</style>