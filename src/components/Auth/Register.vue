<template>
  <div>
    <h1 class="title">Register</h1>
    <form id="registration_form" @submit.prevent="register">
      <div class="field">
        <label class="label">Email</label>
        <div class="control has-icons-left">
          <input type="text" v-model="email" placeholder="email" class="input">
          <span class="icon is-small is-left">
            <i class="fa fa-user"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Password</label>
        <div class="control has-icons-left">
          <input type="password" v-model="password" placeholder="password" class="input">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <label class="label">Confirm Password</label>
        <div class="control has-icons-left">
          <input type="password" v-model="password_confirm" placeholder="password" :class="{ 'is-danger': !passwordConfirmValid}" class="input">
          <span class="icon is-small is-left">
            <i class="fa fa-key"></i>
          </span>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input type="submit" value="Register" class="button">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data: function () {
    return {
      email: '',
      password: '',
      password_confirm: ''
    }
  },
  computed: {
    passwordConfirmValid: function () {
      return this.password === this.password_confirm
    }
  },
  methods: {
    register: function () {
      if (this.passwordConfirmValid) {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            this.$router.replace('admin')
          },
          (err) => {
            alert(err.message)
          }
        )
      }
    }
  }
}
</script>