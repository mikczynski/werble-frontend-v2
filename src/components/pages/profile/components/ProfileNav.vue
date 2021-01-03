<template>
<div>
    <TabMenu :model="items"/>
</div>
</template>

<script>
import TabMenu from "primevue/tabmenu";

export default {
  components: {  TabMenu },
  data() {
    return {
      items: [
        {
          label: "Your Profile", to: "/profile/info",
          icon: 'pi pi-fw pi-user-edit',
         },
        {
          label: "Settings",
          to: "/profile/settings",
          icon: 'pi pi-fw pi-cog',
        },
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },

};
</script>
<style scoped>
div{

   justify-content: center; 
  display: flex;
  width: 100%;
}

.shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  width: 100%;
  display: flex;
  justify-content: center;
}

.p-menuitem-text {
  color:red;
}
</style>