<template>
  <div>
    <h1 class="title" style="text-align: center">Sign In</h1>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
        <form @submit.prevent="signIn">
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
            <div class="control">
              <input class="button is-primary" type="submit" value="Sign In" />
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
  name: 'SignIn',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn () {
      // Attempt to sign in user by email and password
      firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          // Programmatically redirect to Admin view
          user => this.$router.replace('admin'),
          // or log error on failure
          err => console.error(err)
        )
    }
  }
}
</script>

<style>

</style>
