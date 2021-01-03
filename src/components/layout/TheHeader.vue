<template>
  <header>
    <!-- Show this menu if user is authenticated-->
    <Menubar v-if="isAuthenticated" :model="itemsAuthenticated"/>
    <!-- Show this if user is not authenticated   -->
    <Menubar v-else :model="itemsUnauthenticated"/>
  </header>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  data() {
    return {
      itemsAuthenticated: [
        {
          label: "Home",
          icon: 'pi pi-fw pi-home',
          to: "/home"
        },
        {
          label: "Events",
          icon: 'pi pi-fw pi-calendar',
          to: "/events",
          items: [
            { label: "Map", to: "/events/map",
              icon: 'pi pi-fw pi-map',
            },
            {
              label: "Available",
              to: "/events/available",
              icon: 'pi pi-fw pi-list',
            },
            {
              label: "Created",
              to: "/events/created/",
              icon: 'pi pi-fw pi-map-marker',
            },

            {
              label: "Participating",
              to: "/events/participating",
              icon: 'pi pi-fw pi-users',
            },
          ]
        },
        {
          label: "Profile",
          icon: 'pi pi-fw pi-user',
          to: "/profile",
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
        },
        {
          label: "Logout",
          icon: 'pi pi-fw pi-power-off',
          to: "/logout",
          command: this.logout
        },
      ],
      itemsUnauthenticated: [
        {label: "Login", to: "/login",},
        {label: "Register", to: "/register"},
      ],
    };
  },
  computed: {
    ...mapGetters([
        'isAuthenticated'
    ])
  },
  methods:{
    ...mapActions([
        'logout'
    ])
  }
}

</script>


<style scoped>


</style>