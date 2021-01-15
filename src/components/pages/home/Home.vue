<template>
  <h2>HomePage</h2>
  <h3 v-if="profile">
    Welcome back,
    <strong style="color:goldenrod">{{ fullname }}</strong>
    {{ fullname ? 'a.k.a. ' : ' ' }}<strong style="color:goldenrod">{{ login }}
  </strong>
  </h3>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

export default {
  created() {
    this.getGeolocation();
    this.getProfile();
  },
  computed: {
    ...mapGetters(['login', 'profile']),

    fullname() {
      let fullname = '';
      if (this.profile.first_name)  fullname += this.profile.first_name + ' ';
      if (this.profile.last_name)   fullname += this.profile.last_name;
      return fullname;
    }
  },
  methods: {
    ...mapActions(['getGeolocation', 'getProfile']),
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
