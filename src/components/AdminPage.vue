<template>
  <div>
    <h1>Admin</h1>
    <button @click="onLogout">Log Out</button>
  </div>
</template>

<script>
export default {
  methods: {
    onLogout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('/auth');
        });
    },
  },
};
</script>

