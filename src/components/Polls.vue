<template>
  <div>
    <h1 class="title" style="text-align: center">Polls</h1>
    <div class="columns">
      <table class="table column is-half is-offset-one-quarter" >
      <thead>
        <tr>
          <th>Question</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poll in polls" v-bind:key="poll.key">
          <td>
            <router-link :to="{ name: 'TakePoll', params: { id: poll['.key'] } }">
              {{poll.question}}
            </router-link>
          </td>
          <td>
            <router-link :to="{ name: 'EditPoll', params: { id: poll['.key'] } }">
              <button class="button is-small is-info"><i class="fas fa-pencil-alt"></i></button>
            </router-link>
          </td>
          <td @click="deletePoll(poll)">
            <button class="button is-small is-danger"><i class="fa fa-trash"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>

  </div>

</template>

<script>
import db from '../firebase'
let polls = db.ref('Polls')
export default {
  name: 'Polls',
  firebase: {
    polls
  },
  methods: {
    deletePoll (poll) {
      polls.child(poll['.key']).remove()
    }
  }
}
</script>

<style>

</style>
