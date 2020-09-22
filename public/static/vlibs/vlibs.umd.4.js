((typeof self !== 'undefined' ? self : this)["webpackJsonpvlibs"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpvlibs"] || []).push([[4],{

/***/ "391c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2ef1dbf3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/bundle/PageLayoutEditor/index.vue?vue&type=template&id=295ebb5d&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"layouter"},[_c('ul',{staticClass:"item-list panel"},_vm._l((_vm.itemInfo),function(item,key){return _c('drag',{key:key,class:['item-wrapper',{'notice-unuse':_vm.getUsedTimes(item)<1}],attrs:{"tag":"li","transfer-data":item}},[_vm._v(" "+_vm._s(item.label)+" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.getUsedTimes(item)>1),expression:"getUsedTimes(item)>1"}],staticClass:"use-many-times"},[_vm._v("use "+_vm._s(_vm.getUsedTimes(item))+" times")])])}),1),_c('div',{staticClass:"table"},[_c('div',{staticClass:"panel table-options"},_vm._l((_vm.tableConfigs),function(val,prop){return _c('div',{key:prop,staticClass:"config"},[_c('span',[_vm._v(_vm._s(prop)+":")]),_c('el-input',{model:{value:(_vm.tableConfigs[prop]),callback:function ($$v) {_vm.$set(_vm.tableConfigs, prop, $$v)},expression:"tableConfigs[prop]"}})],1)}),0),_c('table',{staticClass:"table-stage panel"},[_vm._l((_vm.dsl),function(rowItem,rowIndex){return _c('tr',{key:rowIndex},[_c('td',{staticClass:"remove-row"},[_c('el-button',{on:{"click":function($event){return _vm.removeRow(rowIndex)}}},[_vm._v(" -Row ")])],1),_vm._l((rowItem),function(colItem,colIndex){return _c('drop',{key:colItem.p||'empty'+colIndex,staticClass:"td-item",attrs:{"tag":"td","colspan":colItem.c||1,"rowspan":colItem.r||1},on:{"drop":function($event){return _vm.handleDrop({ rowIndex: rowIndex,colIndex: colIndex},$event)}}},[_c('drag',{staticClass:"item-wrapper",attrs:{"tag":"div","transfer-data":{ rowIndex: rowIndex,colIndex: colIndex}}},[_c('span',{staticClass:"label"},[_vm._v(_vm._s(_vm.itemInfo[colItem.p]&&_vm.itemInfo[colItem.p].label))]),_c('i',{staticClass:"el-icon-edit icon",on:{"click":function($event){return _vm.handleClickItem(colItem,{r:rowIndex,c:colIndex})}}})])],1)}),_c('td',{staticClass:"add-col"},[_c('el-button',{on:{"click":function($event){return _vm.addCol(rowItem)}}},[_vm._v(" +Col ")]),_c('el-button',{on:{"click":function($event){return _vm.removeCol(rowItem)}}},[_vm._v(" -Col ")])],1)],2)}),_c('tr',[_c('td',{staticClass:"add-row"},[_c('el-button',{on:{"click":_vm.addRow}},[_vm._v(" +Row ")])],1)])],2)]),_c('div',{staticClass:"json-panel"},[_c('div',{staticClass:"json-panel-item panel layout"},[_c('h6',[_vm._v("布局")]),_c('monaco',{model:{value:(_vm.dsl),callback:function ($$v) {_vm.dsl=$$v},expression:"dsl"}})],1),_c('div',{staticClass:"json-panel-item panel item-info"},[_c('h6',[_vm._v("所有item信息")]),_c('monaco',{attrs:{"is-format":"true"},on:{"change":_vm.handleItemInfoChange},model:{value:(_vm.itemInfo),callback:function ($$v) {_vm.itemInfo=$$v},expression:"itemInfo"}})],1),_c('div',{staticClass:"json-panel-item panel col-item"},[_c('h6',[_vm._v("单个item布局信息修改")]),_c('monaco',{attrs:{"value":_vm.itemDsl,"is-format":"true"},on:{"change":_vm.handleItemChange}})],1)])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/index.vue?vue&type=template&id=295ebb5d&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"2ef1dbf3-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/bundle/PageLayoutEditor/Monaco.vue?vue&type=template&id=41ee24ec&
var Monacovue_type_template_id_41ee24ec_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"container",staticStyle:{"height":"100%"}})}
var Monacovue_type_template_id_41ee24ec_staticRenderFns = []


// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/Monaco.vue?vue&type=template&id=41ee24ec&

// EXTERNAL MODULE: ./node_modules/monaco-editor/esm/vs/editor/editor.api.js + 335 modules
var editor_api = __webpack_require__("f33e");

// EXTERNAL MODULE: ./node_modules/lodash/isString.js
var isString = __webpack_require__("e2a0");
var isString_default = /*#__PURE__*/__webpack_require__.n(isString);

// EXTERNAL MODULE: ./node_modules/lodash/isArray.js
var isArray = __webpack_require__("6747");
var isArray_default = /*#__PURE__*/__webpack_require__.n(isArray);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/bundle/PageLayoutEditor/Monaco.vue?vue&type=script&lang=js&
//
//
//
//
//
//





/* harmony default export */ var Monacovue_type_script_lang_js_ = ({
  name: "Monaco",
  model: {
    prop: "value",
    event: "change",
  },
  props: ["value", "isFormat"],
  data() {
    return {
      monacoInstance: false,
    };
  },
  mounted() {
    this.init();
    this.$watch(
      "value",
      (val) => {
        try {
          if (isArray_default()(val) && isString_default()(val[0])) {
            val = val.map((p) => [{ p }]);
            this.$emit("change", val);
          }
          this.monacoInstance &&
            this.monacoInstance.setValue(
              this.isFormat ? JSON.stringify(val, null, 2) : JSON.stringify(val)
            );
        } catch (error) {
          console.log(error);
        }
      },
      { immediate: true }
    );
  },
  methods: {
    setValue(model) {
      this.monacoInstance &&
        this.monacoInstance.setValue(JSON.stringify(model));
    },
    async init() {
      try {
        //创建编辑器
        this.monacoInstance = editor_api["c" /* editor */].create(this.$refs.container, {
          //内容
          // value: 'console.log("Hello world!");',
          //语言
          language: "javascript",
          //自适应调整
          automaticLayout: true,
          //主题，三款：vs、vs-dark、hc-black
          theme: "vs-dark",
          //代码略缩图
          minimap: {
            enabled: true,
          },
        });
        //内容改变事件
        /*       this.monacoInstance.onDidChangeModelContent(e => { });
         */
        //添加按键监听
        this.monacoInstance.addCommand(
          editor_api["b" /* KeyMod */].CtrlCmd | editor_api["a" /* KeyCode */].KEY_S,
          () => {
            try {
              const fnGetVal = new Function(
                `return ${this.monacoInstance.getValue()}`
              );
              this.$emit("change", fnGetVal());
            } catch (error) {
              console.error(error);
              this.setValue(this.value);
              const h = this.$createElement;
              this.$message({
                message: h("p", null, [
                  h("span", null, "JSON 有问题，不转换"),
                  h("i", { style: "color: teal" }),
                ]),
              });
            }
          }
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
});

// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/Monaco.vue?vue&type=script&lang=js&
 /* harmony default export */ var PageLayoutEditor_Monacovue_type_script_lang_js_ = (Monacovue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/Monaco.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  PageLayoutEditor_Monacovue_type_script_lang_js_,
  Monacovue_type_template_id_41ee24ec_render,
  Monacovue_type_template_id_41ee24ec_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var Monaco = (component.exports);
// EXTERNAL MODULE: ./node_modules/lodash/cloneDeep.js
var cloneDeep = __webpack_require__("0644");
var cloneDeep_default = /*#__PURE__*/__webpack_require__.n(cloneDeep);

// EXTERNAL MODULE: ./node_modules/lodash/has.js
var has = __webpack_require__("3852");
var has_default = /*#__PURE__*/__webpack_require__.n(has);

// EXTERNAL MODULE: ./node_modules/lodash/map.js
var map = __webpack_require__("dd61");
var map_default = /*#__PURE__*/__webpack_require__.n(map);

// EXTERNAL MODULE: ./node_modules/lodash/flattenDeep.js
var flattenDeep = __webpack_require__("991b");
var flattenDeep_default = /*#__PURE__*/__webpack_require__.n(flattenDeep);

// EXTERNAL MODULE: ./node_modules/lodash/each.js
var each = __webpack_require__("c641");
var each_default = /*#__PURE__*/__webpack_require__.n(each);

// EXTERNAL MODULE: ./node_modules/vue-drag-drop/dist/vue-drag-drop.common.js
var vue_drag_drop_common = __webpack_require__("df76");
var vue_drag_drop_common_default = /*#__PURE__*/__webpack_require__.n(vue_drag_drop_common);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./public/static/bundle/PageLayoutEditor/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//









external_commonjs_vue_commonjs2_vue_root_Vue_default.a.use(vue_drag_drop_common_default.a);


/* harmony default export */ var PageLayoutEditorvue_type_script_lang_js_ = ({
  name: "Layouter",
  components: { Monaco: Monaco },
  data() {
    return {
      tableConfigs: {
        col: 3,
        row: 1,
      },
      itemInfo: {},
      currentrc: "",
      dsl: [[{ p: "" }, { p: "" }, { p: "" }]],
      itemDsl: {},
      targetText: "target source",
    };
  },
  computed: {
    flattendsl() {
      return flattenDeep_default()(this.dsl).map((i) => i.p);
    },
  },
  methods: {
    getUsedTimes(item) {
      let count = 0;
      each_default()(this.flattendsl, (prop) => {
        if (item.prop === prop) count++;
      });
      return count;
    },
    addCol(row) {
      row.push({ p: "" });
      const _list = cloneDeep_default()(this.dsl);
      this.dsl = _list;
    },
    removeCol(row) {
      row.splice(row.length - 1);
      const _list = cloneDeep_default()(this.dsl);
      this.dsl = _list;
    },
    addRow() {
      this.dsl.push(
        (this.dsl[0] && this.dsl[0].map(() => ({ p: "" }))) || [{ p: "" }]
      );
    },
    removeRow(rowIndex) {
      this.dsl.splice(rowIndex, 1);
    },
    handleDrop(toItem, fromItem /* transfer-data */) {
      const _list = cloneDeep_default()(this.dsl);
      let fromValue, toValue;
      if (has_default()(fromItem, "label")) {
        /* 从列表选取，不交换 */
        fromValue = {
          p: fromItem.prop,
        };
      } else {
        /* 交换 */
        toValue = this.dsl[toItem.rowIndex][toItem.colIndex];
        fromValue = this.dsl[fromItem.rowIndex][fromItem.colIndex];
        _list[fromItem.rowIndex][fromItem.colIndex] = toValue;
      }
      _list[toItem.rowIndex][toItem.colIndex] = fromValue;
      this.dsl = _list;
    },
    handleItemInfoChange(itemInfo) {
      this.itemInfo = itemInfo;
      const dslArray = map_default()(itemInfo, (item) => item.prop);
      const dsl = [];
      let row = [];
      let colCount = 0;

      while (dslArray.length > 0) {
        let itemProp = dslArray.pop();
        row.push({ p: itemProp });
        /* 该换行了 */
        if (++colCount >= this.tableConfigs.col) {
          dsl.push(row);
          row = [];
          colCount = 0;
        }
      }
      /* 最后一次没有在循环体中完成的push */
      if (colCount < this.tableConfigs.col) {
        dsl.push(row);
      }
      this.dsl = dsl;
    },
    handleItemChange(item) {
      this.itemDsl = item;
      const { r, c } = this.currentEditItemInfo;
      this.dsl[r][c] = item;
      const _list = cloneDeep_default()(this.dsl);
      this.dsl = _list;
    },
    handleClickItem(item, info) {
      this.itemDsl = item;
      this.currentrc = `r${info.rowIndex}c${info.colIndex}`;
      this.currentEditItemInfo = info;
    },
  },
});

// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var bundle_PageLayoutEditorvue_type_script_lang_js_ = (PageLayoutEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./public/static/bundle/PageLayoutEditor/index.vue?vue&type=style&index=0&id=295ebb5d&lang=less&scoped=true&
var PageLayoutEditorvue_type_style_index_0_id_295ebb5d_lang_less_scoped_true_ = __webpack_require__("bf94");

// CONCATENATED MODULE: ./public/static/bundle/PageLayoutEditor/index.vue






/* normalize component */

var PageLayoutEditor_component = Object(componentNormalizer["a" /* default */])(
  bundle_PageLayoutEditorvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "295ebb5d",
  null
  
)

/* harmony default export */ var PageLayoutEditor = __webpack_exports__["default"] = (PageLayoutEditor_component.exports);

/***/ }),

/***/ "bf94":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_295ebb5d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e7af");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_295ebb5d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_295ebb5d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_10_oneOf_1_0_node_modules_vue_cli_service_node_modules_css_loader_dist_cjs_js_ref_10_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_10_oneOf_1_2_node_modules_less_loader_dist_cjs_js_ref_10_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_295ebb5d_lang_less_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e7af":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

}]);
//# sourceMappingURL=vlibs.umd.4.js.map