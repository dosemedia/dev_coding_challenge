<template>
  <nav class="navbar is-primary">
    <div class="navbar-end">
      <div class="navbar-item has-dropdown is-hoverable">
        <a class="navbar-link"
           href="/documentation/overview/start/">
          {{ userEmail }}
        </a>
        <div class="navbar-dropdown is-boxed">
          <a class="navbar-item"
             @click="onClickLogout">
            Log out
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    userEmail() {
      return firebase.auth().currentUser.email;
    },
  },

  methods: {
    onClickLogout() {
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

