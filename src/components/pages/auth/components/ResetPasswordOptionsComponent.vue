<template>
  <!-- ResetPassword page additional options -->
  <div class="p-fluid">
    <div class="p-d-block -mr-2 p-ml-5 p-mb-2">
      No account?
      <router-link :to="{ name: 'register' }">
        <strong>Register</strong>
      </router-link>
    </div>
    <div class="p-d-block p-mr-2 p-ml-5 p-mb-2">
      Already have an account?
      <router-link :to="{ name: 'login' }">
        <strong>Log in!</strong>
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  name: "ResetPasswordOptionsComponent"
}
</script>

<style scoped>

</style>