<template>
  <div v-if="event" class="p-flex">
    <Button class="p-button">Event Info</Button>
    <Button class="p-button">Participants</Button>
    <Button class="p-button">Reviews</Button>
  </div>

  <form  v-if="eventLocal" @submit.prevent>
    <div class="p-fluid">

      <div class="p-field">
        <label for="name"><strong class="red"></strong>Name:</label>
        <InputText id="name" v-model="eventLocal.name" type="text"/>
      </div>

      <!--      Description-->
      <div class="p-field">
        <label for="description">Description:</label>
        <Textarea id="description" v-model="eventLocal.description"/>
      </div>


      <div class="p-fluid p-grid">
        <!--          Event Type-->
        <div class="p-col">
          <label for="event_type">Event type:</label>
          <InputText id="event_type" v-model=" eventLocal.event_type_id" type="text"/>
        </div>

        <div class="p-col">

          <label for="datetime"><strong class="red">*</strong>Date and time:</label>
          <Calendar id="datetime" disabled v-model="eventLocal.datetime" :showSeconds="false" :showTime="true"
                    dateFormat="yy-mm-dd"/>
        </div>
      </div>


      <div class="p-fluid p-grid">
        <!--         Location-->
        <div class="p-col">
          <div class="p-field">
            <label for="location">Location:</label>
            <InputText id="location" v-model="eventLocal.location" type="text"/>
          </div>
          <!--            Street-->
          <div class="p-field">
            <label for="address">Street name:</label>
            <InputText id="address" v-model="eventLocal.street_name" type="text"/>

          </div>

          <div class="p-grid">
            <!--            House number-->
            <div class="p-col">
              <label for="housenumber">House number:</label>
              <InputText id="housenumber" v-model="eventLocal.house_number" type="text"/>
            </div>

            <div class="p-col">
              <!--            Zip Code-->
              <label for="zipcode">ZipCode:</label>
              <InputText id="zipcode" v-model="eventLocal.zip_code" type="text"/>
            </div>
          </div>
        </div>

        <!---->
        <div class="p-col">

          <div class="p-field">
            <label for="latitude">Latitude:</label>
            <InputText id="latitude" v-model="eventLocal.latitude" type="text" disabled/>
          </div>

          <div class="p-field">
            <label for="longitude">Longitude:</label>
            <InputText id="longitude" v-model="eventLocal.longitude" type="text" disabled/>
          </div>
        </div>
      </div>
      <div class="p-field">
        <Button
            style="height: 100%"
            class="p-button-warning p-button"
            label="Close"
            type="reset"
            @click="closeDialog"
        />

      </div>


      <div>
      </div>
    </div>
  </form>


<!--  <Button class="p-mx-1 p-my-1 p-button-info p-button-sm">Show</Button>-->
<!--  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-warning p-button-sm">Edit</Button>-->
<!--  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-danger p-button-sm">Delete</Button>-->
</template>

<script>
import {mapGetters,mapActions} from 'vuex'

export default {
name: "ShowEvent",
props: ['selectedEvent','closeDialog'],
  methods:{
  ...mapActions(['getEvent']),
  },

  computed:{
  ...mapGetters(['event']),
  },

  mounted() {
    this.getEvent(this.selectedEvent);
    console.log(this.event)
  },

  data(){
    return {
      eventLocal: null,
    }
  },

  watch:{
    event(){
      this.eventLocal = this.event;
    }
  }

}
</script>

<style scoped>



</style>
