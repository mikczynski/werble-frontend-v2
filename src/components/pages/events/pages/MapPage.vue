<template>
  <Dialog header="Create event form" v-model:visible="displayDialog" :contentStyle="{width: '80vw', overflow: 'visible'}" :modal="true">
    <CreateEventForm :close-dialog="closeDialog"></CreateEventForm>
  </Dialog>

  <p v-if="userPosition">Your position: <strong>{ lat: {{ userPosition.latitude.toFixed(7) }}, lng:
    {{ userPosition.longitude.toFixed(7) }} }</strong></p>

  <div class="p-d-block p-d-md-block border p-p-2 p-my-2">
    <p> To create event turn <strong>Create event mode</strong> on and click on the map</p>
    <p> To join or leave an event click on a marker and click on a <strong>Join</strong> or <strong>Leave</strong>
      button</p>
  </div>

  <div class="p-p-2 p-d-flex p-jc-between">
    <div></div>

    <div class="p-mr-2">
      <label for="switch"> Create event mode <span
          :style="createEventModeInfoColor">{{ createEventModeInfo }}</span></label>
      <InputSwitch id="switch" v-model="createEventEnabled"/><br>
      <Button v-if="newEvent && createEventEnabled" @click="showDialog" class="p-mt-2" style="height: 2rem" type="button">Create event</Button>
    </div>

    <div class="p-mr-2">
      <label for="radius"> Pick searching area radius: <span style="color:chocolate;">{{ radius }} km</span> </label>
      <Slider id="radius" v-model="radius" :max="radiusMax" :min="radiusMin" :step="radiusStep" class="p-mt-2 p-pb-0"
              @input="setRadius"/>
    </div>

    <div class="p-mr-2">
      <Button class="p-mt-2 p-button-help" style="height: 2rem" type="button">Refresh map</Button>

    </div>

    <div></div>

  </div>

  <the-map-alternative
      :showDialog="showDialog"
      :api-key="googleMapsApiKey"
      :createEventEnabled="createEventEnabled"
      :radius="radiusKm">
  </the-map-alternative>


</template>

<script>
import TheMapAlternative from '../components/TheMapComponentAlt'
import CreateEventForm from "@/components/pages/events/forms/CreateEventForm";
// import TheMapComponent from "@/components/pages/events/components/TheMapComponent";

export default {
  components: {
    // TheMapComponent,
    CreateEventForm,
    TheMapAlternative,
  },
  computed: {
    radiusKm() {
      return this.$store.getters.searchRadius * 1000;
    },
    googleMapsApiKey() {
      return this.$store.getters.googleMapsApiKey;
    },
    createEventModeInfo() {
      return this.createEventEnabled ? "enabled" : "disabled";
    },
    createEventModeInfoColor() {
      return this.createEventEnabled ? 'color: green' : 'color: red';
    },
    userPosition() {
      return this.$store.getters.position;
    },
    userProfile() {
      return this.$store.getters.profile;
    },
    newEvent(){
      return this.$store.getters.newEventPosition;
    }
  },
  data() {

    return {
      createEventEnabled: false,
      radius: this.$store.getters.searchRadius,
      radiusMax: 40,
      radiusMin: 4,
      radiusStep: 4,
      displayDialog: false
    }
  },
  watch:
      {
        radius() {
          this.setRadius();
        }
      },

  created() {
    this.getEvents();
  },
  methods: {
    toggleCreateEvent() {
      this.createEventEnabled = !this.createEventEnabled;
    },
    setRadius() {
      this.$store.dispatch('setSearchRadius', this.radius);
    },
    closeDialog() {
      this.displayDialog = false;
    },
    showDialog(){
      this.displayDialog = true;
    },
    async getEvents(){
      await this.$store.dispatch('getEvents');
      console.log(this.$store.getters.events);
    }
  }
};
</script>

<style scoped>

/*.p-panel{*/
/*  height: 80vh;*/
/*  width: 80vw;*/
/*}*/

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