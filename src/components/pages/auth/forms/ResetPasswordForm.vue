<template>
  <p>To reset password provide yours account email.</p>

  <form @submit.prevent="submitForm">
    <div class="p-fluid">
      <div class="p-field">
        <label for="email">Email:</label>
        <InputText id="email" type="text" v-model="input.email"/>
        <InlineMessage v-if="errors.email">{{ errors.email }}</InlineMessage>
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
export default {
  name: "ResetPasswordForm",
  data() {
    return {
      input: {
        email: '',
      },
      errors: {
        email: '',
        any: false
      },
    }
  },
  computed:{
    submitButtonText(){
      return this.isApiSyncActive ? "Loading..." : "Reset password";
    },
    submitButtonClass(){
      return {'p-button-outlined': this.isApiSyncActive};
    },
    isApiSyncActive() {
      return this.$store.getters.isApiSyncActive;
    }

  },
  methods:{
    /* Form submit function*/
    async submitForm(){
      this.requestErrors = '';
      this.checkForm();
      if(this.errors.any) return;

      console.log('login submit');
      const email = this.input.email;

      this.isApiSyncActive = true;
      this.requestErrorsObj = await this.$store.dispatch('resetPassword',email);
      this.isApiSyncActive = false;
      this.$emit('clicked')
    },

    /* Validation functions */
    checkEmail() {
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return regex.test(this.input.email)
    },
    checkForm(){
      this.errors.any = false;
      this.errors.email= '';

      //email
      if (this.input.email === '')
        this.errors.email += 'Email field is required. ';

      if (!this.checkEmail())
        this.errors.email += 'Please input valid email address.';

      if(this.errors.email !== '')
        this.errors.any = true;
    }

  }
}
</script>

<style scoped>

</style>