<template>
  <div class="index">
    <div class="layoutH">
      <div class="userInfo">
        <a-avatar icon="user" />
        <span>工号:12270239</span>
      </div>
      <div class="title">{{ $route.meta.name }}</div>
      <div class="logout">
        退出
        <a-icon type="close-circle" theme="twoTone" />
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
};
</script>

<style lang="less" scoped>
.index {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fbf7fd;
  .layoutH {
    height: 60px;
    display: flex;
    line-height: 60px;
    padding: 0 10px;
    border-bottom: 1px solid #ddd;
    .userInfo {
      width: 150px;
    }
    .title {
      flex: 1;
      font-weight: 700;
    }
    .logout {
      text-align: right;
      width: 150px;
    }
  }
  .layoutC {
    flex: 1;
  }
  .layoutF {
    height: 60px;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    display: flex;
    padding: 0 20px;
    justify-content: space-between;
    align-content: center;
    align-items: center;
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
      color: #0099ff;
    }
  }
}
</style>