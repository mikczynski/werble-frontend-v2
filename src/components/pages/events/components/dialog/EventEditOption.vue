<template>
  <h2>Edit Event</h2>
  <form @submit.prevent="submitForm">
    <div class="p-fluid">

      <!--      Name field-->
      <div class="p-field">
        <label for="name"><strong class="red">*</strong>Name:</label>
        <InputText id="name" v-model="input.name" type="text" />
        <InlineMessage v-if="errors.name">{{ errors.name }}</InlineMessage>
      </div>

      <!--      Description-->
      <div class="p-field">
        <label for="description">Description:</label>
        <Textarea id="description" v-model="input.description"/>
        <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
      </div>


      <div class="p-fluid p-grid">
        <!--          Event Type-->
        <div class="p-col">
          <label for="event_type"><strong class="red">*</strong>Event type:</label>
          <Dropdown id="event_type" v-model="input.event_type_id" :options="eventTypes" optionValue="event_type_id"
                    optionLabel="event_type_name" placeholder="Select event type"></Dropdown>
          <InlineMessage v-if="errors.event_type_id">{{ errors.event_type_id }}</InlineMessage>
        </div>

        <div class="p-col">
          <!--         Date and time -->
          <label for="start_datetime"><strong class="red">*</strong>Date and time:</label>
          <Calendar id="start_datetime" :minDate="minDate" v-model="input.start_datetime" :showSeconds="false" :showTime="true"
                    dateFormat="yy-mm-dd"/>
          <InlineMessage v-if="errors.datetime">{{ errors.datetime }}</InlineMessage>
          <label for="end_datetime"><strong class="red">*</strong>Date and time:</label>
          <Calendar id="end_datetime" :minDate="minDate" v-model="input.end_datetime" :showSeconds="false" :showTime="true"
                    dateFormat="yy-mm-dd"/>
          <InlineMessage v-if="errors.datetime">{{ errors.datetime }}</InlineMessage>

        </div>



      </div>


      <div class="p-fluid p-grid">
        <!--         Location-->
        <div class="p-col">
          <div class="p-field">
            <label for="location">Location:</label>
            <InputText id="location" v-model="input.location" type="text"/>
            <InlineMessage v-if="errors.location">{{ errors.location }}</InlineMessage>
          </div>
          <!--            Street-->
          <div class="p-field">
            <label for="address">Street:</label>
            <InputText id="address" v-model="input.street_name" type="text"/>
            <InlineMessage v-if="errors.street_name">{{ errors.street_name }}</InlineMessage>
          </div>

          <div class="p-grid">
            <!--            House number-->
            <div class="p-col">
              <label for="house_number">House number:</label>
              <InputText id="house_number" v-model="input.house_number" type="text"/>
              <InlineMessage v-if="errors.location">{{ errors.house_number }}</InlineMessage>
            </div>

            <div class="p-col">
              <!--            Zip Code-->
              <label for="zipcode">ZipCode:</label>
              <InputText id="zipcode" v-model="input.zip_code" type="text"/>
              <InlineMessage v-if="errors.location">{{ errors.zip_code }}</InlineMessage>
            </div>
          </div>
        </div>

        <!---->
        <div class="p-col">

          <div class="p-field">
            <label for="latitude">Latitude:</label>
            <InputText id="latitude" v-model="input.latitude" type="text" disabled/>
          </div>

          <div class="p-field">
            <label for="longitude">Longitude:</label>
            <InputText id="longitude" v-model="input.longitude" type="text" disabled/>
          </div>

          <div class="p-field">
            <label style="color:darkgoldenrod">Cancel and close form</label>
            <Button
                style="height: 100%"
                class="p-button-warning p-button"
                label="Cancel creating event"
                type="reset"
                @click="closeDialog"
            />
          </div>


        </div>
      </div>

      <div>

        <div class="p-field p-grid">

          <div class="p-col">
            <Button class="p-button-success p-button-raised" label="Create event" type="submit"/>
          </div>

        </div>
        <div class="p-field">
          <p><strong class="red">* - required fields </strong></p>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";


export default {
  name: "CreateEventForm",
  props: ['longitude', 'latitude'],
  data() {
    return {
      minDate: null,
      input: {
        name: '',
        location: '',
        description: '',
        start_datetime: null,
        end_datetime: null,
        event_type_id: null,
        selectedEventType: null,
        latitude: this.$store.getters.clickedPosition['latitude'].toFixed(7),
        longitude: this.$store.getters.clickedPosition['longitude'].toFixed(7),
      },
      errors: {
        name: '',
        description: '',
        location: '',
        datetime: '',
        longitude: 0,
        latitude: 0,
      }

    }
  },
  mounted() {
    this.getEventTypes();
    this.minDate = new Date();
  },

  computed:
      {
        ...mapGetters([
          'clickedPosition',
          'eventTypes'
        ])
      },
  methods: {
    ...mapActions([
      'setIsApiSyncActive',
      'setResponseError',
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

      console.log("DATATATATA: " + this.input.datetime.toString());
      const input_date = new Date(this.input.datetime);
      const formatted_Date =
          input_date.getFullYear() + "-" + (input_date.getMonth() + 1) + "-" + input_date.getDate()
          + " " + input_date.getHours() + ":" + input_date.getMinutes() + ":" + "00"

      const formData = {
        name: this.input.name,
        location: this.input.location,
        datetime: formatted_Date.toString(), //this.input.datetime,
        description: this.input.description,
        longitude: this.input['longitude'],
        latitude: this.input['latitude'],
      }

      await this.createEvent(formData)
      this.setClickedPosition(null);
      this.closeDialog();
      this.$toast.add(
          {severity:'success', summary: 'Success Message', detail:'Event Owned', life: 3000}
      );
    },

    resetFormErrors() {
      this.errors.any = false;
      this.errors.name = '';
      this.errors.location = '';
      this.errors.description = '';
      this.errors.datetime = '';
      this.errors.latitude = '';
      this.errors.longitude = ''
    },

    checkForm() {
      this.resetFormErrors();
      //login
      if (this.input.name === '')
        this.errors.name += 'Name field is required. ';

      if (this.input.location === '')
        this.errors.location += 'Location field is required.';

      // if (this.input.description === '')
      //   this.errors.description += 'Description field is required.';

      //password
      if (this.input.datetime === null)
        this.errors.datetime += 'Datetime field is required. ';

      if (!this.input.latitude || !this.input.longitude)
        this.errors.longitude = this.errors.latitude += 'Coordinates are required to create event';


      if (this.errors.name || this.errors.location
          || this.errors.datetime || this.errors.latitude || this.errors.longitude || this.errors.description)
        this.errors.any = true;
    }
  }
}

</script>

<style scoped>
form {

}


h3 {
  text-align: center;
  margin: 0;
  padding: 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

#latitude, #longitude {
  color: red;
  text-align: center;
  opacity: 0.8;
}

.red {
  color: red;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
