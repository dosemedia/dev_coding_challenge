<template>
  <div v-if="poll || isNew"
       class="poll-display">
    <div class="field is-grouped">
      <p v-if="!isNew"
         class="control">
        <a class="button is-danger is-outlined"
           @click="onClickDelete">
          <i class="fas fa-trash"
             style="margin-right: 0.5rem;"></i>
          Delete poll
        </a>
      </p>
      <p v-show="!canEdit && !isNew"
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
           @click="onSave">
          <i class="fas fa-save"
             style="margin-right: 0.5rem;"></i>
          Save
        </a>
      </p>
      <p v-show="canEdit"
         class="control">
        <a class="button is-outlined"
           @click="onCancel">
          <i class="fas fa-ban"
             style="margin-right: 0.5rem;"></i>
          Cancel
        </a>
      </p>
    </div>

    <div class="box">
      <h3 v-if="!canEdit"
          class="title is-3">
        {{ poll.title }}
      </h3>

      <div v-if="canEdit"
           class="field">
        <div class="control">
          <input class="input is-large"
                 type="text"
                 placeholder="Poll question"
                 v-model="editedPoll.title">
        </div>
      </div>

      <div v-if="editedPoll.options.length"
           :key="i"
           v-for="(option, i) in editedPoll.options">
        <h4 v-if="!canEdit"
            class="title is-4">
          {{ option.title }}
        </h4>
        <div v-if="canEdit"
             class="field has-addons">
          <div class="control"
               @click="onDeleteOption(i)">
            <a class="button is-shadowless">
              <i class="fas fa-trash"></i>
            </a>
          </div>
          <div class="control">
            <input class="input"
                   type="text"
                   :placeholder="'Option ' + (i + 1)"
                   v-model="editedPoll.options[i].title"
                   style="padding-left: 1rem">
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
  props: ['poll', 'isNew'],

  data() {
    return {
      editedPoll: {
        title: '',
        options: [],
        user: firebase.auth().currentUser.uid,
      },
      canEdit: false,
    };
  },

  computed: {
    userId() {
      return firebase.auth().currentUser.uid;
    },
  },

  watch: {
    isNew(newValue) {
      this.canEdit = newValue;
    },

    poll(updatedValue) {
      if (updatedValue) {
        this.editedPoll = { ...updatedValue };
      } else {
        this.editedPoll = {
          title: '',
          options: [],
          user: firebase.auth().currentUser.uid,
        };
      }
    },
  },

  methods: {
    onClickDelete() {
      this.$emit('deletepollclicked');
    },

    onClickEdit() {
      this.canEdit = true;
    },

    onCancel() {
      if (this.isNew) {
        // if adding new poll, send cancel event
        this.$emit('newpollcanceled');
      } else {
        this.canEdit = false;
        this.editedPoll = { ...this.poll };
      }
    },

    onSave() {
      this.canEdit = false;
      this.$emit('polledited', this.editedPoll);
      this.onCancel();
    },

    onDeleteOption(i) {
      const optionsCopy = [...this.editedPoll.options];
      optionsCopy.splice(i, 1);
      this.editedPoll.options = optionsCopy;
    },

    onAddOption() {
      this.editedPoll.options = [...this.editedPoll.options, { title: '', votes: 0.0 }];
    },
  },
};
</script>

<style scoped>
.has-addons > .control {
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

