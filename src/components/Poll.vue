<template>
    <div class="columns">
      <div class="column is-one-third is-offset-one-third">
        <h3 class="subtitle">{{ poll.question }}</h3>
        <div v-if="!pollSubmitted">
          <div>
            <div class="poll-answers" v-for="(answer, key) in poll.answers" v-bind:key="key">
              <div class="control">
                <label :for="key" class="radio">
                  <input name="answers" type="radio" :id="key" :value="key" v-model="selected">
                  {{ answer.text }}
                </label>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <button @click="submitPoll" class="button is-primary">Submit</button>
            </div>
          </div>
        </div>

        <div v-if="pollSubmitted">
          <PollResults :poll="poll"></PollResults>
        </div>
      </div>
    </div>
</template>

<script>
import db from '../firebase'
import PollResults from './PollResults'

let poll

export default {
  name: 'Poll',
  components: {
    PollResults
  },
  data () {
    return {
      selected: '',
      pollSubmitted: false
    }
  },
  created () {
    const { id } = this.$route.params
    poll = db.ref(`Polls/${id}`)
    this.$bindAsObject('poll', poll)
  },
  methods: {
    submitPoll () {
      const newCount = this.poll.answers[this.selected].count + 1
      poll.child('answers')
        .child(this.selected)
        .child('count')
        .set(newCount)
      this.pollSubmitted = true
    }
  }
}
</script>

<style>
  .poll-answers {
    margin-bottom: 0.5em;
  }
</style>
