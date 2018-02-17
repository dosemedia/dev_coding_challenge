<template>
  <nav class="panel">
    <div class="panel-heading">
      Active Polls
    </div>
    <a :key="index"
       v-for="(poll, index) in polls"
       @click="onSelectPoll(poll)"
       class="panel-block is-active">
      <span class="tag is-info is-rounded">{{ '+' + sumVotes(poll) }}</span>
      &nbsp;&nbsp;{{ poll.data().title }}
    </a>
    <div class="panel-block">
      <a class="button is-primary is-outlined is-fullwidth"
         @click="$emit('newpollclicked')">
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
    sumVotes(pollSnapshot) {
      const options = Object.values(pollSnapshot.data().options);
      return options.reduce((a, b) => a + b.votes, 0);
    },

    onSelectPoll(poll) {
      this.$emit('pollselected', poll);
    },
  },
};
</script>

<style>
.poll-item {
  cursor: default;
}
</style>

