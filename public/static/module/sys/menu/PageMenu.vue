<template>
    <el-row :gutter="10">
        <el-col :span="12">
            <el-card class="box-card">
                
                <div slot="header" class="clearfix"><span>菜单管理</span>
                <a @click="saveMenu" class="a-btn">
                    save menu
                </a></div>
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
                >
                    <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span @click="handleMenuClick(data,node)">{{ node.label }}</span>
                        <span>
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => append(data)">
                            Append
                            </el-button>
                            <el-button
                                    type="text"
                                    size="mini"
                                    @click="() => remove(node, data)">
                            Delete
                            </el-button>
                        </span>
                    </span>
                </el-tree>
            </el-card>
        </el-col>
        <el-col :span="12">
            currentSelect
            <div>
                <el-button @click="modifi()">修改</el-button>
                <el-button @click="modifi(true)">增加子节点</el-button>
            </div>
            <el-form label-width="80px" :model="formData">
                <el-form-item label="name">
                    <el-input v-model="formData.name"></el-input>
                </el-form-item>
                <el-form-item label="id">
                    <el-input v-model="formData.id"></el-input>
                </el-form-item>
                <el-form-item label="path">
                    <el-input v-model="formData.path"></el-input>
                </el-form-item>
                <el-form-item label="url">
                    <el-input v-model="formData.url"></el-input>
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="formData.type"></el-input>
                </el-form-item>
                <el-form-item label="handler">
                    <el-input v-model="formData.handler"></el-input>
                </el-form-item>
                <el-form-item label="type">
                    <el-input v-model="formData.type"></el-input>
                </el-form-item>
            </el-form>

            <pre>
            {{ JSON.stringify(currentSelect,null,2) }}
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
                default: function () {
                    return {};
                }
            }
        },
        data() {
            return {
                currentSelect: {},
                formData: {
                    id: "",
                    path: "",
                    pid: "",
                    name: "",
                    url: "",
                    type: 0,
                    handler: 1,
                    icon: "",
                },
                data: [
                    {
                        id: 1,
                        label: "一级 1",
                        children: [
                            {
                                id: 4,
                                label: "二级 1-1",
                                children: [
                                    {id: 9, label: "三级 1-1-1"},
                                    {id: 10, label: "三级 1-1-2"}
                                ]
                            }
                        ]
                    }
                ],
                defaultProps: {children: "children", label: "label"}
            };
        },
        created() {
            this.getMenu();
        },
        methods: {
            append(data) {
                if (!data.children) {
                    this.$set(data, 'children', []);
                }
                data.children.push(JSON.parse(JSON.stringify(this.formData)));
            },

            remove(node, data) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
            },
            modifi(isAddChildren) {
                if (isAddChildren) {
                    if (!this.currentSelect.children) {
                        this.$set(this.currentSelect, 'children', []);
                    }
                    this.currentSelect.children.push(JSON.parse(JSON.stringify(this.formData)))
                } else {
                    this.formData = this.currentSelect;
                }

            },
            handleMenuClick(data, node, component) {
                console.log(data, node, component);
                this.currentSelect = data;

            },
            async saveMenu() {
                const res = await window._.$axios.post("/api/menu", this.data);
                console.log("res", res);
                debugger;

            },
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
.a-btn {
  position: relative;
  display: inline-block;
  padding: 20px 60px;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 2px;
  color: #5a84a2;
  font-size: 18px;
  border-radius: 60px;
  box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
              -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              2px 2px 8px rgba(0, 0, 0, 0.15);
 &:hover {
    cursor: pointer;
  box-shadow: inset -2px -2px 8px rgba(255, 255, 255, 1),
              inset -2px -2px 12px rgba(255, 255, 255, 0.5),
              inset 2px 2px 4px rgba(255, 255, 255, 0.1),
              inset 2px 2px 8px rgba(0, 0, 0, 0.15);
}
}

</style>