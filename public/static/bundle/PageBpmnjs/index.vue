<template>
  <VarContainer>
    <VarChild i-am="init">
      <div class="loading" v-if="loading">Loading...</div>
      <template v-else>
        <div class="canvas" ref="canvas"></div>
        <div id="js-properties-panel" class="panel"></div>
        <ul class="buttons">
          <li>
            <a ref="saveDiagram" href="javascript:" title="保存为bpmn"
              >保存为bpmn</a
            >
          </li>
          <li>
            <a ref="saveSvg" href="javascript:" title="保存为svg">保存为svg</a>
          </li>
        </ul>
      </template>
    </VarChild>
  </VarContainer>
</template>

<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
import BpmnModeler from "bpmn-js/lib/Modeler";
import axios from "axios";
import { xmlStr } from "./mock/xmlStr.mjs";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";
/* css */
import "bpmn-js/dist/assets/diagram-js.css"; // 左边工具栏以及编辑节点的样式
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css"; // 右边工具栏样式

export default {
  /* TEMPLATE_PLACEHOLDER, */
  mixins: [basePageMixin],
  components: {},
  // 生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  // 生命周期 - 载入后, Vue 实例挂载到实际的 DOM 操作完成，一般在该过程进行 Ajax 交互
  mounted() {
    this.init();
  },
  data() {
    return {
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      loading: true,
      xmlUrl: "",
      defaultXmlStr: xmlStr,
    };
  },
  // 方法集合
  methods: {
    async init() {
      this.loading = true;
      this.xmlUrl = await this.getXmlUrl();
      console.log(this.xmlUrl);
      this.loading = false;
      this.$nextTick(() => {
        this.initBpmn();
      });
    },
    getXmlUrl() {
      return new Promise((resolve) => {
        setTimeout(() => {
          const url = "";
          resolve(url);
        }, 1000);
      });
    },
    initBpmn() {
      // 获取到属性ref为“canvas”的dom节点
      const canvas = this.$refs.canvas;
      // 建模
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        //添加控制板
        propertiesPanel: {
          parent: "#js-properties-panel",
        },
        additionalModules: [
          // 左边工具栏以及节点
          propertiesProviderModule,
        ],
      });
      this.createNewDiagram();
    },
    async createNewDiagram() {
      const that = this;
      let bpmnXmlStr = "";
      if (this.xmlUrl === "") {
        bpmnXmlStr = this.defaultXmlStr;
        this.transformCanvas(bpmnXmlStr);
      } else {
        let res = await axios({
          method: "get",
          timeout: 120000,
          url: that.xmlUrl,
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(res);
        bpmnXmlStr = res["data"];
        this.transformCanvas(bpmnXmlStr);
      }
    },
    // 将字符串转换成图并渲染
    transformCanvas(bpmnXmlStr) {
      this.bpmnModeler.importXML(bpmnXmlStr, (err) => {
        if (err) {
          console.error(err);
        } else {
          this.success();
        }
        // 让图能自适应屏幕
        var canvas = this.bpmnModeler.get("canvas");
        canvas.zoom("fit-viewport");
      });
    },
    success() {
      console.log("创建成功!");
      this.addBpmnListener();
      this.addModelerListener();
      this.addEventBusListener();
    },
    // 添加绑定事件
    addBpmnListener() {
      const that = this;
      // 获取a标签dom节点
      const downloadLink = this.$refs.saveDiagram;
      const downloadSvgLink = this.$refs.saveSvg;
      // 给图绑定事件，当图有发生改变就会触发这个事件
      this.bpmnModeler.on("commandStack.changed", function () {
        that.saveSVG(function (err, svg) {
          that.setEncoded(downloadSvgLink, "diagram.svg", err ? null : svg);
        });
        that.saveDiagram(function (err, xml) {
          that.setEncoded(downloadLink, "diagram.bpmn", err ? null : xml);
        });
      });
    },
    addModelerListener() {
      // 监听 modeler
      const bpmnjs = this.bpmnModeler;
      const that = this;
      // 'shape.removed', 'connect.end', 'connect.move'
      const events = ["shape.added", "shape.move.end", "shape.removed"];
      events.forEach(function (event) {
        that.bpmnModeler.on(event, (e) => {
          var elementRegistry = bpmnjs.get("elementRegistry");
          var shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
          // console.log(shape)
          if (event === "shape.added") {
            console.log("新增了shape");
          } else if (event === "shape.move.end") {
            console.log("移动了shape");
          } else if (event === "shape.removed") {
            console.log("删除了shape");
          }
        });
      });
    },
    addEventBusListener() {
      // 监听 element
      let that = this;
      const eventBus = this.bpmnModeler.get("eventBus");
      const modeling = this.bpmnModeler.get("modeling");
      const elementRegistry = this.bpmnModeler.get("elementRegistry");
      const eventTypes = ["element.click", "element.changed"];
      eventTypes.forEach(function (eventType) {
        eventBus.on(eventType, function (e) {
          console.log(e);
          if (!e || e.element.type == "bpmn:Process") return;
          if (eventType === "element.changed") {
            that.elementChanged(e);
          } else if (eventType === "element.click") {
            console.log("点击了element");
            var shape = e.element ? elementRegistry.get(e.element.id) : e.shape;
            if (shape.type === "bpmn:StartEvent") {
              modeling.updateProperties(shape, {
                name: "我是修改后的虚线节点",
                isInterrupting: false,
                customText: "我是自定义的text属性",
              });
              // modeling.setColor(shape, {
              //   fill: '#ff0000',
              //   stroke: null
              // })
            }
          }
        });
      });
    },
    isInvalid(param) {
      // 判断是否是无效的值
      return param === null || param === undefined || param === "";
    },
    isSequenceFlow(type) {
      // 判断是否是线
      return type === "bpmn:SequenceFlow";
    },
    elementChanged(e) {
      var shape = this.getShape(e.element.id);
      console.log(shape);
      if (!shape) {
        // 若是shape为null则表示删除, 无论是shape还是connect删除都调用此处
        console.log("无效的shape");
        // 上面已经用 shape.removed 检测了shape的删除, 要是删除shape的话这里还会被再触发一次
        console.log("删除了shape和connect");
        return;
      }
      if (!this.isInvalid(shape.type)) {
        if (this.isSequenceFlow(shape.type)) {
          console.log("改变了线");
        }
      }
    },
    getShape(id) {
      var elementRegistry = this.bpmnModeler.get("elementRegistry");
      return elementRegistry.get(id);
    },
    // 下载为SVG格式,done是个函数，调用的时候传入的
    saveSVG(done) {
      // 把传入的done再传给bpmn原型的saveSVG函数调用
      this.bpmnModeler.saveSVG(done);
    },
    // 下载为bpmn格式,done是个函数，调用的时候传入的
    saveDiagram(done) {
      // 把传入的done再传给bpmn原型的saveXML函数调用
      this.bpmnModeler.saveXML({ format: true }, function (err, xml) {
        done(err, xml);
      });
    },
    // 当图发生改变的时候会调用这个函数，这个data就是图的xml
    setEncoded(link, name, data) {
      // 把xml转换为URI，下载要用到的
      const encodedData = encodeURIComponent(data);
      // 下载图的具体操作,改变a的属性，className令a标签可点击，href令能下载，download是下载的文件的名字
      //   console.log(link, name, data)
      let xmlFile = new File([data], "test.bpmn");
      //   console.log(xmlFile)
      if (data) {
        link.className = "active";
        link.href = "data:application/bpmn20-xml;charset=UTF-8," + encodedData;
        link.download = name;
      }
    },
  },
  // 计算属性
  computed: {},
};
</script>

<style scoped>
.canvas {
  height: 100%;
  width: 100%;
}
</style>