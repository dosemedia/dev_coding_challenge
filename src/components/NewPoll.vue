<template>
  <div>
    <h1 class="title">New Poll</h1>
    <PollForm v-on:save="savePoll"/>
  </div>
</template>

<script>
import PollForm from './PollForm'
import db from '../firebase'
let polls = db.ref('Polls')
export default {
  name: 'NewPoll',
  components: {
    PollForm
  },
  methods: {
    savePoll (poll) {
      polls.push(poll)
    }
  }
}
</script>

<style scoped>
  .title {
    text-align: center;
  }
</style>
