<template>
  <!--Login page additional options -->
  <div class="p-fluid">
    <div class="p-d-block -mr-2 p-ml-5 p-mb-2">
      No account?
      <router-link :to="{ name: 'register' }">
        <strong>Register</strong>
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "LoginOptionsComponent"
}
</script>

<style scoped>

</style>
