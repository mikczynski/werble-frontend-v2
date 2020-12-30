<template>
  <form @submit.prevent="submitForm">

    <div class="p-fluid">
      <div class="p-field">
        <label for="login">Login:</label>
        <InputText id="login" type="text" v-model="input.login" :class="inputLoginClass"/>
        <InlineMessage v-if="errors.login">{{ errors.login }}</InlineMessage>
      </div>

      <div class="p-field">
        <label for="password">Password:</label>
        <InputText id="password" type="password" v-model="input.password" :class="inputPasswordClass"/>
        <InlineMessage v-if="errors.password">{{ errors.password }}</InlineMessage>
      </div>

      <div class="p-field p-mx-auto" style="max-width: 10rem">
        <Button type="submit" :class="submitButtonClass" class="p-d-block p-mx-auto" :disabled="isLoading">
          {{ submitButtonText }}
        </Button>
      </div>
    </div>

  </form>
</template>

<script>
export default {
  name: "LoginForm",

  data() {
    return {
      input: {
        login: '',
        password: ''
      },
      errors: {
        login: '',
        password: '',
        any: false
      },
    }
  },
  computed: {
    submitButtonText() {
      return this.isLoading ? "Loading..." : "Log in";
    },
    submitButtonClass() {
      return {'p-button-outlined': this.isLoading};
    },
    inputLoginClass() {
      return {'p-invalid': this.errors.login !== ''};
    },
    inputPasswordClass() {
      return {'p-invalid': this.errors.password !== ''};
    }
  },
  methods: {
    resetFormErrors() {
      this.errors.any = false;
      this.errors.login = '';
      this.errors.password = '';
    },
    async submitForm() {
      this.requestErrors = '';
      this.checkForm();
      if (this.errors.any) return;

      console.log('login submit');
      const credentials = {
        login: this.input.login,
        password: this.input.password
      };

      this.isLoading = true;
      const requestErrorsObj = await this.$store.dispatch('login', credentials);
      this.isLoading = false;
      this.$emit('onResponse', requestErrorsObj);
    },
    checkForm() {
      this.resetFormErrors();
      //login
      if (this.input.login === '')
        this.errors.login += 'Login field is required. ';

      if (this.input.login.length < 4)
        this.errors.login += 'Login must be at least 4 characters long.';

      //password
      if (this.input.password === '')
        this.errors.password += 'Password field is required. ';

      if (this.input.password.length < 8)
        this.errors.password += 'Password  must be at least 8 characters long.';

      if (this.errors.login !== '' || this.errors.password !== '')
        this.errors.any = true;
    }

  }
}
</script>

<style scoped>

</style>