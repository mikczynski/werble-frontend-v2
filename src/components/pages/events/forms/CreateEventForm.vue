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
          <label for="datetime">Date and time:</label>
          <Calendar id="datetime"  v-model="input.datetime" :showSeconds="true" :showTime="true" dateFormat="yy-mm-dd" />
          <label for="latitude">Latitude:</label>
          <InputText id="latitude" v-model="input.latitude" type="text" disabled/>
          <label for="longitude">Longitude:</label>
          <InputText id="longitude" v-model="input.longitude" type="text" disabled/>
        </div>
        <InlineMessage v-if="errors.datetime">{{ errors.datetime }}</InlineMessage>
        <div class="p-field p-grid">
          <div class="p-col">
            <Button  label="Create event" type="submit"/>
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
export default {
  name: "CreateEventForm",
  props: ['longitude', 'latitude', 'closeDialog'],
  data() {
    return {
      input: {
        name: '',
        location: '',
        description: '',
        datetime: '',
        latitude: this.$store.getters.newEventPosition['lat'].toFixed(7),
        longitude: this.$store.getters.newEventPosition['lng'].toFixed(7),
      },
      errors: {
        name: '',
        location: '',
        datetime: '',
        longitude: 0,
        latitude: 0,
      }

    }
  },
  computed:
      {
      },
  methods: {
    async submitForm() {
      console.log("DATATATATA: " + this.input.datetime.toString());
      const input_date = new Date(this.input.datetime);
      const formatted_Date =
          input_date.getFullYear() + "-" + (input_date.getMonth() + 1) + "-" + input_date.getDate()
          + " " + input_date.getHours() + ":" + input_date.getMinutes() + ":" + input_date.getSeconds()

      const storePos = this.$store.getters.newEventPosition;
      console.log(typeof storePos);

      const formData = {
        name: this.input.name,
        location: this.input.location,
        datetime:formatted_Date.toString(), //this.input.datetime,
        description: this.input.description,
        longitude: storePos['lng'],
        latitude: storePos['lat'],
      }
      await this.$store.dispatch('createEvent',formData)

    },
    resetFormErrors() {
      this.errors.any = false;
      this.errors.login = '';
      this.errors.password = '';
    }

    // checkForm() {
    //   this.resetFormErrors();
    //   //login
    //   if (this.input.login === '')
    //     this.errors.login += 'Login field is required. ';
    //
    //   if (this.input.login.length < 4)
    //     this.errors.login += 'Login must be at least 4 characters long.';
    //
    //   //password
    //   if (this.input.password === '')
    //     this.errors.password += 'Password field is required. ';
    //
    //   if (this.input.password.length < 8)
    //     this.errors.password += 'Password  must be at least 8 characters long.';
    //
    //
    //   if (this.errors.login !== '' || this.errors.password !== '')
    //     this.errors.any = true;
    // }Tue Dec 29 2020 06:50:19 GMT+0100
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