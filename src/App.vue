<template>
  <router-view></router-view>
</template>

<script>
export default {
  mounted() {
    firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          return this.$router.replace('/admin');
        }
        return this.$router.replace('/auth');
      });
  },
};
</script>
