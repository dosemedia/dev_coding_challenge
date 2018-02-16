<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Question</th>
          <th>Link</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poll in polls">
          <td><router-link :to="{ name: 'EditPoll', params: { id: poll['.key'] } }"><i class="fa fa-pencil-square-o"></i>&nbsp;{{ poll.name }}</router-link></td>
          <td>{{ poll.question }}</td>
          <td><router-link :to="{ name: 'TakePoll', params: { id: poll['.key'] } }">Take Poll</router-link></td>
          <td @click="deletePoll(poll)"><button class="button is-small"><i class="fa fa-trash"></i></button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import db from '../../firebase.js'

let pollsRef = db.ref('Polls')

export default {
  name: 'PollList',
  firebase: {
    polls: pollsRef
  },
  methods: {
    deletePoll (poll) {
      pollsRef.child(poll['.key']).remove()
    }
  }
}
</script>