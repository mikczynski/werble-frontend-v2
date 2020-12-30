<template>
  <header>
    <!-- Show this menu if user is authenticated-->
    <Menubar v-if="isAuthenticated" :model="itemsAuthenticated"/>
    <!-- Show this if user is not authenticated   -->
    <Menubar v-else :model="itemsUnauthenticated"/>
  </header>
</template>

<script>

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
        },
        {
          label: "Profile",
          icon: 'pi pi-fw pi-user',
          to: "/profile",
        },
        {
          label: "Logout",
          icon: 'pi pi-fw pi-power-off',
          to: "/logout"
        },
      ],
      itemsUnauthenticated: [
        {label: "Login", to: "/login",},
        {label: "Register", to: "/register"},
      ],
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
}

</script>


<style scoped>


</style>