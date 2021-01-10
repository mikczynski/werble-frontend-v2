<template>
  <h2>{{ pageTitle }}</h2>
  <events-nav></events-nav>
  <router-view></router-view>

  <Dialog
      v-if="display"
      :header="dialogTitle"
      v-model:visible="display"
      :contentStyle="{ width: '60vw', overflow: 'visible' }"
      :modal="true"
  >
    <show-event v-if="event && show"></show-event>
    <create-event-form v-if="clickedPosition && create"></create-event-form>

  </Dialog>

</template>

<script>

import EventsNav from "@/components/pages/events/components/EventsNav";
import {mapActions, mapGetters} from "vuex";
import ShowEvent from "@/components/pages/events/components/dialog/ShowEvent";
import CreateEventForm from "@/components/pages/events/components/dialog/CreateEvent";

export default {
  components: {CreateEventForm, ShowEvent,  EventsNav},
  data() {
    return {
      display:false,
      pageTitle: 'Events',
    }
  },
  watch:{
    display(newVal){
      this.setDisplayDialog(newVal);
    },
    displayDialog(newVal){
        this.display= newVal;
    },

  },
  computed:{
    ...mapGetters(['displayDialog','event','dialogActions','dialogChosenAction','clickedPosition']),
    dialogTitle(){
      switch(this.dialogChosenAction)
      {
        case this.dialogActions.CREATE: return 'Create Event Form';
        case this.dialogActions.SHOW: return 'Event info';
        default: return 'Dialog';
      }
    },
    create(){
      return this.dialogChosenAction === this.dialogActions.CREATE;
    },
    show(){
      return this.dialogChosenAction === this.dialogActions.SHOW;
    },
    edit(){
      return true;
    }



  },
  methods:{
    ...mapActions(['closeDialog','setDisplayDialog'])
  },
  created() {
    this.$store.dispatch('getGeolocation');
  },
}
</script>

<style scoped>
</style>
