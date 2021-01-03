<script>
import api from '@/api'
import { ref } from  'vue'

export default {
setup (props){
  const events = ref([]);
  const getEvents = async () => {
    events.value = await api.events.getCreatedEvents();
  }
}



}
</script>