<template>
<!--<ul  >-->

  <DataTable :value="createdEvents" :paginator="true" :rows="10"
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
        <Button @click="getCreatedEvents" icon="pi pi-refresh" style="float: left" content="Refresh events"/>
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

    <Column field="event_creator_id"  header="Owner" :sortable="true"></Column>
    <template #footer>
      In total there are <span style="color:green">{{createdEvents ? createdEvents.length : 0 }}</span> events.
    </template>
    <template #paginatorLeft>
      <Button @click="getCreatedEvents" icon="pi pi-refresh" style="float: left"  content="Refresh events"/>
    </template>
    <template #paginatorRight>

    </template>
  </DataTable>

</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {

  name: "CreatedEventsPage",
  data(){
    return {
          eventsLocal: null,
          filters: {},
    }
  },
  computed: {
    ...mapGetters([
        'createdEvents',
        'searchDistance'
    ]),
  },
    methods:{
      ...mapActions([
          'getCreatedEvents'
      ]),
    },
  mounted() {
    this.getCreatedEvents();
    this.eventsLocal = this.createdEvents;
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
