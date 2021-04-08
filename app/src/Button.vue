<template lang="html">
  <div id="mic-button">
    <div class="input-group">
      <div class="input-group-btn">
        <button type="button" name="button" class="btn btn-default" v-on:click="listen">
          <span v-bind:class="{ listening: listening }">
            <i class="fa fa-microphone" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <input type="text" class="form-control" placeholder="Dose, show me music..." v-model="res" v-on:keypress="handleSearch">
    </div>
  </div>
</template>

<script>
export default {
  name: 'mic-button',
  props: [ 'listen', 'result', 'listening', 'search' ],
  computed: {
    res: function() {
      return this.result ? this.result : '';
    }
  },
  methods: {
    handleSearch(e) {
      if (e.which === 13) {
        this.search(e.target.value);
      }
    }
  }
}

</script>

<style lang="scss">
.listening {
  color: #2ecc71;
}
</style>
