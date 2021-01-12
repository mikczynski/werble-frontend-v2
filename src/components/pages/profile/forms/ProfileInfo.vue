<template>
  <div class="p-d-block p-mx-auto">
    <Fieldset class="p-p-2 p-my-2 p-mx-auto"  style="width:50vw">
      <template #legend>
        Account info
      </template>
      <div class="p-field">
        <label for="login">Login:</label>
        <InputText id="login" v-model="profile.login" disabled type="text"/>
      </div>
      <div class="p-field">
        <label for="email">Email:</label>
        <InputText id="email" v-model="profile.email" disabled type="email"/>
      </div>
      <div class="p-field">
        <label for="account_type">Account type:</label>
        <InputText id="account_type" disabled type="text"  :modelValue="profile.is_admin ? 'Admin' : 'User'" />
      </div>

    </Fieldset>
  </div>

  <div class="p-fluid p-mx-auto">
    <form @submit.prevent="submitForm">
      <Fieldset class="p-p-2 p-mx-auto"  style="width:50vw ">
        <template #legend>
          Profile info
        </template>
        <div class="p-field">
          <label for="first_name">First name:</label>
          <InputText id="first_name" v-model="profile.first_name" :disabled="!toggleEditSwitch" type="text"/>
          <InlineMessage v-if="errors.first_name">{{ errors.first_name }}</InlineMessage>
        </div>
        <div class="p-field">
          <label for="last_name">Last name:</label>
          <InputText id="last_name" v-model="profile.last_name" :disabled="!toggleEditSwitch" type="text"/>
          <InlineMessage v-if="errors.last_name">{{ errors.last_name }}</InlineMessage>
        </div>
        <div class="p-field">
          <label for="birth_date">Birth date:</label>
          <InputText id="birth_date" v-model="profile.birth_date" :disabled="!toggleEditSwitch" type="date" :max="maxDate"/>
          <InlineMessage v-if="errors.birth_date">{{ errors.birth_date }}</InlineMessage>
        </div>
        <div class="p-field">
          <label for="description">Description:</label>
          <Textarea id="description" v-model="profile.description" :disabled="!toggleEditSwitch"/>
          <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
        </div>

        <div class="p-field p-grid p-mx-auto p-ac-center">
          <div class="p-col-1">
            <Button @click="refreshProfile"  class="p-button-outlined" icon="pi pi-refresh"  content="Refresh events"/>
          </div>
          <div class="p-col">
            <Button :disabled="!toggleEditSwitch" class="p-d-block p-mx-auto" type="submit">
              {{ toggleEditSwitch ? "Save profile" : "Edit profile" }}
            </Button>
          </div>




        </div>
        <div class="p-field">
          <label for="toggleEdit">Editing profile: </label>
          <InputSwitch id="toggleEdit" v-model="toggleEditSwitch" class="p-mx-auto" @click="toggleEdit"/>
        </div>

      </Fieldset>

    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  components: {},
  data() {
    return {
      maxDate: null,
      minYear: null,
      maxYear: null,
      requestErrors: null,
      isLoading: false,
      profile: {
        login: '',
        email: '',
        first_name: '',
        last_name: '',
        description: '',
        birth_date: '',
        is_admin: null,
      },
      errors: {
        first_name: '',
        last_name: '',
        description: '',
        birth_date: ''
      },
      toggleEditSwitch: false
    }
  },

  methods: {
    ...mapActions([
      'getProfile',
      'editProfile',
    ]),

    formatDate(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (month < 10) {
        month = '0' + month;
      }

      if (day < 10) {
        day = '0' + day;
      }
      return date.getFullYear() + '-' + month + '-' + day;
    },

    refreshProfile(){
        this.getProfile();
      if(this.$store.getters.profile)
        this.$toast.add(
            {severity:'info', summary: 'Info Message', detail:'Profile refreshed', life: 3000}
        );
    },

    async submitForm() {
      if (!this.toggleEditSwitch) return;
      this.checkForm();
      if (this.errors.any) return;

      const formData = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        description: this.profile.description,
        birth_date: this.profile.birth_date,
      };

      console.log(formData.birth_date);
      await this.editProfile(formData);
      if(this.$store.getters.profile)
        this.$toast.add(
            {severity:'success', summary: 'Success Message', detail:'Profile updated', life: 3000}
            );
    },
    resetFormErrors() {
      this.errors.any = false;
      this.errors.first_name = '';
      this.errors.last_name = '';
      this.errors.description = '';
      this.errors.birth_date = '';
    },

    checkForm() {
      this.resetFormErrors();
      //first name
      if (this.profile.first_name === '') {
        this.errors.first_name = 'First name field is required. ';
      }

      //last name
      if (this.profile.last_name === '') {
        this.errors.last_name = 'Last name field is required. ';
      }

      //password
      // if (this.profile.description === '') {
      //   this.errors.description = 'Description field is required. ';
      // }

      if (this.profile.birth_date === '') {
        this.errors.birth_date = 'Birth date field is required. ';
      }

      if (this.errors.first_name !== '' || this.errors.last_name !== ''
          || this.errors.description !== '' || this.errors.birth_date )
        this.errors.any = true;
    },

    toggleEdit() {
      this.toggleEditSwitch = !this.toggleEditSwitch;
    },

    setProfile() {
      this.profile = this.$store.getters.profile;
      console.log(this.$store.getters.profile);
    },

    async setupProfile() {
      await this.getProfile();
      this.setProfile();
    }
  }
  ,
  computed: {
    yearRange(){
      return this.minYear +':' +this.maxYear
    }

  },
  created() {
    this.setupProfile();
    let today = new Date();
    this.maxYear = today.getFullYear();
    this.minYear = today.maxYear - 100;
    this.maxDate = this.formatDate(today);
  }
};
</script>

<style scoped>
/*label {*/
/*  font-weight: bold;*/
/*  margin-bottom: 0.5rem;*/
/*  display: block;*/
/*}*/

/*input,*/
/*textarea {*/
/*  display: block;*/
/*  width: 100%;*/
/*  font: inherit;*/
/*  border: 1px solid #ccc;*/
/*  padding: 0.15rem;*/
/*}*/

/*textarea:disabled,*/
/*input:disabled {*/
/*  opacity: 0.6;*/
/*  color: #3d008d;*/
/*}*/

/*input:focus,*/
/*textarea:focus {*/
/*  border-color: #3d008d;*/
/*  background-color: #faf6ff;*/
/*  outline: none;*/
/*}*/
</style>
