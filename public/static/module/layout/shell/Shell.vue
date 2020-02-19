<template>
  <div class="shell">
    
    <el-input-number
      :value="value"
      :precision="2"
      :step="1"
      @input="handleChange"
    />
    {{ num }}
    <div
      :is="componentNavbar"
      class="navbar elevation7"
    >
      {{ sysNavTitle }}
    </div>
    
    <div class="main flex-horizon">
      <div
        :is="componentSidbar"
        :class="['sidebar elevation6',{fold:isSidebarFold}]"
      >
        sidebar
      </div>
      <div
        :is="componentContent"
        class="content flex1"
      >
        content
      </div>
    </div>
  </div>
</template>
<script>

import mainNavbar from "@@/static/module/layout/shell/MainNavbar.vue";
import mainSidebar from "@@/static/module/layout/shell/MainSidebar.vue";
import mainContent from "@@/static/module/layout/shell/MainContent.vue";

export default {
    TEMPLATE_PLACEHOLDER,
    components: { mainNavbar, mainSidebar, mainContent },
    provide() {
        return {
            SHELL: this
        };
    },
    data() {
        return {
          num:0,
            isSidebarFold: false,
            sysNavTitle: "var adminasdfasdfsdf",
            /*  */
            componentNavbar: "div",
            componentSidbar: "div",
            componentContent: "div",
            // mainSidebarStyle: { width: "230px" }
        };
    },
    mounted() {
      setTimeout(() => {
        
        this.componentNavbar = mainNavbar;
        this.componentSidbar = mainSidebar;
        this.componentContent = mainContent;
    
      }, 1);
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      handleInput(value) {
        console.log(value);
      },
        toggleSidebarFold() {
            this.isSidebarFold = !this.isSidebarFold;
        }
    }
};
</script>

<style lang="scss" src="../../../scss/main.scss">

</style>