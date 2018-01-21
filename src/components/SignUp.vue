<template>
  <div>
    <h1 class="title">Sign Up</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevent="signUp">
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input class="input" type="text" placeholder="Email" v-model="email">
            </div>
          </div>
          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input class="input" type="password" placeholder="Password" v-model="password">
            </div>
          </div>
          <div class="field">
            <label class="label">Password Confirmation</label>
            <div class="control">
              <input class="input" type="password" placeholder="Password Confirmation" v-model="passwordConfirm">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="button is-primary" type="submit" value="Sign Up" />
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { firebaseApp } from '../firebase'
export default {
  name: 'SignUp',
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: ''
    }
  },
  methods: {
    signUp () {
      // Check for matching password confirmation
      if (this.passwordConfirmation) {
        // Attempt to sign up user by email and password
        firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(
            // Programmatically redirect to Admin view
            user => this.$router.replace('admin'),
            // or log error on failure
            err => console.error(err)
          )
      }
    }
  },
  computed: {
    passwordConfirmation () {
      return this.password === this.passwordConfirm
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
  }
</style>
