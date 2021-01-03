<template>
  <!--  request errors are shown here -->
  <InlineMessage severity="success" v-if="responseMessage">
    <p v-if="responseMessage"> {{ responseMessage.message }}</p>
  </InlineMessage>

  <br>

  <InlineMessage severity="warn" v-if="responseError.data">
    <p v-if="responseError.data.message"> {{ responseError.data.message }}</p>
      <p v-if="responseError.data.error"> {{ responseError.data.error.message}}</p>
    <ul v-for="errorGroups in responseError.data.errors" v-bind:key="errorGroups">
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
        responseError() {
          return this.$store.getters.responseError;
        },
        responseMessage() {
          return this.$store.getters.responseMessage;
        }
      },
  watch: {
    responseError(newVal) {
      console.log('(the-container)responseError ' + newVal);
    }
  }

}
</script>

<style scoped>

</style>