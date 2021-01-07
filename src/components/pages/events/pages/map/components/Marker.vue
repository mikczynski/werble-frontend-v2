<template>
  <div :style="display">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Marker",

  props: {
    position: {type: Object, required: false,},
    label: String,
    google: {type: Object, required: true},
    map: {type: Object, required: true},
    visible: {required: true},
    event: {type: Object,},
    openInfoWindow: Boolean,
    type: String,
  },

  watch: {
    createEventModeEnabled(newVal) {
      if (this.type === 'create' && !newVal) {
        this.marker.setVisible(false)
        this.marker.setMap(null)
      }
    },

    'marker.map': function (newVal) {
      console.log(newVal);
      if (!newVal) this.marker.setVisible(newVal);
    },

    visible(newVal) {
      this.marker.setVisible(newVal);
    },

    position(newVal) {
      this.marker.setPosition(newVal)

      switch (this.type) {
        case 'create':
          if (this.marker.infoWindow === null && newVal)
            this.infoWindowOpened();
          else if(newVal){
            this.marker.infoWindow.open(this.marker.map, this.marker);
            this.infoWindowOpened = true;
          }
          else this.marker.infoWindow.close();
          break;

      }
    },
    clickedPosition() {
      switch (this.type) {
        case 'create':
          if (!this.clickedPosition) {
            this.marker.setVisible(false)
            this.marker.setMap(null)
          } else {
            this.marker.setMap(this.map);
          }
          break;

      }
    },

  },
  computed: {
    display() {
      return {'display': this.infoWindowOpened ? 'block' : 'none'};
    },
    icon(){
      switch (this.type){
        case 'create':
          this.marker.setIcon()
      }
      default:
    }
    createEventModeEnabled() {
      return this.$store.getters.createEventModeEnabled;
    }
  },

  data() {
    return {
      infoWindowOpened: false,
      marker: null,
    }
  },

  methods: {
    initInfoWindow() {
      this.marker.infoWindow = new window.google.maps.InfoWindow({
        // content: this.event.name,
        content: this.$el
      });
    }
  },

  mounted() {
    //Initialize marker
    this.marker = new this.google.maps.Marker({
      position: this.position, // this.marker.position,
      marker: this.marker,
      map: this.map,
      label: this.label,
      visible: Boolean(this.visible)
    });


    // Create infoWindow for marker
    this.initInfoWindow()

    // Add click listener
    this.marker.addListener('click', () => {
      if (this.marker.infoWindow !== null) {
        this.marker.infoWindow.open(this.marker.map, this.marker);
        this.infoWindowOpened = true;
      }
    });


    // add doubleclick listener
    this.marker.addListener('dblclick', () => {
      console.log('event_id: ' + this.event.event_id + ' dblclick');
    });

    if (this.openInfoWindow) {
      this.marker.infoWindow.open(this.marker.map, this.marker);
      this.infoWindowOpened = true;
    }

  },

  unmounted() {
    this.marker.setMap(null);
    this.marker = null;
  }
}
</script>

<style scoped>

</style>
