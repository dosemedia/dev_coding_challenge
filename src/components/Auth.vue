<template>
  <div class="login">

    <div class="login-tabs tabs is-centered" >
       <ul>
          <li
              :class="{ 'is-active': showSignIn }">
              <a @click="showSignIn = true">
              Sign In
              </a>
          </li>
          <li
             :class="{ 'is-active': !showSignIn }">
             <a @click="showSignIn = false">
             Sign Up
             </a>
          </li>
      </ul>
    </div>

    <div class="login-panel">
      <div v-if="showSignIn">
          <SignIn />
      </div>
      <div v-else>
          <SignUp />
      </div>
    </div>

  </div>
</template>

<script>
import SignIn from './SignIn'
import SignUp from './SignUp'
export default {
  name: 'Auth',
  components: {
    SignIn,
    SignUp
  },
  data () {
    return {
      showSignIn: true
    }
  }
}
</script>

<style>

</style>
