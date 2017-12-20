<template>
  <div>
    <h1 class="title">Login</h1>
    <form id="login_form" @submit.prevent="login">
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
        <div class="control">
          <input type="submit" value="Login" class="button">
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
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
</script>