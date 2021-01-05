<template>
<!--<ul  >-->
<!--<li v-for="event in eventList" :key="event" >-->
<!--  <p><strong>Name: </strong> {{event.name}}</p>-->
<!--  <p><strong>Description: </strong> {{event.description}}</p>-->
<!--  <p><strong>Date: </strong> {{event.datetime}}</p>-->
<!--  <p><strong>Distance: </strong> {{event.distance}} km</p>-->
<!--  <Button>Participate!</Button>-->
<!--</li>-->
<!--</ul>-->
  <DataTable :value="events" :paginator="true" :rows="10"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             :rowsPerPageOptions="[10,20,50]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
             class="p-datatable-sm p-datatable-striped"
             sortField="distance" :sortOrder="1"
             removableSort
             dataKey="event_id"
  >
    <template #header >
      <div>
        <Button @click="getEvents" icon="pi pi-refresh" style="float: left" content="Refresh events"/>
        <h3>List of Available events in <strong style="color:goldenrod">{{ searchDistance}} km</strong>  radius.</h3>
        <span>In total there are <span style="color:green">{{events ? events.length : 0 }}</span> events.</span>
      </div>
      <div class="table-header">
        List of Customers
        <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText v-model="filters['global']" placeholder="Global Search" />
            </span>
      </div>
    </template>

    <template #empty>
      No events found.
    </template>

    <template #loading>
      Loading events data. Please wait.
    </template>

    <Column field="event_id" header="id" :sortable="true"></Column>
    <Column field="name" header="Name" :sortable="true"></Column>
    <Column field="datetime" header="Date" :sortable="true"></Column>
    <Column field="description" header="Description" :sortable="true"></Column>
    <Column field="location" header="Location" :sortable="true"></Column>
    <Column field="distance" header="Distance from you" :sortable="true">
      <template #body="slotProps">
        {{slotProps.data.distance}} km
      </template>
    </Column>

    <Column field="location"  header="Location" :sortable="true"></Column>
    <template #footer>
      In total there are <span style="color:green">{{events ? events.length : 0 }}</span> events.
    </template>
    <template #paginatorLeft>
      <Button @click="getEvents" icon="pi pi-refresh" style="float: left"  content="Refresh events"/>
    </template>
    <template #paginatorRight>

    </template>
  </DataTable>

</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {

  name: "AvailableEvents",
  data(){
    return {
          eventsLocal: null,
          filters: {},
    }
  },
  computed: {
    ...mapGetters([
        'events',
        'searchDistance'
    ]),
  },
    methods:{
      ...mapActions([
          'getEvents'
      ]),
    },
  mounted() {
    this.$store.dispatch('getEvents');
    this.eventsLocal = this.events;
  }
}
</script>

<style scoped>
ul{
  list-style: none;
}

li {
  display:block;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}

</style>
