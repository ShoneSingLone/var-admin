<template>
  <div class="Demo">
    <el-button @click="go(1)">
      go
    </el-button>
    <el-button @click="go(2)">
      go2
    </el-button>
    demo:{{ options }}
  </div>
</template>


<script>
const { APP_STATE, APP_ROUTER } = window;
export default {
  name: "Demo",
  props: {
    options: {
      type: Object,
      default: function() {
        return { APP_ROUTER, APP_STATE };
      }
    }
  },
  data() {
    return {};
  },
  created() {
    /* 追加路由 */
    APP_ROUTER.addSubRoutes(this.options, [
      {
        name: "新增",
        path: this.options.path + "/add",
        url: "/statics/base/page.html?page=logmanagement.lm01.PageLm01"
      },
      {
        name: "修改",
        path:  this.options.path + "/update/asdfasf",
        url: "/statics/base/page.html?page=logmanagement.lm01.PageLm01"
      }
    ]);
  },
  mounted() {},
  methods: {
    go(type) {
      if (type === 1) {
        APP_ROUTER.push({
          path: this.options.path + "/add"
        });
      }
      if (type === 2) {
        APP_ROUTER.push({
          path: this.options.path + "/update/asdfasf"
        });
      }
    }
  }
};
</script>
<style lang="scss">
</style>