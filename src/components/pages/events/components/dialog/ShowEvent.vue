<template>
  <div v-if="event" class="p-flex p-ac-between">
    <!--    <div v-if="isCreator(event.event_creator_id)" class="p-field">-->
    <!--      <label for="toggleEdit">Editing profile: </label>-->
    <!--      <InputSwitch id="toggleEdit" v-model="toggleEditSwitch" class="p-mx-auto" @click="toggleEdit"/>-->
  </div>
  <Button class="p-button p-mx-1">Event Info</Button>
  <Button class="p-button p-mx-1">Participants</Button>
  <Button class="p-button p-mx-1">Reviews</Button>
  <div>

  </div>


  <form v-if="eventLocal" @submit.prevent>
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


      <div>
      </div>
    </div>
  </form>

<!--  <div class="p-justify-start">
      <div class="p-just">
          <h2>Name: {{ event.name}}</h2>
          <h3>Date: {{ event.datetime}}</h3>
      </div>-->

  
  <div class="p-field">
    <Button
        style="height: 100%"
        class="p-button-warning p-button"
        label="Close"
        type="reset"
        @click="closeDialog"
    />

  </div>


  <!--  <Button class="p-mx-1 p-my-1 p-button-info p-button-sm">Show</Button>-->
  <!--  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-warning p-button-sm">Edit</Button>-->
  <!--  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-danger p-button-sm">Delete</Button>-->
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  name: "ShowEvent",

  methods: {
    ...mapActions(['getEvent', 'closeDialog']),
  },

  computed: {
    ...mapGetters(['event']),
  },

  mounted() {
    this.eventLocal = this.event;
    console.log(this.event)
  },

  data() {
    return {
      eventLocal: this.event,
    }
  },

  watch: {
    event() {
      this.eventLocal = this.event;
    }
  }

}
</script>

<style scoped>


</style>
