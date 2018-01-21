<template>
  <button @click="signOut" class="button is-danger">Sign Out</button>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Logout',
  methods: {
    signOut () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('auth')
      })
    }
  }
}
</script>

<style>
  button.is-danger {
    float: right;
  }
</style>
