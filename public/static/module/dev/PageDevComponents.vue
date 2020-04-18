<template>
  <div>
    <el-dialog
      :modal="false"
      fullscreen
      :title="configs.title"
      :visible.sync="dialogVisible"
    >
      <div
        class="el-row"
        style="margin-left: -5px; margin-right: -5px;"
      >
        <div
          class="el-col el-col-12"
          style="padding-left: 5px; padding-right: 5px;"
        >
          <div class="el-card box-card is-always-shadow">
            <div class="el-card__header">
              <div class="clearfix">
                <span>待选</span>
              </div>
            </div>
            <div class="el-card__body tree-wrapper">
              <el-input
                v-model="filterText"
                placeholder="输入关键字进行过滤"
              />
              <el-tree
                ref="tree"
                class="origin-tree"
                :filter-node-method="filterNode"
                :data="data"
                node-key="id"
                :expand-on-click-node="false"
              >
                <div
                  slot-scope="{ node, data }"
                  class="tree-node-content202004173425"
                >
                  <span>{{ node.label }}</span>
                  <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)"
                  >
                    添加
                  </el-button>
                </div>
              </el-tree>
            </div>
          </div>
        </div>
        <div
          class="el-col el-col-12"
          style="padding-left: 5px; padding-right: 5px;"
        >
          <div class="el-card box-card is-always-shadow">
            <div class="el-card__header">
              <div class="clearfix">
                <span>已选</span>
                <i
                  style="float: right; padding: 3px 0px;color:red;"
                  class="el-icon-delete coursor"
                  @click="selectedData=[]"
                >清空</i>
              </div>
            </div>
            <div class="el-card__body tree-wrapper">
              <el-tree
                class="target-tree"
                :data="selectedData"
                node-key="id"
              >
                <span
                  slot-scope="{ node, data }"
                  class="tree-node-content202004173425"
                >
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => remove(data)"
                    >移除</el-button>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>
        </div>
      </div>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-button @click="show">
      select
    </el-button>
  </div>
</template>
<script>
import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";
export default {
  TEMPLATE_PLACEHOLDER,
  mixins: [basePageMixin],
  props: {
    configs: {
      type: Object,
      default: function() {
        return { title: "提示" };
      }
    }
  },
  data() {
    return {
      filterText: "",
      dialogVisible: true,
      selectedData: [],
      selected: [],
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [...new Array(200)].map((item, i) => ({
            id: "id" + i,
            label: "二级 1-1"
          }))
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
      ]
    };
  },
  watch: {
    dialogVisible(dialogVisible) {
      if (dialogVisible) {
        this.selectedData = [];
      }
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted() {
    // var data = this.flatten(this.data, []);
    // this.selectedData = data;
  },
  methods: {
    append(data) {
      const selectedData = [];
      const allData = [
        ...this.selectedData,
        ...this.flatten([data], selectedData)
      ];
      this.selectedData = window._.uniqBy(allData, "id");
    },
    remove(node, data) {
      const index = this.selectedData.findIndex(d => d.id === node.id);
      this.selectedData.splice(index, 1);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    flatten(dataWitchHasChildren, dataNoChildren) {
      dataWitchHasChildren.forEach(itemDataWitchHasChildren => {
        if (
          itemDataWitchHasChildren.children &&
          itemDataWitchHasChildren.children.length > 1
        ) {
          return this.flatten(
            itemDataWitchHasChildren.children,
            dataNoChildren
          );
        } else {
          dataNoChildren.push(itemDataWitchHasChildren);
        }
      });
      return dataNoChildren;
    },
    show() {
      this.dialogVisible = true;
    }
  }
};
</script>
<style lang="scss">
.tree-wrapper {
  max-height: 666px;
  overflow: auto;
  > .origin-tree,
  > .target-tree {
    > div {
      .el-tree-node__content {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        > .tree-node-content202004173425 {
          flex: 1;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
  }
}
</style>