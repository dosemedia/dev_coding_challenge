<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <div class="tabs is-centered is-fullwidth">
              <ul>
                <li :class="{'is-active': isActive === 'login'}"
                    @click="onSelect('login')">
                  <a class="has-text-grey">Log in</a>
                </li>
                <li :class="{'is-active': isActive === 'signup'}"
                    @click="onSelect('signup')">
                  <a class="has-text-grey">Sign up</a>
                </li>
              </ul>
            </div>

            <form v-if="isActive === 'login'">
              <div class="field">
                <div class="control has-icons-left">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <input class="input"
                         type="email"
                         placeholder="Your email"
                         v-model="user.email">
                </div>
              </div>

              <div class="field">
                <div class="control has-icons-left">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input class="input"
                         type="password"
                         placeholder="Your password"
                         v-model="user.password">
                </div>
              </div>
              <button class="button is-primary is-fullwidth"
                      @click.prevent="onLogin">
                Log in
              </button>
            </form>

            <form v-if="isActive === 'signup'">
              <div class="field">
                <div class="control has-icons-left">
                  <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                  </span>
                  <input class="input"
                         type="email"
                         placeholder="Email"
                         v-model="user.email">
                </div>
              </div>
              <div class="field">
                <div class="control has-icons-left">
                  <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input class="input"
                         type="password"
                         placeholder="Password"
                         v-model="user.password">
                </div>
              </div>
              <div class="field">
                <div class="control"
                     :class="{'has-icons-left': passwordsMatch}">
                  <span v-if="passwordsMatch"
                        class="icon is-small is-left has-text-success">
                    <i class="fas fa-check"></i>
                  </span>
                  <input class="input"
                         :class="{'is-success': passwordsMatch}"
                         type="password"
                         placeholder="Confirm password"
                         v-model="user.confirmationPassword">
                </div>
                <p v-if="passwordsMatch"
                   class="help is-success">Passwords match</p>
              </div>
              <button class="button is-primary is-fullwidth"
                      @click.prevent="onSignup">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      isActive: 'login',
      user: {
        email: '',
        password: '',
        confirmationPassword: '',
      },
    };
  },

  computed: {
    passwordsMatch() {
      return (
        this.user.password &&
        this.user.confirmationPassword &&
        this.user.password === this.user.confirmationPassword
      );
    },
  },

  methods: {
    onSelect(tabName) {
      this.isActive = tabName;
      this.user.email = '';
      this.user.password = '';
      this.user.confirmationPassword = '';
    },

    onSignup() {
      if (this.passwordsMatch) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then(() => {
            this.$router.replace('/admin');
          })
          .catch((error) => { console.error(error); });
      }
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

<style scoped>
button {
  margin-top: 2rem;
}
</style>

