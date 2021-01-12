<template>
  <form @submit.prevent>

    <p class="p-field"> <strong>Status:</strong> <strong  :style="{color: color}">{{ status }}</strong></p>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="name">Event name:</label>
        <InputText :disabled="!editEvent" id="name" v-model="input.name" type="text"/>
        <InlineMessage v-if="errors.name">{{ errors.name }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="event_type">Event type:</label>
        <Dropdown id="event_type" v-model="input.event_type_id"
                  :options="eventTypes" optionValue="event_type_id"
                  optionLabel="event_type_name"
                  placeholder="Select event type"
                  :disabled="!editEvent"/>
        <InlineMessage v-if="errors.event_type_id">{{ errors.event_type_id }}</InlineMessage>
      </div>


      <div class="p-field p-col-12">
        <label for="description">Description:</label>
        <Textarea :disabled="!editEvent" id="description" v-model="input.description"/>
        <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="start_datetime">Start date:</label>
        <Calendar :disabled="!editEvent" id="start_datetime" :minDate="minDate" v-model="input.start_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.start_datetime">{{ errors.start_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="end_datetime">End date:</label>
        <Calendar :disabled="!editEvent" id="end_datetime" :minDate="minDate" v-model="input.end_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.end_datetime">{{ errors.end_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="location">Location:</label>
        <InputText :disabled="!editEvent" id="location" v-model="input.location" type="text"/>
        <InlineMessage v-if="errors.location">{{ errors.location }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="address">Street name:</label>
        <InputText :disabled="!editEvent" id="address" v-model="input.street_name" type="text"/>
        <InlineMessage v-if="errors.street_name">{{ errors.street_name }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="house_number">House number:</label>
        <InputText :disabled="!editEvent" id="house_number" v-model="input.house_number" type="text"/>
        <InlineMessage v-if="errors.house_number">{{ errors.house_number }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="zipcode">ZipCode:</label>
        <InputText :disabled="!editEvent" id="zipcode" v-model="input.zip_code" type="text"/>
        <InlineMessage v-if="errors.zip_code">{{ errors.zip_code }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="latitude">Latitude:</label>
        <InputText disabled id="latitude" v-model="input.latitude" type="text" />
        <InlineMessage v-if="errors.latitude">{{ errors.latitude }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="longitude">Longitude:</label>
        <InputText disabled id="longitude" v-model="input.longitude" type="text" />
        <InlineMessage v-if="errors.longitude">{{ errors.longitude }}</InlineMessage>
      </div>
    </div>

    <div class="p-mt-2 p-field p-fluid">
      <Button

          class="p-button-secondary p-button"
          :label="joinButtonText"
          @click="joinButtonAction"
          :disabled="checkIfOwner && !editEvent"
          type="button"
      />


    </div>
    <ConfirmDialog></ConfirmDialog>
    <Button
        class="p-button-danger p-button-outlined"

        label="Delete event"
        v-if="checkIfOwner"
        @click="confirmDelete($event)"
        type="button"
    />
    <div style="float:right"  v-if="checkIfOwner">
      <label for="toggleEdit">Editing event: </label>
      <InputSwitch id="toggleEdit"  v-model="editEvent" class="p-mx-auto" @click="toggleEdit"/>
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
    this.editEvent = (this.dialogChosenAction ==="EDIT") || false;
  },
  data(){
      return{
        minDate: null,
        input: {
          name: this.event.name ? this.event.name : '',
          description: this.event.description ? this.event.description : '',
          event_type_id: this.event.event_type_id,
          start_datetime: this.event.start_datetime ? this.event.start_datetime : '',
          end_datetime: this.event.end_datetime ? this.event.end_datetime : '',
          location: this.event.location ? this.event.location : '',
          street_name: this.event.street_name ? this.event.street_name : '',
          zip_code: this.event.zip_code? this.event.zip_code : '',
          house_number: this.event.house_number? this.event.house_number : '',
          latitude: this.event.longitude ? this.event.longitude : 0,
          longitude: this.event.latitude ? this.event.latitude : 0,
        },
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
        editEvent: false,
      }
  },
  computed: {
    ...mapGetters(['eventTypes','user_id','dialogChosenAction']),
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
    },
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
      if (!this.event.status) return 'Event ended'

      if (this.checkIfOwner && this.checkIfParticipating)
        return 'Edit'
      else if (this.checkIfParticipating)
        return 'Leave'

      return 'Join'
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

  },
  methods:{
    ...mapActions(
        ['getEventTypes',
          'joinEvent',
          'editEventAction',
          'leaveEvent',
          'getEvents',
          'getEvent',
          'deleteEvent',
          'setResponseError',
            'closeDialog'
        ]),
    toggleEdit(){
      this.editEvent = !this.editEvent;
    },
    async joinButtonAction() {
      if (this.checkIfOwner && this.checkIfParticipating)
        return await this.editEventButton();
      else if (this.checkIfParticipating)
        return await this.leaveEvent(this.event.event_id) | await this.getEvents({with_participants: true});
      else
        return await this.joinEvent(this.event.event_id) | await this.getEvents({with_participants: true});
    },



    async editEventButton(){
      await this.submitForm();
      await this.getEvents();
      this.closeDialog();
    },



    confirmDelete(event) {
      this.$confirm.require({
        target: event.currentTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
          this.deleteEventButton();
          this.$toast.add({severity:'info', summary:'Confirmed', detail:'Event deleted', life: 3000});
        },
        reject: () => {
          this.$toast.add({severity:'info', summary:'Rejected', detail:'You have rejected', life: 3000});
        }
      });
    },
    async deleteEventButton(){
      await this.deleteEvent(this.event.event_id);
      await this.getEvents();
      this.closeDialog();
    },



    async submitForm() {
      this.setResponseError('');
      this.checkForm();
      if (this.errors.any) return;
      if (this.responseError) return;

      const formatDate = (date) =>
          date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
          + " " + date.getHours() + ":" + date.getMinutes() + ":" + "00";

      const start_date = new Date(this.input.start_datetime);
      const end_date = new Date(this.input.end_datetime);

      const formData = {
        name: this.input.name.trim(),
        description: this.input.description,
        event_type_id: this.input.event_type_id,
        start_datetime: formatDate(start_date),
        end_datetime: formatDate(end_date),
        location: this.input.location.trim(),
        street_name: this.input.street_name.trim(),
        zip_code: this.input.zip_code.trim(),
        house_number: this.input.house_number.trim(),
        status: 2,

        longitude: this.event['longitude'],
        latitude: this.event['latitude'],
      }

      const payload = {
        id : this.event.event_id,
        form_data : formData
      }
      await this.editEventAction(payload)

      // this.closeDialog();
      this.$toast.add(
          {severity: 'success', summary: 'Success Message', detail: 'Event edited', life: 1500}
      );
    },


    resetFormErrors() {
      this.errors.any = false;
      this.errors.name = '';
      this.errors.description = '';
      this.errors.event_type_id = '';
      this.errors.datetime = '';
      this.errors.latitude = '';
      this.errors.longitude = '';
      this.errors.location = '';
      this.errors.start_datetime = '';
      this.errors.end_datetime = '';
      this.errors.street_name = '';
      this.errors.zip_code = '';
      this.errors.house_number = '';
    },

    checkForm() {
      this.resetFormErrors();

      if (!this.input.name)
        this.errors.name += 'Name field is required. ';

      if (!this.input.event_type_id)
        this.errors.event_type_id += 'Event type field is required. ';

      if (!this.input.start_datetime)
        this.errors.start_datetime += 'Start date field is required. ';

      if (!this.input.end_datetime)
        this.errors.end_datetime += 'Start date field is required. ';

      if (!this.input.latitude || !this.input.longitude)
        this.errors.longitude = this.errors.latitude += 'Coordinates are required to create event';

      if (this.errors.name || this.errors.location
          || this.errors.datetime || this.errors.latitude || this.errors.longitude || this.errors.description || this.errors.event_type_id)
        this.errors.any = true;
    },

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

.p-confirm-popup{
  z-index: 999;
}

</style>
