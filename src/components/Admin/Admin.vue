<template>
  <div>
    <router-link :to="{ name: 'NewPoll' }" class="button">New Poll</router-link>
    <div>
      <PollList></PollList>
    </div>
    <Logout></Logout>
  </div>
</template>

<script>
import Logout from '../Auth/Logout'
import PollList from './PollList'

export default {
  name: 'Admin',
  components: {
    Logout,
    PollList
  }
}
</script>