<template>
  <div class="shell">
    <pre class="console202003045558 elevation12">
{{ JSON.stringify(APP_ROUTER.currentRoute ,null,2) }}
    </pre>
    <div
      :is="APP_STATE.componentNavbar"
      class="navbar elevation7"
      @click-toggle="toggleSidebarFold"
    >
      {{ APP_STATE.isSidebarFold?APP_STATE.sysNavSubTitle:APP_STATE.sysNavTitle }}
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

const { APP_STATE, APP_ROUTER } = window;

export default {
  TEMPLATE_PLACEHOLDER,
  components: { mainNavbar, mainSidebar, mainContent },
  provide() {
    return {
      SHELL: this
    };
  },
  data() {
    return { APP_STATE, APP_ROUTER };
  },
  mounted() {
    setTimeout(() => {
      APP_STATE.componentContent = mainContent;
    }, 1 * 3);
    setTimeout(() => {
      APP_STATE.componentSidbar = mainSidebar;
    }, 1 * 2);
    setTimeout(() => {
      APP_STATE.componentNavbar = mainNavbar;
    }, 1 * 1);
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