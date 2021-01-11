<template>
  <form @submit.prevent>
    <div class="p-fluid p-formgrid p-grid">

      <div class="p-field p-col-12 p-md-6">
        <label for="name">Event name:</label>
        <InputText :disabled="noEdit" id="name" v-model="eventLocal.name" type="text"/>
        <InlineMessage v-if="errors.name">{{ errors.name }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="event_type">Event type:</label>
        <Dropdown id="event_type" v-model="eventLocal.event_type_id"
                  :options="eventTypes" optionValue="event_type_id"
                  optionLabel="event_type_name"
                  placeholder="Select event type"
                  :disabled="noEdit"/>
        <InlineMessage v-if="errors.event_type_id">{{ errors.event_type_id }}</InlineMessage>
      </div>


      <div class="p-field p-col-12">
        <label for="description">Description:</label>
        <Textarea :disabled="noEdit" id="description" v-model="eventLocal.description"/>
        <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="start_datetime">Start date:</label>
        <Calendar :disabled="noEdit" id="start_datetime" :minDate="minDate" v-model="eventLocal.start_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.start_datetime">{{ errors.start_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="end_datetime">End date:</label>
        <Calendar :disabled="noEdit" id="end_datetime" :minDate="minDate" v-model="eventLocal.end_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.end_datetime">{{ errors.end_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="location">Location:</label>
        <InputText :disabled="noEdit" id="location" v-model="eventLocal.location" type="text"/>
        <InlineMessage v-if="errors.location">{{ errors.location }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="address">Street name:</label>
        <InputText :disabled="noEdit" id="address" v-model="eventLocal.street_name" type="text"/>
        <InlineMessage v-if="errors.street_name">{{ errors.street_name }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="house_number">House number:</label>
        <InputText :disabled="noEdit" id="house_number" v-model="eventLocal.house_number" type="text"/>
        <InlineMessage v-if="errors.house_number">{{ errors.house_number }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="zipcode">ZipCode:</label>
        <InputText :disabled="noEdit" id="zipcode" v-model="eventLocal.zip_code" type="text"/>
        <InlineMessage v-if="errors.zip_code">{{ errors.zip_code }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="latitude">Latitude:</label>
        <InputText disabled id="latitude" v-model="eventLocal.latitude" type="text" />
        <InlineMessage v-if="errors.latitude">{{ errors.latitude }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="longitude">Longitude:</label>
        <InputText disabled id="longitude" v-model="eventLocal.longitude" type="text" />
        <InlineMessage v-if="errors.longitude">{{ errors.longitude }}</InlineMessage>
      </div>
    </div>

    <div class="p-fluid" v-if="false">
      <Button class="p-button-success p-button-raised" label="Create event" type="submit"/>
    </div>

    <div class="p-mt-2 p-fluid p-formgrid p-grid" v-if="false">
      <div class="p-field p-col-4">
        <Button

            class="p-button-warning p-button"
            label="Cancel"
            type="reset"
            @click="closeDialog"
        />
      </div>

      <div class="p-field p-col" v-if="false">
        <p><strong class="red">* - required fields </strong></p>
      </div>
    </div>
  </form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
export default {

name: "EventInfoOption",
  props:['event'],
  mounted() {
    this.minDate = new Date();
  },
  data(){
      return{
        minDate: null,
        eventLocal: this.event,
        errors: {
          name: '',
          description: '',
          event_type_id: null,
          start_datetime: null,
          end_datetime: null,
          location: '',
          street_name: '',
          zip_code: '',
          house_number: '',
          latitude: 0,
          longitude: 0,
        },
        noEdit: true,
      }
  },
  computed: {
    ...mapGetters(['eventTypes']),
  },
  methods:{
    ...mapActions(['getEventTypes']),
    toggleEdit(){
      this.noEdit = !this.noEdit;
    }
  }
}


</script>

<style scoped>
*:disabled{
  opacity:0.9;
  color: #0a428b;
}
#start_datetime,#end_datetime:disabled{
  color: darkgoldenrod;
}



.p-calendar .p-inputtext{
  opacity:0.9;
  color: #0a428b;
}

.p-dropdown {
  opacity:0.9;
  color: #0a428b;
}

.p-dropdown-trigger,.p-dropdown-panel{
  visibility: hidden;
}


.p-dropdown-label{
  opacity:0.9;
  color: #0a428b;
}

</style>
