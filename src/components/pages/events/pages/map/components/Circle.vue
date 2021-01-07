<template>
  <div></div>
</template>

<script>
export default {
  name: "Circle",
  props: {
    position:{
      type: Object,
      required: false,
    },
    radius:Number,
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
  },
  data(){
    return {
      circle: null,
    }
  },
  watch:{
    radius(){
      this.circle.setRadius(this.$store.getters.searchDistanceKM);
  }
  },
  mounted() {
    const circleConfig = {
      strokeColor: '#500084',
      strokeOpacity: 0.2,
      strokeWeight: 2,
      fillColor: "#500084",
      fillOpacity: 0.05,
      map: this.map,
      center: new this.google.maps.LatLng(
          this.$store.getters.position.latitude,
          this.$store.getters.position.longitude,
      ),
      radius: this.$store.getters.searchDistanceKM,
      clickable: false
    }
    this.circle = new this.google.maps.Circle(circleConfig);
  },
  unmounted() {
    this.circle.setMap(null);
    this.circle = null;
  }
}
</script>

<style scoped>

</style>
