<template>
  <div>
    <v-navbar></v-navbar>
    <div class="columns is-gapless">
      <div class="column is-one-third">
        <v-poll-list :polls="polls"
                     @pollselected="onPollSelected"
                     @newpollclicked="onNewPollClicked"></v-poll-list>
      </div>
      <div class="column is-two-thirds">
        <v-poll-display :is-new="isNew"
                        :poll="selectedPoll"
                        @newpollcanceled="onNewPollCanceled"
                        @polledited="onPollEdited"
                        @deletepollclicked="onDeletePollClicked"></v-poll-display>
      </div>
    </div>
  </div>
</template>

<script>
import vNavbar from './Navbar';
import vPollList from './PollList';
import vPollDisplay from './PollDisplay';

export default {
  components: {
    vNavbar,
    vPollList,
    vPollDisplay,
  },

  data() {
    return {
      polls: [],
      selectedPoll: null,
      isNew: false,
    };
  },

  methods: {
    refreshPolls() {
      const selectedId = this.selectedPoll ? this.selectedPoll.id : null;
      db.collection('polls')
        .where('user', '==', firebase.auth().currentUser.uid)
        .get()
        .then((results) => {
          this.polls = [];
          results.forEach(doc => this.polls.push({ id: doc.id, ...doc.data() }));
          if (selectedId) {
            this.selectedPoll = this.polls.find(poll => poll.id === selectedId);
          } else {
            this.selectedPoll = null;
          }
        });
    },

    onNewPollClicked() {
      this.selectedPoll = null;
      this.isNew = true;
    },

    onNewPollCanceled() {
      this.isNew = false;
    },

    onPollSelected(poll) {
      this.isNew = false;
      this.selectedPoll = poll;
    },

    onPollEdited(updatedPoll) {
      // if poll previously existed (i.e., has an id)
      if (updatedPoll.id) {
        db.collection('polls')
          .doc(updatedPoll.id)
          .set(updatedPoll, { merge: true })
          .then(() => this.refreshPolls());
      } else {
        const newPollRef = db.collection('polls').doc();
        const newId = newPollRef.id;
        newPollRef.set({ ...updatedPoll, id: newId })
          .then(() => this.refreshPolls());
      }
    },

    onDeletePollClicked() {
      db.collection('polls')
        .doc(this.selectedPoll.id)
        .delete()
        .then(() => {
          this.selectedPoll = null;
          this.refreshPolls();
        });
    },
  },

  mounted() {
    this.refreshPolls();
  },
};
</script>
