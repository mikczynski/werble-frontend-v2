<template>
  <h2>HomePage</h2>
  <h3 v-if="profile">Welcome back, <strong style="color:goldenrod">{{ fullName }}</strong> a.k.a. <strong style="color:goldenrod">{{ login}} </strong> </h3>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  created() {
    this.$store.dispatch('getGeolocation');
    this.$store.dispatch('getProfile');
  },
  computed: {
      ...mapGetters(['fullName','login','profile']),
  },
  methods: {
  },
  components: {},
  data() {
    return {
      title: 'Home'
    }
  }
}
</script>

<style>

</style>
