<template>
  <form @submit.prevent="submitForm">
    <h2>New event</h2>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-field p-col-12 p-md-6">
        <label for="name"><strong class="red">*</strong>Event name:</label>
        <InputText id="name" v-model="input.name" type="text"/>
        <InlineMessage v-if="errors.name">{{ errors.name }}</InlineMessage>

      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="event_type"><strong class="red">*</strong>Event type:</label>
        <Dropdown id="event_type" v-model="input.event_type_id"
                  :options="eventTypes" optionValue="event_type_id"
                  optionLabel="event_type_name"
                  placeholder="Select event type"/>
        <InlineMessage v-if="errors.event_type_id">{{ errors.event_type_id }}</InlineMessage>
      </div>


      <div class="p-field p-col-12">
        <label for="description">Description:</label>
        <Textarea id="description" v-model="input.description"/>
        <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="start_datetime"><strong class="red">*</strong>Start date:</label>
        <Calendar id="start_datetime" :minDate="minDate" v-model="input.start_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.start_datetime">{{ errors.start_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="end_datetime"><strong class="red">*</strong>End date:</label>
        <Calendar id="end_datetime" :minDate="minDate" v-model="input.end_datetime" :showSeconds="false"
                  :showTime="true"
                  dateFormat="yy-mm-dd"/>
        <InlineMessage v-if="errors.end_datetime">{{ errors.end_datetime }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="location">Location:</label>
        <InputText id="location" v-model="input.location" type="text"/>
        <InlineMessage v-if="errors.location">{{ errors.location }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="address">Street name:</label>
        <InputText id="address" v-model="input.street_name" type="text"/>
        <InlineMessage v-if="errors.street_name">{{ errors.street_name }}</InlineMessage>
      </div>
      <div class="p-field p-col-12 p-md-3">
        <label for="house_number">House number:</label>
        <InputText id="house_number" v-model="input.house_number" type="text"/>
        <InlineMessage v-if="errors.house_number">{{ errors.house_number }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-3">
        <label for="zipcode">ZipCode:</label>
        <InputText id="zipcode" v-model="input.zip_code" type="text"/>
        <InlineMessage v-if="errors.zip_code">{{ errors.zip_code }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="latitude">Latitude:</label>
        <InputText id="latitude" v-model="input.latitude" type="text" disabled/>
        <InlineMessage v-if="errors.latitude">{{ errors.latitude }}</InlineMessage>
      </div>

      <div class="p-field p-col-12 p-md-6">
        <label for="longitude">Longitude:</label>
        <InputText id="longitude" v-model="input.longitude" type="text" disabled/>
        <InlineMessage v-if="errors.longitude">{{ errors.longitude }}</InlineMessage>
      </div>
    </div>

    <div class="p-fluid">
      <Button class="p-button-success p-button-raised" label="Create event" type="submit"/>
    </div>

    <div class="p-mt-2 p-fluid p-formgrid p-grid">
      <div class="p-field p-col-4">
        <Button

            class="p-button-warning p-button"
            label="Cancel"
            type="reset"
            @click="closeDialog"
        />
      </div>

      <div class="p-field p-col">
        <p><strong class="red">* - required fields </strong></p>
      </div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
  name: "CreateEvent2",
  components: {},
  async mounted() {
    await this.getEventTypes();
    this.minDate = new Date();
  },
  computed:
      {
        ...mapGetters([
          'clickedPosition',
          'eventTypes'
        ])
      },
  data() {
    return {
      minDate: null,
      input: {
        name: '',
        description: '',
        event_type_id: null,
        start_datetime: null,
        end_datetime: null,
        location: '',
        street_name: '',
        zip_code: '',
        house_number: '',
        latitude: this.$store.getters.clickedPosition['latitude'].toFixed(7),
        longitude: this.$store.getters.clickedPosition['longitude'].toFixed(7),
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
      }
    }
  },
  methods:
      {
        ...mapActions([
          'setResponseError',
          'setResponseMessage',
          'createEvent',
          'setClickedPosition',
          'getEventTypes',
          'closeDialog'
        ]),

        async submitForm() {
          this.setResponseError('');
          this.checkForm();
          if (this.errors.any) return;
          if (this.responseError) return;

          const formatDate = (date) =>
              date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
              + " " + date.getHours() + ":" + date.getMinutes() + ":" + "00";

          console.log('event type id ' + this.input.event_type_id)


          const start_date = new Date(this.input.start_datetime)
          const end_date = new Date(this.input.end_datetime)

          const formData = {
            name: this.input.name.trim(),
            description: this.input.description,
            event_type_id: this.input.event_type_id,
            start_datetime: formatDate(start_date),
            end_datetime: formatDate(end_date),
            status: 2,
            location: this.input.location.trim(),
            street_name: this.input.street_name.trim(),
            zip_code: this.input.zip_code.trim(),
            house_number: this.input.house_number.trim(),

            longitude: this.input['longitude'],
            latitude: this.input['latitude'],
          }

          await this.createEvent(formData)

          this.setClickedPosition(null);
          this.closeDialog();
          this.$toast.add(
              {severity: 'success', summary: 'Success Message', detail: 'Event Owned', life: 1500}
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
        isRequired(value) {
          return value ? true : 'This field is required';
        },

      }

}
</script>



<style scoped>
h2 {
  margin-top: 0;
  padding:0;
}

.red {
  color: red;
}

#latitude, #longitude {
  color: red;
  text-align: center;
  opacity: 0.8;
}



</style>
