<template>
    <div class="columns">
      <div class="column is-half is-offset-one-quarter">
      <form @submit.prevent="save">
        <div class="field">
          <label for="" class="label">Question</label>
          <input v-model="poll.question" type="text" class="input">
        </div>

        <div>
          <ul>
            <label for="" class="label">Answers</label>
            <li v-for="(answer, index) in poll.answers" v-bind:key="answer.key">
              <div class="answer field has-addons">

                <div class="control">
                  <input v-model="answer.text" class="input" type="text" />
                </div>
                <div class="control">
                  <a class="button is-danger" @click="deleteAnswer(index)"><i class="fa fa-trash"></i></a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="field">
          <div class="control">
            <button @click.prevent="addAnswer" class="button">
              <i class="fa fa-plus"></i>&nbsp;Add answer
            </button>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <input class="button is-primary" type="submit" value="Save" >
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PollForm',
  props: {
    poll: {
      type: Object,
      default () {
        return {
          question: '',
          answers: []
        }
      }
    }
  },
  methods: {
    deleteAnswer (index) {
      this.poll.answers.splice(index, 1)
    },
    addAnswer () {
      this.poll.answers.push({
        text: '',
        count: 0
      })
    },
    save () {
      this.$emit('save', this.poll)
      this.$router.push({ name: 'Admin' })
    }
  }
}
</script>

<style scoped>
  .answer {
    margin-bottom: 0.5em;
  }
</style>
