<template>
  <div class="shell">
    <div
      :is="APP_STATE.componentNavbar"
      class="navbar elevation7"
      @click-toggle="toggleSidebarFold"
    >
      {{ APP_STATE.sysNavTitle }}
    </div>

    <div class="main flex-horizon">
      <div
        :is="APP_STATE.componentSidbar"
        :class="['sidebar elevation6',{fold:APP_STATE.isSidebarFold}]"
      >
        sidebar
      </div>
      <div
        :is="APP_STATE.componentContent"
        class="content flex1"
      >
        content
      </div>
    </div>
  </div>
</template>

<script>
import mainNavbar from "./MainNavbar.vue";
import mainSidebar from "./MainSidebar.vue";
import mainContent from "./MainContent.vue";
const { APP_STATE } = window;

export default {
  TEMPLATE_PLACEHOLDER,
  components: { mainNavbar, mainSidebar, mainContent },
  provide() {
    return {
      SHELL: this
    };
  },
  data() {
    return { APP_STATE };
  },
  mounted() {
    setTimeout(() => {
      APP_STATE.componentNavbar = mainNavbar;
      APP_STATE.componentSidbar = mainSidebar;
      APP_STATE.componentContent = mainContent;
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
      APP_STATE.isSidebarFold = !APP_STATE.isSidebarFold;
    }
  }
};
</script>