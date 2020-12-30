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
        { label: "Map", to: "/events/map", visible: () => this.isAuthenticated },
        {
          label: "Available",
          to: "/events/available",
          visible: () => this.isAuthenticated,
        },
        {
          label: "Created",
          to: "/events/created/",
          visible: () => this.isAuthenticated,
        },

        {
          label: "Participating",
          to: "/events/participating",
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