<template>
  <div class="poll-display">
    <div class="field is-grouped">
      <p class="control">
        <a class="button is-success is-outlined"
           @click="onSave">
          <i class="fas fa-save"
             style="margin-right: 0.5rem;"></i>
          Save
        </a>
      </p>
      <p class="control">
        <a class="button is-outlined"
           @click="onCancel">
          <i class="fas fa-ban"
             style="margin-right: 0.5rem;"></i>
          Cancel
        </a>
      </p>
    </div>

    <div class="box">
      <div class="field">
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
        <div class="field has-addons">
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

      <a class="add-option-btn button is-primary is-outlined is-fullwidth"
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
  data() {
    return {
      inputData: {
        title: '',
        options: {},
      },
    };
  },

  methods: {
    onCancel() {
      this.$emit('cancel');
    },

    onSave() {
      db.collection('polls')
        .doc()
        .set({
          title: this.inputData.title,
          options: this.inputData.options,
          user: firebase.auth().currentUser.uid,
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
</style>

