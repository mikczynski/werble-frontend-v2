<template>
  <Button @click="infoButton" class="p-button p-mx-1">Event Info</Button>
  <Button @click="participantsButton" class="p-button p-mx-1">Participants</Button>
  <Button @click="reviewsButton" class="p-button p-mx-1">Reviews</Button>


  <EventInfoOption    v-if = "option === 'info'" :event="event" ></EventInfoOption>
  <ParticipantsOption v-if = "option === 'participants'" :event="event"></ParticipantsOption>
  <ReviewsOption      v-if = "option === 'reviews'" :event="event"></ReviewsOption>

  <div class="p-field">
    <Button
        style="height: 100%"
        class="p-button-warning p-button"
        label="Close"
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
    ...mapGetters(['event']),
  },

  mounted() {
    this.eventLocal = this.event;
    console.log(this.event)
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
    ...mapActions(['getEvent', 'closeDialog']),
    infoButton(){
      this.option = 'info';
    },

    participantsButton(){
      this.option = 'participants';
    },
    reviewsButton(){
      this.option = 'reviews';
    },

  },

}
</script>

<style scoped>


</style>
