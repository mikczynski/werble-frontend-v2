<template>
  <div class="p-fluid">
    <Fieldset class="p-p-2 p-my-2">
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

  <div class="p-fluid">
    <form @submit.prevent="submitForm">
      <Fieldset class="p-p-2">
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
          <InputText id="birth_date" v-model="profile.birth_date" :disabled="!toggleEditSwitch" type="date"/>
          <InlineMessage v-if="errors.birth_date">{{ errors.birth_date }}</InlineMessage>
        </div>
        <div class="p-field">
          <label for="description">Description:</label>
          <Textarea id="description" v-model="profile.description" :disabled="!toggleEditSwitch"/>
          <InlineMessage v-if="errors.description">{{ errors.description }}</InlineMessage>
        </div>
        <div class="p-field p-mx-auto" style="max-width: 10rem">
          <Button :disabled="!toggleEditSwitch" class="p-d-block p-mx-auto" type="submit">
            {{ toggleEditSwitch ? "Save profile" : "Edit profile" }}
          </Button>
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
      requestErrors: null,
      isLoading: false,
      profile: {
        login: '',
        email: '',
        first_name: '',
        last_name: '',
        description: '',
        birth_date: '',
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
      'editProfile'
    ]),

    async submitForm() {
      if (!this.toggleEditSwitch) return;
      this.checkForm();
      if (this.errors.any) return;

      const formData = {
        first_name: this.profile.first_name,
        last_name: this.profile.last_name,
        description: this.profile.description,
        birth_date: (this.profile.birth_date).toString(),
      };

      console.log(formData.birth_date);
      this.editProfile(formData);
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
      if (this.profile.description === '') {
        this.errors.description = 'Description field is required. ';
      }

      if (this.errors.first_name !== '' || this.errors.last_name !== ''
          || this.errors.description !== '')
        this.errors.any = true;
    },

    toggleEdit() {
      this.toggleEditSwitch = !this.toggleEditSwitch;
    },

    setProfile() {
      this.profile = this.$store.getters.profile;
    },

    async setupProfile() {
      await this.getProfile();
      this.setProfile();
    }
  }
  ,
  computed: {
  },
  created() {
    this.setupProfile();
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
