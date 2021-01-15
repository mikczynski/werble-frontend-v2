<template>
  <form @submit.prevent="submitForm">
    <div class="p-fluid">
      <div class="p-field">
        <label for="login">Login:</label>
        <InputText id="login" type="text" v-model="input.login" placeholder="Login"/>
        <InlineMessage v-if="errors.login">{{ errors.login }}</InlineMessage>
      </div>
      <div class="p-field">
        <label for="email">Email:</label>
        <InputText id="email" type="text" v-model="input.email" placeholder="Email"/>
        <InlineMessage v-if="errors.email">{{ errors.email }}</InlineMessage>
      </div>
      <div class="p-field">
        <label for="password">Password:</label>
        <InputText id="password" type="password" v-model="input.password" placeholder="Password"/>
        <InlineMessage v-if="errors.password">{{ errors.password }}</InlineMessage>
      </div>
      <div class="p-field">
        <label for="password_confirmation">Confirm password:</label>
        <InputText
            id="password_confirmation"
            type="password"
            placeholder="Password confirmation"
            v-model="input.password_confirmation"
        />
        <InlineMessage v-if="errors.password_confirmation">{{ errors.password_confirmation }}</InlineMessage>
      </div>

      <div class="p-field p-grid">
        <div class="p-col">
          <Button type="submit" :class="submitButtonClass" :label="submitButtonText" :disabled="isApiSyncActive"/>
        </div>
        <div class="p-col" v-if="!isApiSyncActive">
          <Button
              type="reset"
              class="p-button-info p-button-text"
              label="Reset"
              @click="resetFormErrors"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      input: {
        login: "",
        email: "",
        password: "",
        password_confirmation: "",
      },
      errors: {
        login: '',
        email: '',
        password: '',
        password_confirmation: '',
        any: false
      },
    }
},
  computed: {
    submitButtonText() {
      return this.isApiSyncActive ? "Loading..." : "Submit";
    },
    submitButtonClass() {
      return {'p-button-outlined': this.isApiSyncActive};
    },
    inputLoginClass(){
      return { 'p-invalid' : this.errors.login !== ''};
    },
    inputPasswordClassClass(){
      return { 'p-invalid' : this.errors.password !== ''};
    },
    inputPasswordConfirmationClass(){
      return { 'p-invalid' : this.errors.password_confirmation !== ''};
    },
    inputEmailClass(){
      return { 'p-invalid' : this.errors.email !== ''};
    },
    isApiSyncActive() {
      return this.$store.getters.isApiSyncActive;
    }
  },
  methods: {
    resetFormErrors(){
      this.errors.any = false;
      this.errors.login = '';
      this.errors.email = '';
      this.errors.password = '';
      this.errors.password_confirmation = '';
    },
    checkEmail() {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(this.input.email)
    },
    async submitForm() {

      this.requestErrors = '';
      this.checkForm();
      if (this.errors.any) return;

      this.isLoading = true;
      const formData = {
        login: this.input.login,
        email: this.input.email,
        password: this.input.password,
        password_confirmation: this.input.password_confirmation,
      };
      this.requestErrorsObj = await this.$store.dispatch("register", formData);
      this.isLoading = false;

    },
    checkForm() {
      this.resetFormErrors();
      //login
      if (this.input.login === '') {
        this.errors.login += 'Login field is required. ';
      }

      if (this.input.login.length < 4) {
        this.errors.login += 'Login must be at least 4 characters long.';
      }

      //email
      if (this.input.email === '')
        this.errors.email += 'Email field is required. ';

      if (!this.checkEmail())
        this.errors.email += 'Please input valid email address.';

      //password
      if (this.input.password === '') {
        this.errors.password += 'Password field is required. ';
      }

      if (this.input.password.length < 8) {
        this.errors.password += 'Password  must be at least 8 characters long.';
      }

      //password_confirmation
      if (this.input.password_confirmation === '')
        this.errors.password_confirmation += 'Password confirmation field is required. ';

      if (this.input.password_confirmation !== this.input.password)
        this.errors.password_confirmation += 'Passwords confirmation does not match';


      if (this.errors.login !== '' || this.errors.password !== ''
          || this.errors.email !== '' || this.errors.password_confirmation !== '')
        this.errors.any = true;
    }
  },
}
</script>

<style scoped>

</style>
