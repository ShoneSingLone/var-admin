<template>
  <div class="flex-horizon align-items-center">
    <div :class="['system-title flex-horizon justify-center align-items-center',{fold:SHELL.isSidebarFold} ]">
      <div class="system-title-content">
        <slot />
      </div>
    </div>
    
    <div class="navbar-content overflow-hidden">
      <div
        class="toggle-btn fonts24"
        @click="handleToggleClick"
      >
        <i :class="['el-icon-s-unfold',{'fold':SHELL.isSidebarFold}]" />
      </div>
      <!--  -->
      <div class="stamp flex1" />
      <div class="nav-options-wrapper">
        <el-dropdown :hide-on-click="true">
          <el-avatar
            :size="32"
            :src="circleUrl"
          />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><i class="el-icon-user" />个人中心</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-setting" />账户设置</el-dropdown-item>
            <el-dropdown-item><i class="el-icon-edit" />密码重置</el-dropdown-item>
            <el-dropdown-item divided>
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    TEMPLATE_PLACEHOLDER,
    components: {},
    inject: ["SHELL"],
    data() { return {
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
       avatarImgSrc: "/statics/img/avatar.png", collapsed: false, mainNavbarName: "div", mainSidebarName: "div", mainContentName: "div" }; },
    mounted() {

    },
    methods: {
        handleToggleClick() {
            this.SHELL.toggleSidebarFold();
        }
    },
};
</script>