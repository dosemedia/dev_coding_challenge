<template>
  <div>
    <h2 class="subtitle">Poll Results</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Answers</th>
            <th>Total Votes</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="answer in poll.answers" v-bind:key="answer.key">
            <td>{{ answer.text }}</td>
            <td>{{ answer.count }}</td>
            <td>{{ percentage(answer.count) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import sumBy from 'lodash.sumby'
export default {
  name: 'PollResults',
  props: ['poll'],
  methods: {
    percentage (count) {
      return ((count / this.totalVotes) * 100).toFixed(2)
    }
  },
  computed: {
    totalVotes () {
      return sumBy(this.poll.answers, o => o.count)
    }
  }
}
</script>

<style>

</style>
