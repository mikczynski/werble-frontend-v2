<template>
  <g-map
      :apiKey="googleMapsApiKey"
      :zoom="12"
      :center="kamionkaCenter"
      :mapDidLoad="handleMapDidLoad"
      :markers="markers"
      :draw-markers="true"

  ></g-map>
<!--    <button @click="addLocation">-->
<!--      add location to test-->
<!--    </button>-->
</template>

<script>
// import { defineComponent } from 'vue'
import {useStore } from 'vuex';
import GMap from "./GMap";
import {reactive, ref, defineComponent, toRefs, watch, onMounted} from "vue";

export default defineComponent({
  components: {GMap},
  computed: {
    googleMapsApiKey() {
      return this.$store.getters.googleMapsApiKey;
    },
    kamionkaCenter() {
      return {lat: 51.469664788, lng: 22.457664836};
    },
  },

  setup() {
    //fetch events when mounted
    onMounted(()=>{
      store.dispatch('getEvents');
    })

    const state = reactive({
      test: true,
    });

    let GServices = null;
    let map = null;

    const store = useStore();

    const markers = ref([]);

    //watch events getter for changes
    watch(
        ()=>store.getters.events,
        ()=>
        {
          //update markers array!!
          markers.value = [...store.getters.events];
          console.log('events changed')
        }
    )


    // const generateRandomLocation = () => {
    //   var minLat = 51.4596,
    //       maxLat = 51.47,
    //       minLng = 22.45,
    //       maxLng = 22.46;
    //   var randomLat = Math.random() * (maxLat - minLat) + minLat;
    //   var randomLng = Math.random() * (maxLng - minLng) + minLng;
    //   return { latitude: randomLat, longitude: randomLng, title: "test" };
    // };
    // const addLocation = () => {
    //   //add location to markers array
    //   const mark = generateRandomLocation();
    //   markers.value = [...markers.value, mark];
    //   console.log("marker?");
    // };

    const handleMapDidLoad = (themap, googleServices) => {
      console.log("handleMapDidLoad");
      console.log("map", map);
      console.log("GServices", GServices);
      map = themap;
      GServices = googleServices;
    };

    return {...toRefs(state), markers, handleMapDidLoad};
  },
});
</script>
