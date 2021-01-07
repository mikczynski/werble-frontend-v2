<template>
  <slot></slot>
</template>

<script>
export default {
  name: "InfoWindows",
  props: {
    position:{
      type: Object,
      required: true,
    },
    label: String,
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    visible: Boolean
  },

  watch:{

  },
  computed: {

  },
  data(){
    return {
      infoWindow: null,
    }
  },

  mounted() {
    this.infoWindow = new this.google.maps.InfoWindow({
      position:this.position, // this.marker.position,
      marker: this.marker,
      map: this.map,
      content: 'test',
    });
    this.infoWindow.open();
  },

  beforeUnmount() {
    this.infoWindow.close();
  },

  unmounted() {
    this.infoWindow.setMap(null);
    this.infoWindow = null;
  }
}
</script>

<style scoped>

</style>
