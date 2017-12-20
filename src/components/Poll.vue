<template>
  <div>

    <div>
      <h1 class="title">{{ poll.name }}</h1>
      <h3 class="subtitle">{{ poll.question }}</h3>
      <div>
        <div v-for="(option, key) in poll.options">
          <div class="control">
            <label :for="key" class="radio">
              <input name="options" type="radio" :id="key" :value="key" v-model="picked">
              {{ option.text }}
            </label>
          </div>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button @click="submitPoll" class="button">Submit</button>
        </div>
      </div>
    </div>

    <div v-if="submitted">
      <hr>
      <PollResults :poll="poll"></PollResults>
    </div>

  </div>
</template>

<script>
import db from '../firebase.js'
import PollResults from './PollResults'

let pollRef

export default {
  name: 'Poll',
  components: {
    PollResults
  },
  created: function () {
    pollRef = db.ref('Polls/' + this.$route.params.id)
    this.$bindAsObject('poll', pollRef)
  },
  data: function () {
    return {
      picked: '',
      submitted: false
    }
  },
  methods: {
    submitPoll: function () {
      pollRef.child('options').child(this.picked).child('count').set(this.poll.options[this.picked].count + 1)
      this.submitted = true
    }
  }
}
</script>