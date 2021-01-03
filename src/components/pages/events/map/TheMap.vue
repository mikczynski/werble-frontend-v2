<template>
  <g-map
    :apiKey="googleMapsApiKey"
    :zoom="12"
    :center="kamionkaCenter"
    :markers="markers"
    :mapDidLoad="handleMapDidLoad"
  ></g-map>
  <button @click="addLocation">
    add location to test
  </button>
</template>

<script>
// import { defineComponent } from 'vue'
import GMap from "./GMap";
import { ref, defineComponent } from "vue";

export default defineComponent({
  components: { GMap },
  computed: {
    googleMapsApiKey() {
      return this.$store.getters.googleMapsApiKey;
    },
    kamionkaCenter() {
      return { lat: 51.469664788, lng: 22.457664836 };
    },
  },

  setup() {
    let GServices = null;
    let map = null;

    const markers = ref([
      { lat: 51.459664788, lng: 22.447664836, title: "Hej" },
      { lat: 51.469664788, lng: 22.467664836, title: "Co tam" },
    ]);

    const generateRandomLocation = () => {
      var minLat = 51.4596,
        maxLat = 51.47,
        minLng = 22.45,
        maxLng = 22.46;
      var randomLat = Math.random() * (maxLat - minLat) + minLat;
      var randomLng = Math.random() * (maxLng - minLng) + minLng;
      return { lat: randomLat, lng: randomLng, title: "test" };
    };

    const addLocation = () => {
      //add location to markers array
      const mark = generateRandomLocation();
      markers.value = [...markers.value, mark];
      console.log("marker?");
    };

    const handleMapDidLoad = (themap, googleServices) => {
      console.log("handleMapDidLoad");
      console.log("map", map);
      console.log("GServices", GServices);
      map = themap;
      GServices = googleServices;
    };

    return { markers, addLocation, handleMapDidLoad };
  },
});
</script>
