<template>
  <div>
    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input"
               type="email"
               placeholder="Email"
               v-model="user.email">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input"
               type="password"
               placeholder="Password"
               v-model="user.password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button"
                @click="onSignup()">
          Sign Up
        </button>
      </p>
    </div>

    <div class="field">
      <p class="control has-icons-left has-icons-right">
        <input class="input"
               type="email"
               placeholder="Email"
               v-model="user.email">
        <span class="icon is-small is-left">
          <i class="fa fa-envelope"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control has-icons-left">
        <input class="input"
               type="password"
               placeholder="Password"
               v-model="user.password">
        <span class="icon is-small is-left">
          <i class="fa fa-lock"></i>
        </span>
      </p>
    </div>
    <div class="field">
      <p class="control">
        <button class="button"
                @click="onLogin()">
          Log In
        </button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLogin: true,
      user: {
        email: '',
        password: '',
      },
    };
  },

  methods: {
    onSignup() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.replace('/admin');
        })
        .catch((error) => { console.error(error); });
    },

    onLogin() {
      console.log('clicked');
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
          this.$router.replace('/admin');
        })
        .catch((error) => { console.error(error); });
    },
  },
};
</script>
