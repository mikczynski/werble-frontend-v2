<template>
    <h2>{{pageTitle}}</h2>
    <events-nav></events-nav>
    <router-view></router-view>
</template>

<script>
import EventsNav from './components/EventsNavComponent.vue'

export default {
  components: {EventsNav },
    data(){
      return {
        pageTitle: 'Events',
      }
    },
    methods:{
    },
    mounted() {
      this.$store.dispatch('getGeolocation');
    }
}
</script>

<style>
    
</style>