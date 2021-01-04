<template>
  <g-map
      :apiKey="googleMapsApiKey"
      :zoom="12"
      :center="center"
      :mapDidLoad="handleMapDidLoad"
      :search-distance="searchDistance"
      :markers="events"
      :createEventEnabled="createEventEnabled"
      :draw-markers="drawMarkers"
      :draw-user-position-marker="drawUserPositionMarker"
      :draw-circle="drawCircle"
  ></g-map>
</template>

<script>
// import { defineComponent } from 'vue'
import {useStore } from 'vuex';
import GMap from "./GMap";
import {reactive, computed, defineComponent, toRefs, watch, onMounted} from "vue";

export default defineComponent({
  components: {GMap},
  props: {
    createEventEnabled : Boolean
  },
  setup() {
    //fetch events when mounted
    onMounted(()=>{
      store.dispatch('getGeolocation');
    })
    const store = useStore();
    const state = reactive({
      searchDistance: store.getters.searchDistance,
      drawMarkers: true,
      drawUserPositionMarker: true,
      drawCircle: true,
      events: [],
      userPosition: store.getters.position,
      map: null,
      GServices: null,
      //computed
      googleMapsApiKey: computed(()=> store.getters.googleMapsApiKey),
      center: computed(()=> {return {lat: 51.469664788, lng: 22.457664836}})
    });

    //watch events getter for changes
    watch(
        ()=>store.getters.events,
        ()=>state.events = [...store.getters.events],
    );
    watch(
        () => store.getters.searchDistance,
        (/* old, new */) => {
          state.searchDistance = store.getters.searchDistance;
        }
    );

    const handleMapDidLoad = (themap, googleServices) => {
      state.map = themap;
      state.GServices = googleServices;
    };

    return {...toRefs(state), handleMapDidLoad};
  },
});
</script>
