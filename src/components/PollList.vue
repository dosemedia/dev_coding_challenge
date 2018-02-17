<template>
  <nav class="panel">
    <a :key="index"
       v-for="(poll, index) in polls"
       @click="onSelectPoll(poll)"
       class="panel-block is-active">
      {{ poll.title }}
    </a>
    <div class="panel-block">
      <a class="button is-primary is-outlined is-fullwidth">
        <i class="fa fa-plus"
           style="margin-right: 0.5rem;"></i>
        Create new poll
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['polls'],

  methods: {
    onSelectPoll(poll) {
      this.$emit('pollselected', poll);
    },

    onCreatePoll() {

    },
  },
};
</script>

<style>
.poll-item {
  cursor: default;
}
</style>

