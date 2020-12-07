<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import Vue from "vue";
import { ConfigProvider } from "ant-design-vue";
import zhCN from "ant-design-vue/es/locale/zh_CN";
Vue.use(ConfigProvider);
export default {
  name: "App",
  data() {
    return {
      locale: zhCN,
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
<style lang="less">
.ant-table-filter-dropdown-btns {
  font-size: 25px;
}
.ant-dropdown-menu-item {
  font-size: 25px;
  padding: 10px 0;
  vertical-align: middle;
}
.ant-dropdown-menu {
  padding: 20px;
}
.ant-checkbox-inner {
  width: 20px;
  height: 20px;
}
.ant-checkbox-wrapper {
  vertical-align: top;
}
</style>
