<template>
  <div style="text-align: left">
    event_id: {{ event.event_id }}
    <div><strong>Name: </strong>{{ event.name }}<br></div>
    <div><strong>Type: </strong>{{ replaceId(event.event_type_id) }}<br></div>
    <div><strong>Start date: </strong>{{ event.start_datetime }}<br></div>
    <div><strong>End date: </strong>{{ event.end_datetime }}<br></div>
    <div><strong>Owner: </strong>{{ event.event_creator_id }}</div>
    <div><strong>Distance from you: </strong>{{ event.distance }} km<br></div>
    <div><strong>Status:</strong> <span :style="{'color': color }">{{ status() }}</span>
    </div>
    <br>
    <Button
        class=" p-d-inline p-mx-1 p-my-1 p-button-info p-button-sm"
        @click="showEventInfo(event.event_id)"
        :disable="Boolean(this.event.status)"
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
    color() {
      let color = 'black';
      switch (this.event.status) {
        case 0:
          color = 'red';
          break;
        case 1:
          color = 'goldenrod';
          break;
        case 2:
          color = 'green';
          break;
      }
      return color;
    },
    joinButtonText() {
      if (!this.status()) return 'Event ended'

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
    ...mapActions(['showEventInfo','showEventEdit', 'joinEvent', 'leaveEvent', 'getEvents']),

    replaceId(id) {
      for (const el of this.eventTypes) {
        if (el.event_type_id === id) return el.event_type_name;
      }
      return id;
    },


    async joinButtonAction() {
      if (this.checkIfOwner() && this.checkIfParticipating())
        return this.showEventEdit(this.event.event_id);
      else if (this.checkIfParticipating())
        return await this.leaveEvent(this.event.event_id) | await this.getEvents({with_participants: true});
      else
        return await this.joinEvent(this.event.event_id) | await this.getEvents({with_participants: true});
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

    status() {
      let status;
      switch (this.event.status) {
        case 0:
          status = 'Ended';
          break;
        case 1:
          status = 'Started';
          break;
        case 2:
          status = 'Not started yet';
          break;
      }

      return status;
    }
  }

}
</script>
