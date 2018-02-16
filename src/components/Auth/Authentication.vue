<template>
  <div>

    <div class="tabs">
      <ul>
        <li :class="{'is-active': login}"><a @click="login = true">Login</a></li>
        <li :class="{'is-active': !login}"><a @click="login = false">Register</a></li>
      </ul>
    </div>

    <div>
      <div v-if="login">
        <Login></Login>
      </div>
      <div v-else>
        <Register></Register>
      </div>
    </div>

    <!-- <div>
      <div v-if="login">
        Don't have an account?
        <br/>
        <button @click="login = !login" class="button is-text is-small">Register</button>
      </div>
      <div v-else>
        Already have an account?
        <br/>
        <button @click="login = !login" class="button is-text is-small">Login</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import Login from './Login'
import Register from './Register'

export default {
  name: 'Authentication',
  components: {
    Login,
    Register
  },
  data: function () {
    return {
      login: true
    }
  }
}
</script>