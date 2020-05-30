<template>
  <div>
    <el-button @click="submit">
      /api/v1/signup
    </el-button>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {};
  },
  methods: {
    async submit() {
      axios
        .post("/api/v1/signup", {
          name: "",
          username: "abbo",
          password: "abboright",
          confirm_password: "abboright",
          email: "abbo@qq.com",
          code: "64d44cf6"
        })
        .then(res => {
          console.log("res", res);
        })
        .catch(error => {
          const h = this.$createElement;
          console.log(error.toJSON());
          this.$notify({
            title: error.response.data.message,
            type:"error",
            message: h("i", { style: "color: teal" }, error.response.data.stack)
          });
        });
    }
  }
};
</script>