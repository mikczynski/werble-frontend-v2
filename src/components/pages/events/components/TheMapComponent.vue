<template>
  <GoogleMap
  api-key=""
  style="width: 100%; height: 500px"
  :center="center"
  :zoom="15"
  >
    <Marker :options="markerOptions" />
  </GoogleMap>
</template>

<script>
import { defineComponent } from 'vue'
import { GoogleMap,Marker } from 'vue3-google-map'


export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {

    const center = { lat: 40.689247, lng: -74.044502 }
    const markerOptions = { position: center, label: 'L', title: 'LADY LIBERTY' }


    return { center,markerOptions }
  },
})
</script>