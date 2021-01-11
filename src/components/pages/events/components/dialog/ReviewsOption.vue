<template>


    <Button @click="toggleAddReview" v-if="!event.status && !addReview && event_participant_id"
    :class="addReview ? 'p-button-outlined' : 'p-button-secondary'"

            style="float:left">
      {{ event_review_id && !addReview ? 'Edit review' : 'Add review' }}
    </Button>

    <Button @click="toggleAddReview" v-if=" !event.status && addReview && event_participant_id"
            :class="addReview ? 'p-button-outlined p-button-secondary' : 'p-button'"

            style="float:left">
       Show reviews
    </Button>



  <DataTable :value="reviews" :paginator="true" :rows="10"
             paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
             :rowsPerPageOptions="[10,20,50]"
             currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
             class="p-datatable-sm p-datatable-striped"
             sortField="username" :sortOrder="1"
             removableSort
             dataKey="event_id"
             :filters="filters"
             v-if="!addReview"
  >

    <template #header>
      <div>
        <span>In total there are <span style="color:green">{{ reviews ? reviews.length : 0 }}</span> reviews.</span>
      </div>
    </template>

    <template #empty>
      No reviews found.
    </template>

    <template #loading>
      Loading reviews data. Please wait.
    </template>


    <ColumnGroup type="header">
      <Row>
        <Column header="Username" field="login" :rowspan="2" :sortable="true"/>
        <Column header="Review" :colspan="2"/>
      </Row>
      <Row>
        <Column header="Rating" field="rating" :sortable="true"/>
        <Column header="Content" field="content"/>
      </Row>
    </ColumnGroup>


    <Column field="login" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.login }}
      </template>
    </Column>


    <Column field="rating" :sortable="true">
      <template #body="slotProps">
        <rating readonly :modelValue="slotProps.data.rating" :cancel="false"/>
      </template>
    </Column>

    <Column field="content" :sortable="true">
      <template #body="slotProps">
        {{ slotProps.data.content }}
      </template>
    </Column>




    <template #footer>
      <span>In total there are <span style="color:green">{{ reviews ? reviews.length : 0 }}</span> reviews.</span>
    </template>
    <template #paginatorLeft>
      <Button @click="getEvent(event.event_id) || pushReviews()" icon="pi pi-refresh" class="p-button-sm" content="Refresh events"/>
    </template>
    <template #paginatorRight>

    </template>
  </DataTable>


  <form v-if="addReview && !event.status" @submit.prevent="event_review_id ? editReviewButton() : createReviewButton()">
    <h2>{{ event_review_id ? 'Edit' : 'New' }} event review</h2>

        <div class="p-field">
          <label class="p-d-block" for="rating">Choose rating:</label>
          <Rating class="p-ml-2" id="rating" v-model="input.rating" :cancel="false"/>
        </div>

      <div class="p-field">
        <label for="content">Review content:</label>
        <Textarea id="content" v-model="input.content"/>
      </div>

      <Button type="submit"
              :class="event_review_id ?  'p-button-info': 'p-button-success ' ">

        {{ event_review_id ? 'Edit review' : 'Add review' }}
      </Button>


    <Button @click="deleteReviewButton"
        v-if="event_review_id" type="button"
            class="p-button-danger p-button-outlined"
            style="float:right"
    >
      Delete review
    </Button>

  </form>


</template>

<script>
import {mapActions,mapGetters} from 'vuex'

export default {
  name: "ReviewsOption",
  props: ['event'],
  watch:{
    event_review_id(){},
    event_participant_id(){}
  },
  data() {
    return {
      eventLocal: this.event,
      input: {
        content: '',
        rating: 5,
      },
      event_review_id: null,
      event_participant_id: null,
      reviews: [],
      filters: {},
      addReview: false,
    }
  },

  computed:{
    ...mapGetters(['user_id'])
  },

  methods:
      {
        ...mapActions(['getEvent','createReview','editReview','deleteReview']),

        pushReviews() {
          if (this.event.participants)
            this.reviews = [];
            this.event.participants.forEach((p) => {
              if (p.review) {
                let review = p.review;
                review['login'] = p.user.login;
                review['user_id'] = p.user_id;
                review['event_id'] = p.event_id;
                this.reviews.push(p.review);
              }
            });
        },


        toggleAddReview(){
          this.addReview = !this.addReview;
        },



        checkIfParticipating() {
          this.event_participant_id = null;
          for (const participant of this.event.participants)
            if (this.user_id === participant.user_id) {
              this.event_participant_id = participant.event_participant_id;
              console.log('participating');
              return true;

            }
          // console.log(participant);
          return false;
        },

        checkIfReviewExists(){
          this.event_review_id = null;
          this.reviews.forEach((r)=>{
            if(r.event_participant_id === this.event_participant_id){
              this.event_review_id = r.event_review_id;
              console.log(r.event_review_id);
              return true;
            }
          });
          return false;
        },


        async createReviewButton(){
          const form_data = {
            content: this.input.content,
            rating: this.input.rating,
            event_id: this.event.event_id
          }

          console.log()
          console.log('create_review')
          await this.createReview(form_data);

          this.$toast.add(
              {severity:'success', summary: 'Success Message', detail:'Review created', life: 3000}
          );

          await this.getEvent(this.event.event_id)
          this.toggleAddReview();
          this.pushReviews();
          this.checkIfReviewExists()
          this.checkIfParticipating();
        },

        async editReviewButton(){
          const form_data = {
            content: this.input.content,
            rating: this.input.rating,
          }
          const payload = {
            form_data, event_id:this.event.event_id
          }

          await this.editReview(payload);
          await this.getEvent(this.event.event_id)

          this.toggleAddReview();
          this.pushReviews();
          this.checkIfReviewExists()
          this.checkIfParticipating();


          this.$toast.add(
              {severity:'success', summary: 'Success Message', detail:'Review edited', life: 3000}
          );
        },

          async deleteReviewButton(){

            await this.deleteReview(this.event_participant_id);
            await this.getEvent(this.event.event_id)

            this.toggleAddReview();
            this.pushReviews();
            this.checkIfReviewExists()
            this.checkIfParticipating();

            this.$toast.add(
                {severity:'success', summary: 'Success Message', detail:'Review deleted', life: 3000}
            );

        }



        },



  mounted() {
    this.pushReviews();
    this.checkIfParticipating();
    this.checkIfReviewExists()
  }
}
</script>

<style scoped>

</style>
