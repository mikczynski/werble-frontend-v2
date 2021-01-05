<template>
  <Dialog
      header="Create event form"
      v-model:visible="displayDialog"
      :contentStyle="{ width: '80vw', overflow: 'visible' }"
      :modal="true"
  >
    <CreateEventForm :close-dialog="closeDialog"></CreateEventForm>
  </Dialog>

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
    <div></div>

    <div class="p-mr-2">
      <label for="switch">
        Create event mode
        <span :style="createEventModeInfoColor">{{
            createEventModeInfo
          }}</span></label
      >
      <InputSwitch id="switch" v-model="createEventEnabled"/>
      <br/>
      <Button
          :disabled="!(clickedPosition && createEventEnabled)"
          @click="showDialog"
          icon="pi pi-plus"
          class="p-button-success"
          type="button"
          content = "Create event"
          label="Create event"
      />
    </div>

    <div class="p-mr-2">
      <label for="searchDistanceInput">
        Pick searching area distance:
        <span style="color:chocolate;">{{ searchDistanceInput }} km</span>
      </label>

      <Slider
          id="searchDistanceInput"
          v-model="searchDistanceInput"
          :max="searchDistanceMax"
          :min="searchDistanceMin"
          :step="searchDistanceStep"

          class="p-mt-2 p-pb-0"
      />
    </div>

    <div class="p-mr-2">
      <Button
          @click="getEvents" class="p-mt-2 p-button-help" style="height: 2rem" type="button"
      >Reload events
      </Button
      >
    </div>

    <div></div>
  </div>

<!-- Render map if store position and events are se -->
  <the-map v-if="position"
    :create-event-enabled="createEventEnabled"
  ></the-map>
  <InlineMessage v-else class="p-message-info" > Your geolocation is not loaded</InlineMessage>
</template>

<script>
import TheMap from "./TheMap";
import {mapGetters, mapActions} from 'vuex'
import CreateEventForm from "@/components/pages/events/pages/map/CreateEventForm";

export default {
  components: {
    CreateEventForm,
    TheMap,
  },
  computed: {
    ...mapGetters([
      'searchDistance',
      'searchDistanceMin',
      'searchDistanceMax',
      'searchDistanceStep',
      'searchDistanceKM',
      'events',
      'position',
      'profile',
      'clickedPosition',
      'googleMapsApiKey'
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
      createEventEnabled: false,
      displayDialog: false,
    };
  },
  watch: {
    searchDistanceInput(newVal) {
      this.setSearchDistance(newVal);
    },
    searchDistance(){},
    events() {},
  },

  created() {
    this.searchDistanceInput = this.searchDistance;
    this.getEvents();
  },

  methods: {
    ...mapActions([
      'setSearchDistance',
      'getEvents'
    ]),

    toggleCreateEvent() {
      this.createEventEnabled = !this.createEventEnabled
    },
    closeDialog() {
      this.displayDialog = false
    },
    showDialog() {
      this.displayDialog = true
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
