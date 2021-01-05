<template>
  <h2>{{ pageTitle }}</h2>
  <events-nav></events-nav>
  <router-view></router-view>
</template>

<script>

import EventsNav from "@/components/pages/events/components/EventsNav";

export default {
  components: {EventsNav},
  data() {
    return {
      pageTitle: 'Events',

    }
  },
  created() {
    this.$store.dispatch('getGeolocation');
    // this.$store.dispatch('getEvents');
  },
}
</script>

<style scoped>
</style>
