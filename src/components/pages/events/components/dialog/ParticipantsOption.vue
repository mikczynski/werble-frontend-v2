<template>
  <DataTable :value="event.participants" :paginator="true" :rows="10"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             :rowsPerPageOptions="[10,20,50]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
             class="p-datatable-sm p-datatable-striped"
             sortField="username" :sortOrder="1"
             removableSort
             dataKey="event_id"
             :filters="filters"
  >

    <template #header>
        <span>In total there are <span style="color:green">{{ event.participants ? event.participants.length : 0 }}</span> participants.</span>
    </template>

    <template #empty>
      No participants found.
    </template>

    <template #loading>
      Loading participants data. Please wait.
    </template>

    <Column  field="user.login" header="Username" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.user.login }} <span v-if="slotProps.data.user_id === event.event_creator_id" style="color:darkgoldenrod"> (Owner)</span>
      </template>
    </Column>

    <template #footer>
      <span>In total there are <span style="color:green">{{ event.participants ? event.participants.length : 0 }}</span> participants.</span>
    </template>
    <template #paginatorLeft>
      <Button @click="getEvent(event.event_id)" icon="pi pi-refresh" class="p-button-sm" content="Refresh events"/>
    </template>
    <template #paginatorRight>

    </template>
  </DataTable>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "ParticipantsOption",
  props: ['event'],

  data(){
    return{
      eventLocal: this.event,
      filters:{},
    }
  },
  methods:
      {
        ...mapActions(['getEvent'])
      }
}
</script>

<style scoped>

</style>
