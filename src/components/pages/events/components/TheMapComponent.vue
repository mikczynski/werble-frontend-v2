<template>
  <GoogleMap
  :api-key="googleMapsApiKey"
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
// import { defineComponent } from 'vue'
import { GoogleMap, Marker } from 'vue3-google-map'


export default {
  components: { GoogleMap, Marker },
  computed: {
    googleMapsApiKey() {
      return this.$store.getters.googleMapsApiKey;
    },
  },
  data(){
    return {
        center: { lat: 40.689247, lng: -74.044502 },
        markerOptions: { position: this.center, label: 'L', title: 'LADY LIBERTY' },
    }
  }
}
</script>