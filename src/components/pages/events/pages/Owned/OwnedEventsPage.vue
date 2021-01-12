<template>
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
        <h3>List of Local events in <strong style="color:goldenrod">{{ searchDistance }} km</strong> radius.</h3>
        <span>In total there are <span style="color:green">{{ events ? events.length : 0 }}</span> events.</span>
      </div>
    </template>

    <template #empty>
      No events found.
    </template>

    <template #loading>
      Loading events data. Please wait.
    </template>


    <Column filterField="name" header="Event name" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.name }}
      </template>

      <template #filter>
        <InputText type="text" v-model="filters['name']" class="p-column-filter" placeholder="Search by name"/>
      </template>

    </Column>

    <Column field="event_type_id" header="Event type" filterMatchMode="equals">

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


    <Column field="start_datetime" header="Start date">
      <template #body="slotProps">
        {{ slotProps.data.start_datetime }}
      </template>

    </Column>

    <Column field="end_datetime" header="End date">
      <template #body="slotProps">
        {{ slotProps.data.end_datetime }}
      </template>

    </Column>


    <Column field="location" header="Location" :sortable="true"></Column>

    <!--    <Column field="event_creator_id" header="Owner" :sortable="true"></Column>-->

    <Column field="distance" header="Distance from you" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.distance }} km
      </template>
    </Column>

    <Column field="status" header="Status" :sortable="true">
      <template #body="slotProps">
        <strong :style="{color: colorStatus(slotProps.data)}"> {{ status(slotProps.data) }} </strong>
      </template>
    </Column>

    <Column header="Actions">
      <template #body="slotProps">

        <Button
            class="p-mx-1 p-my-1 p-button-info p-button-sm"
            @click="showEventInfo(slotProps.data.event_id)"
            label="Show info"
        />

        <Button
            class=" p-d-inline p-mx-1 p-my-1 p-button-secondary p-button-sm"
            @click="joinButtonAction(slotProps.data)"
            :label="joinButtonText(slotProps.data)"
        />

        <Button
            class="p-mx-1 p-my-1 p-button-danger p-button-outlined p-button-sm"
            label="Delete"
            v-if="checkIfOwner(slotProps.data)"
            @click="deleteEventButton(slotProps.data);"
            type="button"
        />
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

export default {

  name: "LocalEvents",
  components: {},
  async mounted() {
    await this.getEvents();
    await this.getProfile();
    await this.getEventTypes();
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
      'searchDistance',
      'user_id',
      'eventTypes',
      'isApiSyncActive',
    ]),
    ...mapGetters({
      events :'createdEvents'
    }),

    actions() {
      return {
        show: 'show',
        edit: 'edit',
        delete: 'delete'
      }
    },

  },

  methods: {
    ...mapActions([
      'getProfile',
      'getEventTypes',
      'showEventInfo',
      'showEventEdit',
      'joinEvent',
      'leaveEvent',
      'deleteEvent',
      'closeDialog'
    ]),

    ...mapActions({
      getEvents: 'getCreatedEvents',
    }),

    async deleteEventButton(event){

      await this.deleteEvent(event.event_id);
      this.closeDialog()

      this.$toast.add(
          {severity:'success', summary: 'Success Message', detail:'Event deleted', life: 3000}
      );

    },

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

    formatDate(date) {
      console.log(date);
      let month = date.getMonth() + 1;
      let day = date.getDate();

      month = month < 10 ? '0' + month : month;
      day = day < 10 ? '0' + day : day;

      return date.getFullYear() + '-' + month + '-' + day;
    },


    async joinButtonAction(event) {
      if (!event.status) return null;

      if (this.checkIfOwner(event)
          && this.checkIfParticipating(event))
        return this.showEventEdit(event.event_id);

      else if (this.checkIfParticipating(event))
        return await this.leaveEvent(event.event_id) | await this.getEvents({with_participants: true});
      else
        return await this.joinEvent(event.event_id) | await this.getEvents({with_participants: true});
    },
    status(event) {
      let status;
      switch (event.status) {
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

    colorStatus(event)  {
      let color = 'black';
      switch (event.status) {
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
    checkIfOwner(event) {
      return this.user_id === event.event_creator_id;
    },

    checkIfParticipating(event) {
      for (const participant of event.participants)
        if (this.user_id === participant.user_id) return true;
      // console.log(participant);
      return false;
    },
    joinButtonText(event ) {
      if (!event.status) return 'Event ended'

      if (this.checkIfOwner && this.checkIfParticipating)
        return 'Edit'
      else if (this.checkIfParticipating)
        return 'Leave'

      return 'Join'
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
