<template>
<div>test</div>
</template>

<script>
import { mapActions,mapGetters } from 'vuex';
export default {

  name: "CreatedEventsPage",
  data(){
    return {
          eventsLocal: null,
          filters: {},
    }
  },
  computed: {
    ...mapGetters([
        'createdEvents',
        'searchDistance'
    ]),
  },
    methods:{
      ...mapActions([
          'getCreatedEvents'
      ]),
    },
  mounted() {
    this.getCreatedEvents();
    this.eventsLocal = this.createdEvents;
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
