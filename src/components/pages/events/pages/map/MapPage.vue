<template>
  <p v-if="position">
    Your position:
    <strong
    >Lat: {{ position.latitude.toFixed(7) }}, Lng:
      {{ position.longitude.toFixed(7) }}</strong
    >
  </p>

  <div class="p-d-block p-d-md-block border p-p-2 p-my-2">
    <p>
      To create event turn <strong>Create event mode</strong> on and click on
      the map
    </p>
    <p>
      To join or leave an event click on a marker and click on a
      <strong>Join</strong> or <strong>Leave</strong> button
    </p>
  </div>

  <div class="p-p-2 p-d-flex p-jc-between">
    <div class="">

    </div>

    <div class="p-mr-2">
      <label for="switch">
        Create event mode
        <span :style="createEventModeInfoColor">{{
            createEventModeInfo
          }}</span></label
      >
      <InputSwitch id="switch" :modelValue="createEventEnabled" @click="toggleCreateEventEnabled"/>
      <br/>

    </div>

    <div class="p-mr-2">
      <label for="searchDistanceInput">
        Search distance:
        <span style="color:chocolate;">{{ searchDistanceInput }} km</span>
      </label>

      <Slider
          id="searchDistanceInput"
          v-model="searchDistanceInput"
          :max="searchDistanceMax"
          :min="searchDistanceMin"
          :step="searchDistanceStep"

          @slideEnd="alert($event)"
          class="p-mt-2 p-pb-0"
      />
    </div>

    <div>
      <Button
          :disabled="!(clickedPosition && createEventEnabled)"
          @click="showEventCreate"
          icon="pi pi-plus"
          class="p-button-success p-mr-2 p-mb-2 "
          type="button"
          label="Create event"
      />
      <Button
          :disabled="!(clickedPosition && createEventEnabled)"
          @click="setClickedPosition(null)"
          icon="pi pi-trash"
          class="p-button-info p-mr-2 p-mb-2"
          type="button"
          label="Clear selected location"
      />
      <Button
          icon="pi pi-refresh"
          @click="getEventsToast"
          class="p-button-help p-mr-2 p-mb-2"
          type="button"
          label="Refresh events"
      />
    </div>


    <div></div>
  </div>

  <events-map v-if="geolocationLoaded"/>
  <InlineMessage v-else class="p-message-info"> Your geolocation is not loaded</InlineMessage>

</template>

<script>
// import TheMap from "./TheMap";
import {mapGetters, mapActions} from 'vuex'
import EventsMap from "@/components/pages/events/pages/map/components/EventsMap";

export default {
  components: {
    EventsMap,

  },
  computed: {
    ...mapGetters([
      // dialog
        'displayDialog',
        'dialogChosenAction',
        'dialogAction',


      'searchDistance',
      'searchDistanceMin',
      'searchDistanceMax',
      'searchDistanceStep',
      'searchDistanceKM',
      'events',
      'position',
      'profile',
      'clickedPosition',
      'googleMapsApiKey',
      'createEventEnabled',
      'geolocationLoaded',
      'isMapLoaded'
    ]),

    createEventModeInfo() {
      return this.createEventEnabled ? "enabled" : "disabled"
    },
    createEventModeInfoColor() {
      return this.createEventEnabled ? "color: green" : "color: red"
    },

  },
  data() {
    return {
      searchDistanceInput: 20,
    };
  },
  watch: {
    searchDistanceInput(newVal) {
      this.setSearchDistance(newVal);
    },
    searchDistance() {
    },
    events() {
    },
    displayDialog(newVal) {
      if (!newVal) this.setClickedPosition(null);
    }
  },

  created() {
    this.searchDistanceInput = this.searchDistance;
    this.getEvents();
    this.getEventTypes();
  },

  methods: {
    ...mapActions([
      'getEventTypes',
      'setSearchDistance',
      'getEvents',
      'setClickedPosition',
      'toggleCreateEventEnabled',
      'showEventCreate',
        //dialog
      'closeDialog'
    ]),

    getEventsToast() {
      this.getEvents();
      if (this.events) this.$toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Events refreshed',
        life: 3000
      });
    },
  },
};
</script>

<style scoped>

.border {
  border: 1px solid #0a428b;
}

.border p {
  margin: 0.1rem;
  padding: 0;
}

.p-slider-horizontal {
  width: 14rem;
}

input {
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
  text-align: center;
}

input:disabled {
  opacity: 0.9;
}
</style>
