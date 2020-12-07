<template>
  <div class="followUpFeedback">
    <a-table :columns="columns"> </a-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Tag, Divider, Modal } from "ant-design-vue";
Vue.use(Button);
Vue.use(Table);
export default {
  data() {
    return {
      columns: {},
    };
  },
};
</script>

<style lang="less" scoped>
.followUpFeedback {
}
</style>