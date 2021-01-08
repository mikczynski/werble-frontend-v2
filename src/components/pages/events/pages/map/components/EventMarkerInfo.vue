<template>
  <Button class="p-mx-1 p-my-1 p-button-info p-button-sm">Show</Button>
  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-warning p-button-sm">Edit</Button>
  <Button v-if="isCreator(slotProps.data.event_creator_id)" class="p-mx-1 p-my-1 p-button-danger p-button-sm">Delete</Button>
</template>

<script>
export default {
  name: "EventMarkerInfo"
}
</script>

<style scoped>

</style>
