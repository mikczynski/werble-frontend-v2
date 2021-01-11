<template>
  <header>
    <!-- Show this menu if user is authenticated-->
    <Menubar v-if="isAuthenticated" :model="authenticatedNavItems">
      <template #end>
        <Button @click="routerLogout" label="Logout" icon="pi pi-power-off" :style="{'margin-left': '0 .5em'}" class="p-button-outlined"/>
      </template>

    </Menubar>
    <!-- Show this if user is not authenticated   -->
    <Menubar v-else :model="unauthenticatedNavItems"/>
  </header>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data() {
    return {
      authenticatedNavItems: [
        {
          label: "Home",
          icon: "pi pi-fw pi-home",
          to: "/home",
        },
        {
          label: "Events",
          icon: "pi pi-fw pi-calendar",
          to: "/events",
          items: [
            {label: "Map", to: "/events/map", icon: "pi pi-fw pi-map"},
            {
              label: "Local",
              to: "/events/local",
              icon: "pi pi-fw pi-list",
            },
            {
              label: "Owned",
              to: "/events/owned",
              icon: "pi pi-fw pi-map-marker",
            },

            {
              label: "Participating",
              to: "/events/participating",
              icon: "pi pi-fw pi-users",
            },
          ],
        },
        {
          label: "Profile",
          icon: "pi pi-fw pi-user",
          to: "/profile",
          items: [
            {
              label: "Your Profile",
              to: "/profile/info",
              icon: "pi pi-fw pi-user-edit",
            },
            {
              label: "Settings",
              to: "/profile/settings",
              icon: "pi pi-fw pi-cog",
            },
          ],
        },
      ],

      unauthenticatedNavItems: [
        {label: "Login", to: "/login"},
        {label: "Register", to: "/register"},
      ],
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    routerLogout(){
      this.logout();
    }
  },
};
</script>

<style scoped></style>
