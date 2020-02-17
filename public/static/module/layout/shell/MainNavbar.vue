<template>
  <div>
    <div :is="mainNavbarName">
      main-navbar
    </div>
    <div :is="mainSidebarName">
      main-sidebar
    </div>
    <div :is="mainContentName">
      main-content
    </div>
  </div>
</template>
<script>


export default {
  TEMPLATE_PLACEHOLDER,
  components:{},
  data() {
    return {
      collapsed: false,
      mainNavbarName:"div",
      mainSidebarName:"div",
      mainContentName:"div"
    };
  },
  mounted() {
    
  },
};
</script>