<template>
  <!--  request errors are shown here -->
  <InlineMessage severity="warn" v-if="responseError">
    <p v-if="responseError.message"> {{ responseError.message }}</p>
  <!--    <p v-if="responseError.error"> {{ responseError.error.message}}</p>-->
    <ul v-for="errorGroups in responseError.errors" v-bind:key="errorGroups">
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
          const responseError = this.$store.getters.responseError;
          console.log('(the-container)responseError ' + responseError);
          if (typeof responseError !== 'undefined')
            return responseError;
          else
            return null;
        }
      },
  watch: {
    responseError(newVal, oldVal) {
      console.log(newVal, '\n', oldVal)
    }
  }

}
</script>

<style scoped>

</style>