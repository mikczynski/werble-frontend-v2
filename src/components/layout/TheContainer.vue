<template>
<!--  reuqest error are shown here -->
  <InlineMessage severity="warn" v-if="responseErrorsObj">
    <p v-if="responseErrorsObj.message"> {{ responseErrorsObj.message }}</p>
    <ul v-for="errorGroups in responseErrorsObj.errors" v-bind:key="errorGroups">
      <li v-for="e in errorGroups" :key="e">{{ e }}</li>
    </ul>
  </InlineMessage>

  <slot></slot>
</template>

<script>
export default {
  name: "TheContainer"
}
</script>

<style scoped>

</style>