<template>
    <div class="Demo">
        <h1>currentView:{{ currentView }}</h1>
        <keep-alive>
            <div v-show="currentView==='main'">
                <el-button @click="go(1)">
                    add
                </el-button>
                <el-button @click="go(2)">
                    update
                </el-button>
            </div>
        </keep-alive>
        <keep-alive>
            <div v-show="currentView==='add'">
                <el-button @click="go(0)">
                    main
                </el-button>
                <time>{{time}}</time>
                <pre>{{ JSON.stringify( APP_ROUTER.currentRoute,null,2) }}</pre>
            </div>
        </keep-alive>
        <keep-alive>
            <div v-show="currentView==='update'">
                <input type="text">
                <el-button @click="go(0)">
                    main
                </el-button>
                <time>{{time}}</time>
                <pre>{{ JSON.stringify( options,null,2) }}</pre>
            </div>
        </keep-alive>

    </div>
</template>
<script>
    import basePageMixin from "@@/static/js/app/github/mixin/basePageMixin.mjs";

    export default {
        TEMPLATE_PLACEHOLDER,
        mixins: [basePageMixin],
        mounted() {
            setInterval(() => {
                ++this.time;
            }, 1000)
        },
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
                time: 1
            };
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
<style lang="less">
</style>