<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card class="box-card">
        <el-button @click="getMenu">
          getMenu
        </el-button>
        <div
          slot="header"
          class="clearfix"
        >
          <span>菜单管理</span>
        </div>
        <el-tree
          :data="data"
          :props="{label:'name'}"
          node-key="id"
          default-expand-all
          draggable
          @node-drag-start="handleDragStart"
          @node-drag-enter="handleDragEnter"
          @node-drag-leave="handleDragLeave"
          @node-drag-over="handleDragOver"
          @node-drag-end="handleDragEnd"
          @node-drop="handleDrop"
        />
      </el-card>
    </el-col>
    <el-col :span="12">
      <pre>
            {{ JSON.stringify(data,null,2) }}
        </pre>
    </el-col>
  </el-row>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";

export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  props: {
    options: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                { id: 9, label: "三级 1-1-1" },
                { id: 10, label: "三级 1-1-2" }
              ]
            }
          ]
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            { id: 5, label: "二级 2-1" },
            { id: 6, label: "二级 2-2" }
          ]
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            { id: 7, label: "二级 3-1" },
            {
              id: 8,
              label: "二级 3-2",
              children: [
                { id: 11, label: "三级 3-2-1" },
                { id: 12, label: "三级 3-2-2" },
                { id: 13, label: "三级 3-2-3" }
              ]
            }
          ]
        }
      ],
      defaultProps: { children: "children", label: "label" }
    };
  },
  created() {
    this.getMenu();
  },
  methods: {
    async getMenu() {
      try {
        this.data = await window._.$axios.get("/api/menu");
      } catch (e) {
        console.error(e);
      }
    },
    handleDragStart(node, ev) {
      console.log("drag start1", node);
    },
    handleDragEnter(draggingNode, dropNode, ev) {
      console.log("tree drag enter: 2", dropNode.label);
    },
    handleDragLeave(draggingNode, dropNode, ev) {
      console.log("tree drag leave: 3", dropNode.label);
    },
    handleDragOver(draggingNode, dropNode, ev) {
      console.log("tree drag over: 4", dropNode.label);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log("tree drag end: 5", dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log("tree drop: ", dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (dropNode.data.label === "二级 3-1") {
        return type !== "inner";
      } else {
        return true;
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    }
  }
};
</script>
<style lang="scss">
</style>