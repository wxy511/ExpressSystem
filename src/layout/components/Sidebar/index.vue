<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="false"
        :collapse-transition="false"
        active-text-color="#1f9476"
        mode="vertical"
      >
        <!--  是否全部展开       :default-openeds="OpenMenue" -->
        <sidebar-item
          v-for="route in rights_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters(["rights_routes", "sidebar"]),
    routes() {
      return this.$store.getters.rights_routes;
      // return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    },
    OpenMenue() {
      const openMenueArry = [];
      this.$store.getters.rights_routes.forEach(function (item, index) {
        if (typeof item.children !== "undefined") {
          if (item.children.length > 1) {
            openMenueArry.push(item.path);
          }
        }
      });
      return openMenueArry;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
