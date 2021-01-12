<template>

  <Button @click="infoButton" class="p-mx-1" :class="option === 'info' ? outline : text">Event Info</Button>
  <Button @click="participantsButton" class="p-mx-1" :class="option === 'participants' ? outline : text ">Participants</Button>
  <Button @click="reviewsButton" class="p-mx-1" :class="option === 'reviews' ? outline : text ">Reviews</Button>

  <EventInfoOption  v-if="option === 'info'" :event="event" />
  <ParticipantsOption v-if="option === 'participants'" :event="event"/>
  <ReviewsOption v-if="option === 'reviews'" :event="event"/>


  <div class="p-field">
    <Button
        style="height: 100%; float:left;"
        class="p-button-warning p-button"
        label="Close Dialog"
        type="reset"
        @click="closeDialog"
    />

  </div>

</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import EventInfoOption from "@/components/pages/events/components/dialog/EventInfoOption";
import ParticipantsOption from "@/components/pages/events/components/dialog/ParticipantsOption";
import ReviewsOption from "@/components/pages/events/components/dialog/ReviewsOption";

export default {
  name: "ShowEvent",
  components: {ReviewsOption, ParticipantsOption, EventInfoOption},

  computed: {
    ...mapGetters(['event', 'eventTypes','user_id']),
    outline() {
      return {'p-button-outlined': true}
    },
    text(){
      return {'p-button-text': true}
    },
    owner(){
      return this.user_id === this.event.event_creator_id;
    }

  },

  async mounted() {
    await this.getEventTypes();
    this.eventLocal = this.event;
  },

  data() {
    return {

      option: 'info',
      eventLocal: this.event,
    }
  },

  watch: {
    event() {
      this.eventLocal = this.event;
    }
  },

  methods: {
    ...mapActions(['getEvent', 'getEventTypes', 'closeDialog']),
    infoButton() {
      this.option = 'info';
    },

    participantsButton() {
      this.option = 'participants';
    },
    reviewsButton() {
      this.option = 'reviews';
    },

  },

}
</script>

<style scoped>


</style>
