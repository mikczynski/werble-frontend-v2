<template>
  <h2>Create event</h2>
  <form @submit.prevent="submitForm">
    <div class="p-fluid">
      <div class="p-field">
        <label for="name">Name:</label>
        <InputText id="name" v-model="input.name" type="text"/>
        <InlineMessage v-if="errors.name">{{ errors.name }}</InlineMessage>
      </div>
      <div class="p-field">
        <label for="location">Location:</label>
        <InputText id="location" v-model="input.location" type="text"/>
        <InlineMessage v-if="errors.location">{{ errors.location }}</InlineMessage>
      </div>
      <div class="p-field">
        <label for="description">Description:</label>
        <Textarea id="description" v-model="input.description"/>
        <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
      </div>
      <div class="p-field">
        <div class="p-field p-col-12 p-md-4">
          <label for="latitude">Latitude:</label>
          <InputText id="latitude" v-model="input.latitude" type="text" disabled/>
          <label for="longitude">Longitude:</label>
          <InputText id="longitude" v-model="input.longitude" type="text" disabled/>
          <label for="datetime">Date and time:</label>
          <Calendar id="datetime" v-model="input.datetime" :showSeconds="false" :showTime="true" dateFormat="yy-mm-dd"/>
        </div>
        <InlineMessage v-if="errors.datetime">{{ errors.datetime }}</InlineMessage>
        <div class="p-field p-grid">
          <div class="p-col">
            <Button label="Create event" type="submit"/>
          </div>
          <div class="p-col">
            <Button
                class="p-button-info p-button-text"
                label="Close"
                type="reset"
                @click="closeDialog"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {mapActions,mapGetters} from "vuex";

export default {
  name: "CreateEventForm",
  props: ['longitude', 'latitude', 'closeDialog'],
  data() {
    return {
      input: {
        name: '',
        location: '',
        description: '',
        datetime: null,
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
  computed:
      {
        ...mapGetters([
            'newEventPositon'
        ])
      },
  methods: {
    ...mapActions([
      'setIsApiSyncActive',
      'setResponseError',
      'createEvent'
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
          + " " + input_date.getHours() + ":" + input_date.getMinutes() + ":" + input_date.getSeconds()

      const storePos = this.$store.getters.newEventPosition;
      const formData = {
        name: this.input.name,
        location: this.input.location,
        datetime: formatted_Date.toString(), //this.input.datetime,
        description: this.input.description,
        longitude: storePos['lng'],
        latitude: storePos['lat'],
      }

       await this.createEvent(formData)

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

      if (this.input.description === '')
        this.errors.description += 'Description field is required.';

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


h2 {
  text-align: center;
  margin-top: 0;
  padding-top: 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
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
