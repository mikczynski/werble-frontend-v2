<template>
  <Toast position="bottom-left" />
  <!--  request errors are shown here -->
  <Message severity="success" :life="3000" :sticky="false" v-if="responseMessage">
    <p >Server response: {{ responseMessage }}</p>
  </Message>

  <br />

  <Message severity="warn" v-if="responseError">
    Server response: <br>
    <p v-if="responseError.message">{{ responseError.message }}</p>
    <p v-if="responseError.data.message">{{ responseError.data.message }}</p>
    <p v-if="responseError.data.error">
      {{ responseError.data.error.message }}
    </p>
    <ul
      v-for="errorGroups in responseError.data.errors"
      v-bind:key="errorGroups"
    >
      <li v-for="e in errorGroups" :key="e">{{ e }}</li>
    </ul>
  </Message>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TheInfo",
  computed: {
    ...mapGetters(["isApiSyncActive", "responseError", "responseMessage"]),
  },
};
</script>

<style scoped></style>
