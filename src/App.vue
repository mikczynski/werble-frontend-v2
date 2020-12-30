<template>
  <the-header></the-header>

  <the-container>
    <router-view></router-view>
  </the-container>

  <the-footer></the-footer>
</template>

<script>
import TheHeader from "@/components/layout/TheHeader";
import TheContainer from "@/components/layout/TheContainer";
import TheFooter from "@/components/layout/TheFooter";

export default {
  name: 'App',
  components: {
    TheFooter,
    TheContainer,
    TheHeader
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
  margin-top: 60px;
}
</style>
