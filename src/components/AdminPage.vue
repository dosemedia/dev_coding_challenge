<template>
  <div>
    <v-navbar></v-navbar>
    <div class="columns is-gapless">
      <div class="column is-one-third">
        <v-poll-list :polls="pollSnapshots"
                     @pollselected="onPollSelected"
                     @newpollclicked="onNewPollClicked"></v-poll-list>
      </div>
      <div class="column is-two-thirds">
        <v-poll-display v-if="selectedPollSnapshot && !showNew"
                        :poll-snapshot="selectedPollSnapshot"
                        @newpollcanceled="onNewPollCanceled"
                        @delete="onDelete">
        </v-poll-display>
        <v-new-poll-display v-if="showNew"
                            @cancel="showNew = false">
        </v-new-poll-display>
      </div>
    </div>
  </div>
</template>

<script>
import vNavbar from './Navbar';
import vPollList from './PollList';
import vPollDisplay from './PollDisplay';
import vNewPollDisplay from './NewPollDisplay';

export default {
  components: {
    vNavbar,
    vPollList,
    vPollDisplay,
    vNewPollDisplay,
  },

  data() {
    return {
      pollSnapshots: [],
      selectedPollSnapshot: null,
      showNew: false,
    };
  },

  methods: {
    onNewPollClicked() {
      this.selectedPollSnapshot = null;
      this.showNew = true;
    },

    onNewPollCanceled() {
      this.showNew = false;
    },

    onPollSelected(poll) {
      this.showNew = false;
      this.selectedPollSnapshot = poll;
    },

    onDelete() {
      this.selectedPollSnapshot = null;
    },
  },

  mounted() {
    db.collection('polls')
      .where('user', '==', firebase.auth().currentUser.uid)
      .onSnapshot((querySnapshot) => {
        this.pollSnapshots = querySnapshot.docs;
        if (querySnapshot.docChanges.length === 1) {
          this.selectedPollSnapshot = querySnapshot.docChanges[0].doc;
        }
      });
  },
};
</script>
