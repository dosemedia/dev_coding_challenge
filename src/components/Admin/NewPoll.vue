<template>
  <div>
    <PollFields v-on:save="savePoll"></PollFields>
  </div>
</template>

<script>
import db from '../../firebase.js'
import PollFields from './PollFields'

let pollsRef = db.ref('Polls')

export default {
  name: 'NewPoll',
  components: {
    PollFields
  },
  methods: {
    savePoll: function (poll) {
      pollsRef.push(poll)
    }
  }
}
</script>