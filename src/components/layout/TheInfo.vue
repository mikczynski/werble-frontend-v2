<template>
  <!--  request errors are shown here -->
  <InlineMessage severity="success" v-if="responseMessage">
    <p v-if="responseMessage">{{ responseMessage }}</p>
  </InlineMessage>

  <br />

  <InlineMessage severity="warn" v-if="responseError">
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
  </InlineMessage>
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
