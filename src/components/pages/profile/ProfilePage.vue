<template>
   <PageTitle>{{ title }}</PageTitle>
   <profile-nav></profile-nav>
   <router-view></router-view>
</template>

<script>
import ProfileNav from './ProfileNav.vue'
export default {
  components: { ProfileNav },
  data(){
    return{
        title:"Your profile",
    }

  }
}
</script>

<style>
    
</style>