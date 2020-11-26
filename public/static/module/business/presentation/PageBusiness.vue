<template>
  <VarContainer>
    <VarChild i-am="main">
      <VarPanel class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </VarPanel>
      <VarPanel class="box-card">
        <div v-for="o in 4" :key="o" class="text item">
          {{ "列表内容 " + o }}
        </div>
      </VarPanel>
    </VarChild>
  </VarContainer>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  props: {
    options: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      time: 1,
    };
  },
  mounted() {
    setInterval(() => {
      ++this.time;
    }, 1000);
  },
  methods: {
    go(type) {
      if (type === 0) {
        this.APP_ROUTER.push({});
      }
      if (type === 1) {
        this.APP_ROUTER.push({
          query: {
            sub: "add",
          },
        });
      }
      if (type === 2) {
        this.APP_ROUTER.push({
          query: {
            sub: "update",
            pjdjdjd: "asd",
          },
        });
      }
    },
  },
};
</script>
<style lang="less">
</style>