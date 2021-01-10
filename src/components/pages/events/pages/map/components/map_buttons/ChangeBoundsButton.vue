<template>
  <Button @click="calcMapBounds" class=" p-ml-2 p-mb-2 p-button-raised p-button-info">Fit all markers on the map</Button>
</template>

<script>
export default {
  name: "ChangeBoundsButton",
  props: {
    google: {type: Object, required: true},
    map: {type: Object, required: true},
    markers: {type: Array}
  },

  methods: {
    calcMapBounds() {
      if (!this.markers.length) return;
      const bounds = new this.google.maps.LatLngBounds();
      this.markers.forEach((marker) => {
        bounds.extend(new this.google.maps.LatLng(marker.latitude, marker.longitude));
      });
      this.map.fitBounds(bounds);
    }
  },
  mounted() {
    const m = this.map.controls[this.google.maps.ControlPosition.BOTTOM_CENTER];
    m.push(this.$el)
  },
}
</script>

<style scoped>

</style>
