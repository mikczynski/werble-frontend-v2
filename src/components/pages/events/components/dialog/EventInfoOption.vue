<template>
  <form v-if="event" @submit.prevent>
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
        <!--          eventLocal Type-->
        <div class="p-col">
          <label for="eventLocal_type">eventLocal type:</label>
          <InputText id="eventLocal_type" v-model=" eventLocal.eventLocal_type_id" type="text"/>
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

</template>

<script>
export default {
name: "EventInfoOption",
  props:['event'],
  data(){
      return{
          eventLocal: this.event,
      }
  }
}


</script>

<style scoped>

</style>
