<template>
  <button @click="logout" class="button is-text">Logout</button>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Logout',
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('auth')
      })
    }
  }
}
</script>