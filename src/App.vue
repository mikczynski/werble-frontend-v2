<template>
  <the-header></the-header>

  <the-info></the-info>

  <loading
      :active="isApiSyncActive"
      :is-full-page="fullPage">
  </loading>

  <the-container>
    <router-view></router-view>
  </the-container>

  <the-footer></the-footer>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";
import TheContainer from "@/components/layout/TheContainer";
import TheFooter from "@/components/layout/TheFooter";
import Loading from 'vue3-loading-overlay';
// Import stylesheet
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css'
import TheInfo from '@/components/layout/TheInfo'
import {mapActions} from 'vuex'

export default {
  name: 'App',
  components: {
    TheInfo,
    TheFooter,
    TheContainer,
    TheHeader,
    Loading
  },
  created() {
    console.log(JSON.parse(localStorage.getItem('token')))
    if(localStorage.getItem('token'))
    {
      this.$store.commit('setToken',JSON.parse(localStorage.getItem('token')));
      this.$store.dispatch('getProfile');
    }
    else
      this.$router.push('login');
  },
  mounted() {
    this.getEventTypes();
  },

  computed: {
    isApiSyncActive() {
      return this.$store.getters.isApiSyncActive;
    },
    fullPage() {
      return true;
    }
  },
  watch: {
    isApiSyncActive() {
    },
  }  ,
  methods: {
    ...mapActions(['getGeolocation','getProfile','getEventTypes']),
  }
}

</script>

<style>
/* PrimeVue & PrimeFlex css imports */
@import '~primevue/resources/themes/md-light-indigo/theme.css';
@import '~primevue/resources/primevue.min.css';
@import '~primeicons/primeicons.css';
@import '~primeflex/primeflex.css';


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
