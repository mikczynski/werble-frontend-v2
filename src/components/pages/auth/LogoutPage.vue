<template>
    <h2>{{pageTitle}}</h2>
    <p>{{ message }}</p>
<!--    <button @click="testAuth">test isAuth</button>-->

</template>

<script>

export default {
  data(){
    return {
      pageTitle: "Logged out",
      message: "You have been logged out!"
    }
  },
  methods: {
    testAuth() {
      console.log(this.$store.getters.isAuthenticated);
    },
  },
};
</script>

<style scoped>
p{
  text-align: center;
  color: #0a428b;
}
</style>