<template>
<ul  >
<li v-for="event in createdEventsList" :key="event" >
  <p><strong>Name: </strong> {{event.name}}</p>
  <p><strong>Description: </strong> {{event.description}}</p>
  <p><strong>Date: </strong> {{event.datetime}}</p>
  <p><strong>Distance: </strong> {{event.distance}} km</p>
  <Button>Delete</Button>  <Button>Change status</Button>

</li>
</ul>
</template>

<script>
export default {
  name: "CreatedEvents",
  data(){
    return{
      createdEventsList: this.$store.getters.createdEvents,
    }
  },
  created(){
    this.$store.dispatch('getCreatedEvents');
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