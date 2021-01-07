<template>
  <div :style="display">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Marker",
  props: {
    position: {
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
    visible: Boolean,
    event: {
      type: Object,
    }
  },

  watch: {
    visible(newVal) {
      this.marker.setVisible(newVal);
    }
  },
  computed: {
    display(){
      return  {'display' : this.infoWindowOpened ? 'block' : 'none'};
    },
  },
  data() {
    return {
      infoWindowOpened: false,
      marker: null,
    }
  },

  methods: {},

  mounted() {
    //Initialize marker
    this.marker = new this.google.maps.Marker({
      position: this.position, // this.marker.position,
      marker: this.marker,
      map: this.map,
      label: this.label,
      visible: this.visible
    });

    // Create infoWindow for marker
    this.marker.infoWindow = new window.google.maps.InfoWindow({
      // content: this.event.name,
      content: this.$el
    });

    // Add click listener
    this.marker.addListener('click', () => {
      if (this.marker.infoWindow !== null) {
        this.marker.infoWindow.open(this.marker.map, this.marker);
        this.infoWindowOpened = true;
      }
    });

    // add doubleclick listener
    this.marker.addListener('dblclick',() => {
      console.log('event_id: ' + this.event.event_id + ' dblclick');
    });
  },

  unmounted() {
    this.marker.setMap(null);
    this.marker = null;
  }
}
</script>

<style scoped>

</style>
