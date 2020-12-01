<template>
   <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
    </template>
  </a-result>
</template>

<script>
import Vue from "vue";
import { Result } from "ant-design-vue";
Vue.use(Result);
export default {
    
}
</script>