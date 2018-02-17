<template>
  <div v-if="poll"
       class="poll-display">
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-danger is-outlined">
          <i class="fas fa-trash"
             style="margin-right: 0.5rem;"></i>
          Delete poll
        </a>
      </p>
      <p v-show="!canEdit"
         class="control">
        <a class="button"
           @click="onClickEdit">
          <i class="fas fa-pencil-alt"
             style="margin-right: 0.5rem;"></i>
          Edit
        </a>
      </p>
      <p v-show="canEdit"
         class="control">
        <a class="button is-success is-outlined"
           @click="onSaveEdit">
          <i class="fas fa-save"
             style="margin-right: 0.5rem;"></i>
          Save changes
        </a>
      </p>
      <p v-show="canEdit"
         class="control">
        <a class="button is-outlined"
           @click="onCancelEdit">
          <i class="fas fa-ban"
             style="margin-right: 0.5rem;"></i>
          Cancel
        </a>
      </p>
    </div>

    <div class="box">
      <h4 v-if="!canEdit"
          class="title is-1">
        {{ poll.title }}
      </h4>

      <div v-if="canEdit"
           class="field">
        <div class="control">
          <input class="input is-large"
                 type="text"
                 v-model="editedPoll.title">
        </div>
      </div>

      <div :key="i"
           v-for="(option, i) in editedPoll.options">
        <h4 v-if="!canEdit"
            class="title is-4">
          {{ option.title }}
        </h4>
        <div v-if="canEdit"
             class="field">
          <div class="control">
            <input class="input"
                   type="text"
                   v-model="editedPoll.options[i].title">
          </div>
        </div>
      </div>

      <a v-show="canEdit"
         class="add-option-btn button is-primary is-outlined is-fullwidth"
         @click="onAddOption">
        <i class="fas fa-plus"
           style="margin-right: 0.5rem;"></i>
        Add option
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['poll'],

  data() {
    return {
      editedPoll: null,
      canEdit: false,
    };
  },

  watch: {
    poll(updatedValue) {
      this.editedPoll = { ...updatedValue };
    },
  },

  methods: {
    onClickEdit() {
      this.canEdit = true;
    },

    onCancelEdit() {
      this.canEdit = false;
      this.editedPoll = { ...this.poll };
    },

    onSaveEdit() {
      this.canEdit = false;
      this.$emit('polledited', this.editedPoll);
    },

    onAddOption() {
      this.editedPoll.options = [...this.editedPoll.options, { title: '' }];
    },
  },
};
</script>

<style scoped>
input {
  margin: 0.5rem 0;
}

.title {
  margin: 2rem 0;
}

.poll-display {
  padding: 2rem;
}

.add-option-btn {
  margin-top: 0.5rem;
}
</style>

