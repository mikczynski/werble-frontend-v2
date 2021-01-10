<template>
  <div style="text-align: left">
    event_id: {{ event.event_id}}
    <div><strong>Name: </strong>{{ event.name }}<br></div>
    <div><strong>Type: </strong>{{ replaceId(event.event_type_id) }}<br></div>
    <div><strong>Date: </strong>{{ event.datetime }}<br></div>
    <div><strong>Owner: </strong>{{ event.event_creator_id }}</div>
    <div><strong>Distance from you: </strong>{{ event.distance }} km<br></div>
    <Button
        class=" p-d-inline p-mx-1 p-my-1 p-button-secondary p-button-sm"
        @click="showEventInfo(event.event_id)"
        label="Join"
    />
    <Button
        class=" p-d-inline p-mx-1 p-my-1 p-button-info p-button-sm"
        @click="showEventInfo(event.event_id)"
        label="Show info"
    />
  </div>


</template>
<script>
import {mapGetters,mapActions} from 'vuex'
// import ShowEvent from "@/components/pages/events/pages/map/components/ShowEvent";

export default {
  name: "EventInfo",
  components:{

  },
  computed: {
    ...mapGetters(['eventTypes'])
  },
  data() {
    return {
      selectedEvent: null,
      action: null,
    }
  },
  props: {
    event: {type: Object, required: true},
  },
  methods: {
    ...mapActions(['showEventInfo']),

    replaceId(id) {
      for (const el of this.eventTypes) {
        if (el.event_type_id === id) return el.event_type_name;
      }
      return id;
    },
  }

}
</script>
