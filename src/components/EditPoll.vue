<template>
  <div>
    <PollForm v-on:save="savePoll" :poll="poll"/>
  </div>
</template>

<script>
import PollForm from './PollForm'
import db from '../firebase'
let poll
export default {
  name: 'EditPoll',
  components: {
    PollForm
  },
  created () {
    const { id } = this.$route.params
    poll = db.ref(`Polls/${id}`)
    this.$bindAsObject('poll', poll)
  },
  methods: {
    savePoll () {
      const { question, answers } = this.poll
      poll.child('question').set(question)
      poll.child('answers').set(answers)
    }
  }
}
</script>

<style>

</style>
