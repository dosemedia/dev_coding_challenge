<template>
  <div>
    <h2 class="subtitle">Results</h2>
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Options</th>
            <th>Votes</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="option in poll.options">
            <td>{{ option.text }}</td>
            <td>{{ option.count }}</td>
            <td>{{ ((option.count / totalVotes)*100).toFixed(2) }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'PollResults',
  props: ['poll'],
  computed: {
    totalVotes: function () {
      let total = 0
      for (let i = 0; i < this.poll.options.length; i++) {
        total += this.poll.options[i].count
      }
      return total
    }
  }
}
</script>