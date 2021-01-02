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
        { label: "Map", to: "/events/map",
          icon: 'pi pi-fw pi-map',
        },
        {
          label: "Available",
          to: "/events/available",
          icon: 'pi pi-fw pi-list',
          visible: () => this.isAuthenticated,
        },
        {
          label: "Created",
          to: "/events/created/",
          icon: 'pi pi-fw pi-map-marker',
          visible: () => this.isAuthenticated,
        },

        {
          label: "Participating",
          to: "/events/participating",
          icon: 'pi pi-fw pi-users',
          visible: () => this.isAuthenticated,
        },

      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
    methods:{
      async logout(){
        await this.$store.dispatch('logout');
      }
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