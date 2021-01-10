<template>
  <div style="text-align: left">
    event_id: {{ event.event_id }}
    <div><strong>Name: </strong>{{ event.name }}<br></div>
    <div><strong>Type: </strong>{{ replaceId(event.event_type_id) }}<br></div>
    <div><strong>Date: </strong>{{ event.datetime }}<br></div>
    <div><strong>Owner: </strong>{{ event.event_creator_id }}</div>
    <div><strong>Distance from you: </strong>{{ event.distance }} km<br></div>
    <div><strong>Is active?:</strong>   <span :style="{'color': event.is_active ? 'green' : 'red' }">{{ event.is_active ? 'Yes' : 'No'}}</span></div>
    <Button
        class=" p-d-inline p-mx-1 p-my-1 p-button-info p-button-sm"
        @click="showEventInfo(event.event_id)"
        :disable="eventActive"
        label="Show info"
    />

    <Button
        class=" p-d-inline p-mx-1 p-my-1 p-button-secondary p-button-sm"
        @click="joinButtonAction()"
        :label="joinButtonText"
    />

  </div>


</template>
<script>
import {mapGetters, mapActions} from 'vuex'
// import ShowEvent from "@/components/pages/events/pages/map/components/ShowEvent";

export default {
  name: "EventInfo",
  components: {},
  computed: {
    ...mapGetters(['eventTypes', ['user_id']]),
    joinButtonText() {
      if(!this.eventActive()) return 'Event ended'

      if (this.checkIfOwner() && this.checkIfParticipating())
        return 'Edit'
      else if (this.checkIfParticipating())
        return 'Leave'

      return 'Join'
    },
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
    ...mapActions(['showEventInfo', 'joinEvent', 'leaveEvent','getEvents']),

    replaceId(id) {
      for (const el of this.eventTypes) {
        if (el.event_type_id === id) return el.event_type_name;
      }
      return id;
    },





    async joinButtonAction() {
      if (this.checkIfOwner() && this.checkIfParticipating())
        return alert('EDIT');
      else if (this.checkIfParticipating())
        return await this.leaveEvent(this.event.event_id) | await this.getEvents({with_participants:true});
      else
        return await this.joinEvent(this.event.event_id) |  await this.getEvents({with_participants:true});
    },

    checkIfOwner() {
      return this.user_id === this.event.event_creator_id;
    },

    checkIfParticipating() {
      for (const participant of this.event.participants)
        if (this.user_id === participant.user_id) return true;
      // console.log(participant);
      return false;
    },

    eventActive(){
      return !!this.event.is_active;
    }
  }

}
</script>
