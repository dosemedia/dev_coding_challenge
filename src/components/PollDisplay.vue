<template>
  <div class="poll-display">
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-danger is-outlined"
           @click="onClickDelete">
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

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Poll Details
        </p>
      </header>

      <div class="card-content">
        <h3 v-if="!canEdit"
            class="title is-3">
          {{ pollSnapshot.data().title }}
        </h3>

        <div v-if="canEdit"
             class="field">
          <div class="control">
            <input class="input is-large"
                   type="text"
                   placeholder="Poll question"
                   v-model="inputData.title"
                   v-focus>
          </div>
        </div>

        <div :key="i"
             v-for="(option, i) in Object.values(inputData.options)">
          <h4 v-if="!canEdit"
              class="title is-4">
            {{ option.title }}
            <span class="tag is-large is-rounded">{{ '+' + option.votes }}</span>
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
                     v-model="option.title"
                     style="padding-left: 1rem"
                     v-focus>
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

    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          Embed Link
        </p>
      </header>
      <div class="card-content">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <input id="embed-link"
                   class="input"
                   type="text"
                   :value="'https://dose-poll.firebaseapp.com/poll/' + pollSnapshot.id"
                   readonly>
          </div>
          <div class="control">
            <a class="button is-primary is-outlined"
               @click="copyToClipboard">
              <i class="far fa-copy"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pollSnapshot'],

  data() {
    return {
      inputData: {
        title: this.pollSnapshot.data().title,
        options: this.pollSnapshot.data().options,
      },
      canEdit: false,
    };
  },

  watch: {
    pollSnapshot(newSnapshot) {
      // when selected poll changes
      this.canEdit = false;
      if (newSnapshot) {
        this.inputData = {
          title: newSnapshot.data().title,
          options: newSnapshot.data().options,
        };
      } else {
        this.inputData = {
          title: '',
          options: {},
          user: firebase.auth().currentUser.uid,
        };
      }
    },
  },

  methods: {
    copyToClipboard() {
      document.querySelector('#embed-link').select();
      document.execCommand('copy');
    },

    onClickDelete() {
      this.pollSnapshot.ref
        .delete()
        .then(() => {
          this.$emit('delete');
        });
    },

    onClickEdit() {
      this.canEdit = true;
    },

    onCancel() {
      this.canEdit = false;
      this.inputData = {
        title: this.pollSnapshot.data().title,
        options: this.pollSnapshot.data().options,
      };
    },

    onSave() {
      this.canEdit = false;
      this.pollSnapshot.ref
        .update({
          title: this.inputData.title,
          options: this.inputData.options,
        })
        .then(() => {
          this.onCancel();
        });
    },

    onDeleteOption(i) {
      this.$delete(this.inputData.options, i);
    },

    onAddOption() {
      const newIndex = Object.keys(this.inputData.options).length;
      this.$set(this.inputData.options, newIndex, { title: '', votes: 0.0 });
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

.card {
  margin: 1rem 0;
}
</style>

