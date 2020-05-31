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
      const h = this.$createElement;
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
          this.$notify({
            title: res.data.user.email,
            type: "success",
            message: h("i", { style: "color: teal" }, res.data.user.username)
          });
        })
        .catch(error => {
          console.log(error.response);
          this.$notify({
            title: error.response.data.message,
            type: "error",
            message: h("i", { style: "color: teal" }, error.response.data.stack)
          });
        });
    }
  }
};
</script>