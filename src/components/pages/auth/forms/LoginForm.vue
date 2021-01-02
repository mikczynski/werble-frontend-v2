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
        <Button type="submit" :class="submitButtonClass" class="p-d-block p-mx-auto" :disabled="isApiSyncActive">
          {{ submitButtonText }}
        </Button>
      </div>
    </div>

  </form>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

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
    ...mapGetters([
        'isApiSyncActive',
        'responseError'
    ]),
    submitButtonText() {
      return this.isApiSyncActive ? "Loading..." : "Log in";
    },
    submitButtonClass() {
      return {'p-button-outlined': this.isApiSyncActive};
    },
    inputLoginClass() {
      return {'p-invalid': this.errors.login !== ''};
    },
    inputPasswordClass() {
      return {'p-invalid': this.errors.password !== ''};
    },
    // isApiSyncActive() {
    //   return this.$store.getters.isApiSyncActive;
    // },

  },
  methods: {
    ...mapActions([
        'setIsApiSyncActive',
        'setResponseError'
    ]),
    async submitForm() {
      this.setResponseError('');
      this.checkForm();
      if (this.responseError) return;

      console.log('(login form)login submit');

      const credentials = {
        login: this.input.login,
        password: this.input.password
      };
      this.setIsApiSyncActive(true);

      const requestErrorsObj = await this.$store.dispatch('login', credentials);

      this.isLoading = false;
      this.$emit('onResponse', requestErrorsObj);
    },

    resetFormErrors() {
      this.errors.any = false;
      this.errors.login = '';
      this.errors.password = '';
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