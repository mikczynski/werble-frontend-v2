<template>
<ul  >
<li v-for="event in eventList" :key="event" >
  <p><strong>Name: </strong> {{event.name}}</p>
  <p><strong>Description: </strong> {{event.description}}</p>
  <p><strong>Date: </strong> {{event.datetime}}</p>
  <p><strong>Distance: </strong> {{event.distance}} km</p>
  <Button>Participate!</Button>
</li>
</ul>
</template>

<script>
export default {
  name: "AvailableEvents",
  data(){
    return{
      eventList: this.$store.getters.events,
    }
  },
  computed: {},
    methods:{
      events(){
        console.log(this.eventList);

      }
    }
}
</script>

<style scoped>
ul{
  list-style: none;
}

li {
  display:block;
  border-top: 1px solid red;
  border-bottom: 1px solid red;
}

</style>