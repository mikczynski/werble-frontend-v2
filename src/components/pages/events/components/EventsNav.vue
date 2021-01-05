<template>
  <div class="nav">
    <TabMenu :model="eventsNavItems"/>
  </div>
</template>

<script>

import TabMenu from "primevue/tabmenu";
export default {
  components: { TabMenu },
  data() {
    return {
      eventsNavItems: [
        {label: "Map", to: "/events/map", icon: "pi pi-fw pi-map"},
        {
          label: "Available",
          to: "/events/available",
          icon: "pi pi-fw pi-list",
        },
        {
          label: "Created",
          to: "/events/created",
          icon: "pi pi-fw pi-map-marker",
        },

        {
          label: "Participating",
          to: "/events/participating",
          icon: "pi pi-fw pi-users",
        },
      ],
    };
  },

};
</script>
<style scoped>
div {
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
  color: red;
}
</style>
