<template>
  <Dialog
      header="Create event form"
      v-model:visible="displayDialog"
      :contentStyle="{ width: '80vw', overflow: 'visible' }"
      :modal="true"
  >

    <CreateEventForm :close-dialog="displayDialog"></CreateEventForm>
    <Button @click="displayDialog = false" type="button" style="p-button-danger">BOOOOOOOOOOOOOOOOOOOOI</Button>
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
            :visible="marker.distance < searchDistance"
            :google="google"
            :key="marker.event_id"
            :event="marker"
            :position="{ lat: Number(marker.latitude), lng: Number(marker.longitude) }">

          <img src="https://media1.tenor.com/images/19129351172ab23d7db284bf43c61b2a/tenor.gif?itemid=10549919"
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
          <p v-if="clickedPositionLatLng">Location for new event:<br>
            Lat: {{ clickedPositionLatLng.lat.toFixed(7) }}, Lng: ' +
            {{ clickedPositionLatLng.lng.toFixed(7) }}
          </p>


          <Button @click="alertEvent(marker)" class="p-button-sm">Create event here!</Button>


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


export default {
  name: "EventsMap",
  components: {
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
    clickedPosition() {
    },
  },

  methods: {
    ...mapActions(['getGeolocation']),
    alertEvent() {
      // alert(
      //     'event_id: ' + event.event_id +
      //     '\nevent_name: ' + event.event_name
      //
      // );
      this.displayDialog = true;
    }
  },
}
</script>

<style scoped>

</style>
