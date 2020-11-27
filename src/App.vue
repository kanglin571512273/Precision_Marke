<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <div>
    <a-button type="primary">
      Primary
    </a-button>
    <a-button>Default</a-button>
    <a-button type="dashed">
      Dashed
    </a-button>
    <a-button type="danger">
      Danger
    </a-button>
    
  </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button } from 'ant-design-vue';
Vue.use(Button);
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

<style lang="less" scoped>

</style>
