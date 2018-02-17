<template>
  <div>
    <div v-if="poll && !errored"
         class="widget-container has-text-centered">
      <h1 class="title is-1">{{ poll.data().title }}</h1>

      <div v-if="!hasVoted">
        <div class="tabs is-toggle is-fullwidth-mobile is-two-thirds-tablet is-medium">
          <ul>
            <li :key="i"
                v-for="(option, i) in poll.data().options"
                :class="{'is-active': i === selectedOptionIndex}"
                @click="() => selectedOptionIndex = i">
              <a>
                <span>{{ option.title }}</span>
              </a>
            </li>
          </ul>
        </div>

        <a class="button is-primary is-fullwidth is-medium"
           @click="onVote">Vote!</a>
      </div>

      <div v-show="hasVoted"
           id="results-plot"></div>
    </div>

    <div v-if="errored">
      Couldn't find poll with that ID
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      poll: null,
      errored: false,
      selectedOptionIndex: null,
      hasVoted: false,
    };
  },

  methods: {
    onVote() {
      const docRef = this.poll.ref;
      const options = { ...this.poll.data().options };
      options[this.selectedOptionIndex].votes = options[this.selectedOptionIndex].votes + 1;
      docRef
        .update({
          options,
        })
        .then(() => {
          this.hasVoted = true;
          this.plotResults();
        });
    },

    plotResults() {
      const optionsArray = Object.values(this.poll.data().options);
      const results = [
        {
          x: optionsArray.map(option => option.title),
          y: optionsArray.map(option => option.votes),
          type: 'bar',
        },
      ];

      Plotly.newPlot('results-plot', results, null, { displayModeBar: false });
    },
  },

  beforeCreate() {
    const routeId = this.$route.params.id;
    db.collection('polls')
      .doc(routeId)
      .onSnapshot((docSnapshot) => {
        this.poll = docSnapshot;
        this.plotResults();
      });
  },
};
</script>

<style scoped>
.widget-container {
  padding: 1rem;
}

.tabs ul {
  flex-direction: column;
}

.tabs ul > li {
  margin: 0.25rem 0;
  width: 100%;
}
</style>

