<template>
  <Button @click="click" class="p-mb-2 p-button-raised p-button-success">Pan to your location!</Button>
</template>

<script>
export default {
  name: "PanButton",
  props: {
    google: {type: Object, required: true},
    map: {type: Object, required: true},
  },

  mounted() {
    const m = this.map.controls[this.google.maps.ControlPosition.BOTTOM_CENTER];
    m.push(this.$el)
  },
  data(){
    return {
      infoWindow: null
    }
  },

  methods:{
    click() {
      if(this.infoWindow) this.infoWindow.open(this.map);

      else this.infoWindow = new this.google.maps.InfoWindow();

      if (this.$store.getters.position) {
        const pos = {
          lat: this.$store.getters.position.latitude,
          lng: this.$store.getters.position.longitude,
        };

        this.infoWindow.setPosition(pos);
        this.infoWindow.setContent("You are here!");
        this.infoWindow.open(this.map);

        this.map.panTo(pos);
        this.map.setCenter(pos);
        this.map.setZoom(12);
      }
    }
  }
}


</script>

<style scoped>

</style>
