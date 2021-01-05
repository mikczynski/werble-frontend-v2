<template>
  <h2>{{ pageTitle }}</h2>
  <profile-nav></profile-nav>
  <router-view></router-view>
</template>

<script>
import ProfileNav from './components/ProfileNav.vue'
export default {
  components: { ProfileNav },
  data(){
    return{
      pageTitle:"Your profile",
    }
  }
}
</script>

<style>

</style>
