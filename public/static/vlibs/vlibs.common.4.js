((typeof self !== 'undefined' ? self : this)["webpackJsonpvlibs"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvlibs"] || []).push([[4],{

/***/ "de40":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"02e0fce3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/module/dev/PageLogin.vue?vue&type=template&id=78025ce4&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-button',{on:{"click":_vm.submit}},[_vm._v(" /api/v1/signup ")])],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./public/static/module/dev/PageLogin.vue?vue&type=template&id=78025ce4&

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__("bc3a");
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/module/dev/PageLogin.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//



/* harmony default export */ var PageLoginvue_type_script_lang_js_ = ({
  data() {
    return {};
  },
  methods: {
    async submit() {
      const h = this.$createElement;
      axios_default.a
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
});

// CONCATENATED MODULE: ./public/static/module/dev/PageLogin.vue?vue&type=script&lang=js&
 /* harmony default export */ var dev_PageLoginvue_type_script_lang_js_ = (PageLoginvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./public/static/module/dev/PageLogin.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  dev_PageLoginvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var PageLogin = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=vlibs.common.4.js.map