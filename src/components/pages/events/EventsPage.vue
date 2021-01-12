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
    <show-event :event="event" :v-if="event && (show || edit)"></show-event>
    <CreateEvent2 v-if="clickedPosition && create"></CreateEvent2>
  </Dialog>

</template>

<script>

import EventsNav from "@/components/pages/events/components/EventsNav";
import {mapActions, mapGetters} from "vuex";
import ShowEvent from "@/components/pages/events/components/dialog/ShowEvent";
// import CreateEventForm from "@/components/pages/events/components/dialog/CreateEvent";
import CreateEvent2 from "@/components/pages/events/components/dialog/CreateEvent2";

export default {
  components: {CreateEvent2,
    // CreateEventForm,
    ShowEvent,  EventsNav},
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
        case this.dialogActions.EDIT: return 'Event info';
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
      return this.dialogChosenAction === this.dialogActions.EDIT;
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
