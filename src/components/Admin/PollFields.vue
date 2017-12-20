<template>
  <form id="create_edit_poll" @submit.prevent="save">

    <div class="field">
      <label class="label">Poll name</label>
      <div class="control">
        <input type="text" v-model="poll.name" class="input">
      </div>
    </div>

    <div class="field">
      <label class="label">Question</label>
      <div class="control">
        <input type="text" v-model="poll.question" class="input">
      </div>
    </div>

    <div>
      <ul>
        <li v-for="(option, index) in poll.options">
          <div class="field has-addons">
            <div class="control">
              <input type="text" v-model="option.text" class="input">
            </div>
            <div class="control">
              <a class="button is-danger" @click="deleteOption(index)">
                <i class="fa fa-trash"></i>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="field">
      <div class="control">
        <button @click.prevent="addOption" class="button">
          <i class="fa fa-plus"></i>&nbsp;Add option
        </button>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input type="submit" value="Save" class="button">
      </div>
    </div>
  </form>
</template>

<script>
  
  export default {
    name: 'PollFields',
    props: {
      poll: {
        type: Object,
        default: function () {
          return {
            name: '',
            question: '',
            options: []
          }
        }
      }
    },
    methods: {
      addOption: function () {
        this.poll.options.push({
          text: '',
          count: 0
        })
      },
      deleteOption: function (index) {
        console.log(index)
        this.poll.options.splice(index, 1)
      },
      save: function () {
        this.$emit('save', this.poll)
        this.$router.push({
          name: 'Admin'
        })
      }
    }
  }
</script>