<template>
  <div>
    <div>inputValue: {{ inputValue }}</div>
    <div>
      <input id="input-1">
    </div>
    <div id="input-mvvm" />
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import mvvm from "./mvvm.mjs";
export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  props: {},
  data() {
    return {
      inputValue: ""
    };
  },
  created() {
    const { $ } = window;
    window.$ = mvvm($);
  },
  mounted() {
    const { $ } = window;
    const _this = this;
    $("#input-1").on("click", function() {
      const $input = $(this);
      _this.inputValue = $input.val();
    });

    $.mvvm("#input-mvvm",{
      data:{

      }
    });
  },
  created() {},
  methods: {}
};
</script>