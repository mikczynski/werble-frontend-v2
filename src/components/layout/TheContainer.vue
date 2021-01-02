<template>
  <!--  reuqest error are shown here -->
  <InlineMessage severity="warn" v-if="responseErrors">
    <p v-if="responseErrors.message"> {{ responseErrors.message }}</p>
    <ul v-for="errorGroups in responseErrors.errors" v-bind:key="errorGroups">
      <li v-for="e in errorGroups" :key="e">{{ e }}</li>
    </ul>
  </InlineMessage>

  <slot></slot>
</template>

<script>
export default {
  name: "TheContainer",
  computed:
      {
        responseErrors(){
          return this.$store.getters.responseErrors;
        }
      }
}
</script>

<style scoped>

</style>