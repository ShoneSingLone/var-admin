<template>
  <div class="Demo">
    <h1>currentView:{{ currentView }}</h1>
    <div v-show="currentView==='main'">
      <el-button @click="go(1)">
        add
      </el-button>
      <el-button @click="go(2)">
        update
      </el-button>
    </div>
    <div v-if="currentView==='add'">
      <el-button @click="go(0)">
        main
      </el-button>
      <pre>
    {{ JSON.stringify( APP_ROUTER.currentRoute,null,2) }}
    </pre>
    </div>
    <div v-if="currentView==='update'">
      <el-button @click="go(0)">
        main
      </el-button>
      <pre>
    {{ JSON.stringify( options,null,2) }}
    </pre>
    </div>
  </div>
</template>
<script>
import baseMixin from "@@/static/js/app/github/mixin/baseMixin.mjs";
export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [baseMixin],
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    go(type) {
      if (type === 0) {
        this.APP_ROUTER.push({});
      }
      if (type === 1) {
        this.APP_ROUTER.push({
          query: {
            sub: "add"
          }
        });
      }
      if (type === 2) {
        this.APP_ROUTER.push({
          query: {
            sub: "update",
            pjdjdjd: "asd"
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
</style>