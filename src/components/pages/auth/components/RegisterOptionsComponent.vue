<template>
  <!--Register page additional options -->
  <div class="p-fluid">
    <div class="p-d-block -mr-2 p-ml-5 p-mb-2">
      Already have an account?
      <router-link :to="{ name: 'login' }">
        <strong>Log in!</strong>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterOptionsComponent"
}
</script>

<style scoped>

</style>