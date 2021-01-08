<template>
  <Dialog
      header="Create event form"
      v-model:visible="displayDialog"
      :contentStyle="{ width: '60vw', overflow: 'visible' }"
      :modal="true"
    >

    <CreateEventForm :close-dialog="closeDialog"></CreateEventForm>

  </Dialog>

  <!--  Google map component-->
  <GoogleMapLoader
      :mapConfig="mapConfig"
      :apiKey="googleMapsApiKey"
  >

    <!--  Send map and google to parent  -->
    <template #default="{map, google}">

      <div v-if="mapLoaded">

        <!--   Creates user circle     -->
        <Circle :map="map" :google="google" :radius="searchDistance"></Circle>

        <!-- Creates event markers from array -->
        <Marker
            v-for="marker in markers"
            :map="map"
            :visible="eventsFilter(marker)"
            :google="google"
            :key="marker.event_id"
            :event="marker"
            :position="{ lat: Number(marker.latitude), lng: Number(marker.longitude) }">

          <img src="https://i2.wp.com/media3.giphy.com/media/ISOckXUybVfQ4/giphy.gif?resize=500%2C338&ssl=1"
               style="width:50%"/>
          <br>
          <Button @click="alertEvent(marker)" class="p-button-sm">Show</Button>

        </Marker>

        <!--        Create event marker-->
        <Marker
            v-show="Boolean(createEventEnabled && clickedPositionVisible)"
            :visible="Boolean(createEventEnabled && clickedPositionVisible)"
            :map="map"
            :google="google"
            :position="clickedPositionLatLng"
            :openInfoWindow="true"
            type="create"
        >
          <p v-if="clickedPositionLatLng">Location for new event:
            <br><br>
            <strong>Lat:</strong> {{ clickedPositionLatLng.lat.toFixed(7) }}<br><strong>Lng:</strong>
            {{ clickedPositionLatLng.lng.toFixed(7) }}
          </p>


          <Button
              :disabled="!(clickedPosition && createEventEnabled)"
              @click="showDialog"
              icon="pi pi-plus"
              class="p-button-success p-button-sm"
              type="button"
              label="Create event"
          />

        </Marker>

        <!-- User marker -->
        <Marker
            v-show="positionLatLng"
            :visible="true"
            :map="map" :google="google"
            :position="positionLatLng"
            :openInfoWindow="true"
            type="user">

          <p v-if="positionLatLng">
            You are here <br><strong style="color:goldenrod">{{ login ? login : '' }}!</strong>
            <br><br>
            <strong>Lat:</strong> {{ positionLatLng.lat.toFixed(7) }}<br><strong>Lng:</strong>
            {{ positionLatLng.lng.toFixed(7) }}
          </p>
        </Marker>

        <PanButton :map="map" :google="google"></PanButton>
        <change-bounds-button :map="map" :google="google" :markers="markersFiltered"></change-bounds-button>

      </div>

    </template>

  </GoogleMapLoader>
</template>

<script>
import GoogleMapLoader from "@/components/pages/events/pages/map/components/GoogleMapLoader";
import Marker from "@/components/pages/events/pages/map/components/Marker";
import Circle from "@/components/pages/events/pages/map/components/Circle";

import {mapGetters, mapActions} from 'vuex'
import CreateEventForm from "@/components/pages/events/pages/map/forms/CreateEventForm";
import PanButton from "@/components/pages/events/pages/map/components/PanButton";
import ChangeBoundsButton from "@/components/pages/events/pages/map/components/ChangeBoundsButton";


export default {
  name: "EventsMap",
  components: {
    ChangeBoundsButton,
    PanButton,
    CreateEventForm,
    GoogleMapLoader,
    Marker,
    Circle
  },

  data() {
    return {
      displayDialog: false
    }
  },

  computed: {
    ...mapGetters([
      'googleMapsApiKey',
      'position',
      'clickedPosition',
      'position',
      'login',
      'createEventEnabled',
      'mapLoaded',
      'events',
      'searchDistance'
    ]),

    positionLatLng() {
      return this.position ? {lat: this.position.latitude, lng: this.position.longitude} : null;
    },

    clickedPositionLatLng() {
      return this.clickedPosition ? {lat: this.clickedPosition.latitude, lng: this.clickedPosition.longitude} : null;
    },

    clickedPositionVisible() {
      return !!this.clickedPosition;
    },

    markers() {
      return [...this.events];
    },
    markersFiltered(){
      return this.markers.filter(this.eventsFilter);
    },

    mapConfig() {
      return {
        mapTypeId: "roadmap",
        zoom: 12,
        disableDefaultUI: false,
        center: {
          lat: this.position.latitude,
          lng: this.position.longitude
        }
      }

    },
  },


  // watch for changes in markrs ( global store events)
  watch: {
    markers() {
    },
    markersFiltered() {
    },
    clickedPosition() {
    },
    displayDialog(newVal){
      if(!newVal) this.setClickedPosition(null);
    }
  },

  methods: {
    ...mapActions(['getGeolocation','setClickedPosition']),
    alertEvent() {},

    closeDialog() {
      this.displayDialog = false
    },

    showDialog() {
      this.displayDialog = true
    },
    eventsFilter(event){
      return event.distance < this.searchDistance
    },

  },
}
</script>

<style scoped>

</style>
