<template>
  <div>
    <h1>Login View</h1>
    <sub-div />
  </div>
</template>

<script>
import sub from "./Sub.vue";
import a from "../../lib/antd/test/another.bundle.js";
console.log("a",a);


const testData = { a: "a", b: "b", c: 1 };
export default {
  TEMPLATE_PLACEHOLDER,
  components: {
    subDiv: sub
  },
  data: () => ({ ...testData })
};
</script>
