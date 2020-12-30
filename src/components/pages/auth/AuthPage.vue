<template>
  <!--  Server errors from response-->
  <InlineMessage severity="warn" v-if="responseErrorsObj">
    <p v-if="responseErrorsObj.message"> {{ responseErrorsObj.message }}</p>
    <ul v-for="errorGroups in responseErrorsObj.errors" v-bind:key="errorGroups">
      <li v-for="e in errorGroups" :key="e">{{ e }}</li>
    </ul>
  </InlineMessage>


  <!--  Show forms-->
  <login-form v-if="renderedPage === 'login'"></login-form>
  <register-form v-else-if="renderedPage === 'register'"></register-form>
  <reset-password-form v-else></reset-password-form>

  <!-- Show additional options -->
  <login-options-component v-if="renderedPage === 'login'"></login-options-component>
  <register-options-component v-else-if="renderedPage === 'register'"></register-options-component>
  <reset-password-options-component v-else></reset-password-options-component>



</template>

<script>
import LoginForm from "@/components/pages/auth/forms/LoginForm";
import RegisterForm from "@/components/pages/auth/forms/RegisterForm";
import ResetPasswordForm from "@/components/pages/auth/forms/ResetPasswordForm";
import LoginOptionsComponent from "@/components/pages/auth/components/LoginOptionsComponent";
import RegisterOptionsComponent from "@/components/pages/auth/components/RegisterOptionsComponent";
import ResetPasswordOptionsComponent from "@/components/pages/auth/components/ResetPasswordOptionsComponent";

export default {
  name: "AuthPage",
  components: {
    ResetPasswordOptionsComponent,
    RegisterOptionsComponent, LoginOptionsComponent, ResetPasswordForm, RegisterForm, LoginForm},
  data() {
    return {
      renderedPage: 'login',
      pageTitle: 'AuthPage',
      isLoading: false,
      responseErrorsObj: null
    }
  },
  watch:{
    $route: {
      immediate: true,
      handler(){
        switch (this.$route.name)
        {
          case 'login':
            this.renderedPage = 'login';
            this.pageTitle = 'Login';
            break;
          case 'register':
            this.renderedPage = 'register';
            this.pageTitle = 'Register';
            break;
          case 'reset-password':
            this.renderedPage = 'reset-password';
            this.pageTitle = 'Reset Password';
            break;

          default:
            this.renderedPage = 'login'; break;
        }
      }
    }
  }
}
</script>

<style>
span {
  font-size: 0.9rem;
}

.center {
  text-align: center;
}

.center span {
  margin: 0 1rem;
  display: inline-block;
  font-size: 0.9rem;
}

form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

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

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

</style>