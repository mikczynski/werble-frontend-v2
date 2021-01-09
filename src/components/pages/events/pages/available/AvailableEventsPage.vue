<template>

  <Dialog
      header="Event info"
      v-show="selectedEvent"
      v-model:visible="displayDialog"
      :contentStyle="{ width: '60vw', overflow: 'visible' }"
      :modal="true"
  >
    <ShowEvent v-if="action === 'show'" :selectedEvent="selectedEvent" :closeDialog="closeDialog"></ShowEvent>
<!--    <ShowEvent v-if="action === 'edit'" :selectedEvent="selectedEvent"></ShowEvent>-->
<!--    <ShowEvent v-if="action === 'delete'" :selectedEvent="selectedEvent"></ShowEvent>-->
  </Dialog>


  <DataTable :value="events" :paginator="true" :rows="10"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             :rowsPerPageOptions="[10,20,50]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
             class="p-datatable-sm p-datatable-striped"
             sortField="distance" :sortOrder="1"
             removableSort
             dataKey="event_id"
             :filters="filters"
             :loading="isApiSyncActive"
  >

    <template #header>
      <div>
        <Button @click="getEvents" icon="pi pi-refresh" style="float: left" content="Refresh events"/>
        <h3>List of Available events in <strong style="color:goldenrod">{{ searchDistance }} km</strong> radius.</h3>
        <span>In total there are <span style="color:green">{{ events ? events.length : 0 }}</span> events.</span>
      </div>
    </template>

    <template #empty>
      No events found.
    </template>

    <template #loading>
      Loading events data. Please wait.
    </template>

    <!--    <Column field="event_id" header="id" :sortable="true"></Column>-->
    <Column field="event_creator_id" header="Owner" :sortable="true">


    </Column>

    <Column field="event_type_id" header="Event Type" filterMatchMode="equals">

      <template #filter>
        <Dropdown v-model="filters['event_type_id']"
                  :options="eventTypes"
                  optionValue="event_type_id"
                  optionLabel="event_type_name"
                  placeholder="Select event type"
                  :showClear="true"
                  class="p-dropdown-filter">

          <template #option="slotProps">
            <span>{{ slotProps.option.event_type_name }}</span>
          </template>

        </Dropdown>
      </template>

      <template #body="slotProps">
        {{ replaceIdWithName(slotProps.data.event_type_id) }}
      </template>
    </Column>

    <Column filterField="name" header="Name" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.name }}
      </template>

      <template #filter>
        <InputText type="text" v-model="filters['name']" class="p-column-filter" placeholder="Search by name"/>
      </template>

    </Column>

    <Column field="datetime" header="Date" filterMatchMode="custom" :filterFunction="filterDate" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.datetime }}
      </template>

      <!--      <template #filter>-->
      <!--        <Calendar v-model="filters['date']" dateFormat="yy-mm-dd" class="p-column-filter" placeholder="Date"/>-->
      <!--      </template>-->

    </Column>
    <Column field="location" header="Location" :sortable="true"></Column>
    <Column field="distance" header="Distance from you" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.distance }} km
      </template>
    </Column>

    <Column header="Actions">
      <template #body="slotProps">
        {{ slotProps.data.event_id }}

          <Button
              class="p-mx-1 p-my-1 p-button-info p-button-sm"
              @click="showEvent(slotProps.data.event_id)"
              label="Show info"

          />

        <Button v-if="isCreator(slotProps.data.event_creator_id)"
                class="p-mx-1 p-my-1 p-button-warning p-button-sm">

          Edit
        </Button>

        <Button v-if="isCreator(slotProps.data.event_creator_id)"
                class="p-mx-1 p-my-1 p-button-danger p-button-sm">
          Delete
        </Button>

        <!--        <Button class="p-mx-1 p-my-1 p-button-help p-button-sm">Join</Button>-->
      </template>
    </Column>


    <template #footer>
      In total there are <span style="color:green">{{ events ? events.length : 0 }}</span> events.
    </template>
    <template #paginatorLeft>
      <Button @click="getEvents" icon="pi pi-refresh" style="float: left" content="Refresh events"/>
    </template>
    <template #paginatorRight>

    </template>
  </DataTable>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import ShowEvent from "@/components/pages/events/pages/map/components/ShowEvent";

export default {

  name: "AvailableEvents",
  components: {ShowEvent},
  mounted() {
    this.getProfile();
    this.getEvents();
    this.getEventTypes();
    this.eventsLocal = this.events;

  },
  watch: {
    events() {
      this.eventsLocal = this.events;
    }
  },
  data() {
    return {
      action: null,
      selectedEvent: null,
      eventsLocal: null,
      displayDialog: false,
      filters: {},
    }
  },
  computed: {
    ...mapGetters([
      'events',
      'searchDistance',
      'user_id',
      'eventTypes',
      'isApiSyncActive',

    ]),
    actions() {
      return {
        show: 'show',
        edit: 'edit',
        delete: 'delete'
      }
    }

  },
  methods: {
    ...mapActions([
      'getEvents',
      'getProfile',
        'getEventTypes'
    ]),
    replaceIdWithName(id) {
      for (const el of this.eventTypes) {
        if (el.event_type_id === id) return el.event_type_name;
      }
      return id;
    },

    filterDate(value, filter) {
      const date = value.slice(0, 10);
      console.log(date);

      if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
        return true;
      }

      if (value === undefined || value === null) {
        return false;
      }

      return value === this.formatDate(filter);
    },

    closeDialog() {
      this.selectedEvent = null;
      this.action = null;
      this.displayDialog = false
    },

    showEvent(id) {
      console.log('showevent')
      this.selectedEvent = id;
      this.action = 'show';
      console.log(this.selectedEvent)
      console.log('action:' + this.action)
      this.showDialog();
    },

    showDialog() {
      this.displayDialog = true
    },

    formatDate(date) {
      console.log(date);
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return date.getFullYear() + '-' + month + '-' + day;
    },

    isCreator(creator_id) {
      return this.user_id === creator_id;
    },
  },


}
</script>

<style scoped>
ul {
  list-style: none;
}

li {
  display: block;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}

</style>
