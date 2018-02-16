<template>
  <div>
    <div>
      <PollFields v-on:save="savePoll" :poll="poll"></PollFields>
    </div>
    <div>
      <PollResults :poll="poll"></PollResults>
    </div>
  </div>
</template>

<script>
import db from '../../firebase.js'
import PollFields from './PollFields'
import PollResults from '../PollResults'

let pollRef

export default {
  name: 'EditPoll',
  components: {
    PollFields,
    PollResults
  },
  created: function () {
    pollRef = db.ref('Polls/' + this.$route.params.id)
    this.$bindAsObject('poll', pollRef)
  },
  methods: {
    savePoll: function () {
      pollRef.child('name').set(this.poll.name)
      pollRef.child('question').set(this.poll.question)
      pollRef.child('options').set(this.poll.options)
    }
  }
}
</script>