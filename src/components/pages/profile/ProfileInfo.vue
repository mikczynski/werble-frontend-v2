<template>
  <!--  <InlineMessage severity="warn" v-if="requestErrorsObj">-->
  <!--    <p v-if="requestErrorsObj.message"> {{ requestErrorsObj.message }}</p>-->
  <!--    <ul v-for="errorGroups in requestErrorsObj.errors" v-bind:key="errorGroups">-->
  <!--      <li v-for="e in errorGroups" :key="e">{{ e }}</li>-->
  <!--    </ul>-->
  <!--  </InlineMessage>-->
  <div class="p-fluid">

    <Fieldset class="p-p-2">
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
    </Fieldset>

  </div>
  <form @submit.prevent="submitForm">
    <Fieldset class="p-p-2 p-my-2">
      <template #legend>
        Profile info
      </template>
      <div class="p-field">
        <label for="first_name">First name:</label>
        <InputText id="first_name" v-model="profile.first_name" :disabled="!toggleEditSwitch" type="text"/>
      </div>
      <div class="p-field">
        <label for="last_name">Last name:</label>
        <InputText id="last_name" v-model="profile.last_name" :disabled="!toggleEditSwitch" type="text"/>
      </div>
      <div class="p-field">
        <label for="birth_date">Birth date:</label>
        <InputText id="birth_date" v-model="profile.birth_date" :disabled="!toggleEditSwitch" type="date"/>
      </div>
      <div class="p-field">
        <label for="description">Description:</label>
        <Textarea id="description" v-model="profile.description" :disabled="!toggleEditSwitch"/>
      </div>
      <div class="p-field p-mx-auto" style="max-width: 10rem">
        <Button :disabled="!toggleEditSwitch" class="p-d-block p-mx-auto" type="submit"> {{ toggleEditSwitch ?  "Save profile" : "Edit profile" }}
        </Button>
      </div>
      <div class="p-field">
        <label for="toggleEdit">Editing profile: </label>
        <InputSwitch id="toggleEdit" v-model="toggleEditSwitch" class="p-ml-2" @click="toggleEdit"/>
      </div>

    </Fieldset>

  </form>

</template>

<script>

export default {
  components: {},
  data() {
    return {
      requestErrors: null,
      isLoading: false,
      profile: {
        login: null,
        email: null,
        first_name: null,
        last_name: null,
        description: null,
        birth_date: null
      },
      errors:{
        first_name: '',
        last_name: '',
        description:'',
        birth_date: ''
      },
      toggleEditSwitch: false
    }
  },

  methods: {
    async submitForm() {
      if(!this.toggleEditSwitch) return;

      this.requestErrors = '';
      this.checkForm();
      if (this.errors.any) return;

      this.isLoading = true;
      const formData = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        description: this.profile.description,
        birth_date: (this.profile.birth_date).toString(),
      };
      console.log(formData.birth_date);
      this.requestErrorsObj = await this.$store.dispatch("editProfile", formData);
      this.isLoading = false;

    },
    checkForm() {
      //first name

      if (this.profile.first_name === '') {
        this.errors.first_name += 'First name field is required. ';
      }

      //last name
      if (this.profile.last_name === '') {
        this.errors.last_name += 'Last name field is required. ';
      }

      //password
      if (this.profile.description === '') {
        this.errors.description += 'Description field is required. ';
      }


      if (this.errors.first_name !== '' || this.errors.last_name !== ''
          || this.errors.description !== '')
        this.errors.any = true;
    },
    toggleEdit() {
      this.toggleEditSwitch = !this.toggleEditSwitch;
      console.log(this.toggleEditSwitch);
    },
    setProfile() {
      this.profile = this.$store.getters.profile;
    },
    async getProfile() {
      await this.$store.dispatch('getProfile');
      this.setProfile();
    }
  }
  ,
  computed: {},
  mounted() {
    this.getProfile();
    this.setProfile();
  }
};
</script>

<style scoped>
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

textarea:disabled,
input:disabled {
  opacity: 0.6;
  color: #3d008d;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
