<template>
  <div :style="display" ref="div">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "InfoWindows",
  props: {
    position:{
      type: Object,
      required: true,
    },
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
  },

  methods: {

  },

  computed: {
    display(){
      return  {'display' : this.infoWindowOpened ? 'block' : 'none'};
    },
  },

  watch:{
    position(newVal){
      // if(newVal === null)
      // {
      //   this.infoWindowOpened = false;
      //
      // }

      this.infoWindow.close();
      this.infoWindow.setPosition(newVal);
      this.infoWindow.open(this.map);
    }
  },

  data(){
    return {
      infoWindowOpened: false,
      infoWindow: null,
    }
  },

  mounted() {
    this.infoWindow = new this.google.maps.InfoWindow({
      position:this.position, // this.marker.position,
      // marker: this.marker,
      visible: this.visible || true,
      map: this.map,
      content: this.$refs.div,
    });
    this.infoWindow.open(this.map);
    this.infoWindowOpened = true;
  },


  unmounted() {
    this.infoWindow.setMap(null);
    this.infoWindow = null;
  }
}
</script>

<style scoped>

</style>
