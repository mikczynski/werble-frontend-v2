<template>
    <h2>{{pageTitle}}</h2>
    <events-nav></events-nav>
    <router-view></router-view>
</template>

<script>
import EventsNav from './components/EventsNavComponent.vue'

export default {
  components: {EventsNav },
    props:['title'],
    data(){
      return {
        pageTitle: 'Events',
      }
    },
    methods:{
      setPosition: function () {

        if (!navigator.geolocation) return;

        const that = this;

        const options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        function success(pos){
          const crd = pos.coords;

          console.log('Your current position is:');
          console.log(`Latitude : ${crd.latitude}`);
          console.log(`Longitude: ${crd.longitude}`);
          console.log(`More or less ${crd.accuracy} meters.`);

          that.$store.dispatch('setPosition',crd);
        }

        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success,error,options);
      },
    },
    mounted() {
      this.setPosition();
    }
}
</script>

<style>
    
</style>