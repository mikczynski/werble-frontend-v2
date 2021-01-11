<template>

  <form @submit.prevent>
      <div class="p-field">
        <label for="email">Change your email:</label>
        <InputText id="email" v-model="email" type="text"/>
<!--        <InlineMessage v-if="email">{{ errors.first_name }}</InlineMessage>-->
      </div>

    <Button @click="changeEmailButton">Change email</Button>
  </form>

<form @submit.prevent>
  <div class="p-field">
    <label for="password">Change your password:</label>
    <InputText id="password" v-model="password" type="password"/>
<!--    <InlineMessage v-if="errors.first_name">{{ errors.first_name }}</InlineMessage>-->
  </div>
  <Button @click="changePasswordButton">Change password</Button>
  </form>

</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: "Settings",
  data() {
  return {
    email: '',
    password: ''
  }
},
  methods:{
    ...mapActions(['changePassword','changeEmail']),
    async changePasswordButton(){
      await this.changePassword({password: this.password});
      this.$toast.add(
          {severity:'info', summary: 'Info Message', detail:'Password changed', life: 3000}
      );
    },

    async changeEmailButton(){
      await this.changeEmail({email: this.email});
      this.$toast.add(
          {severity:'info', summary: 'Info Message', detail:'Email changed', life: 3000}
      );
    },

  }


}
</script>

<style scoped>

</style>
