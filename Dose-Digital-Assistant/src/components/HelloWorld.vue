<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="startStream">Record</button>
  </div>
</template>

<script>
import { ApiAiClient, ApiAiStreamClient } from 'api-ai-javascript';

const client = new ApiAiClient({
  accessToken: process.env.API_AI_KEY,
  streamClientClass: ApiAiStreamClient,
});

console.log(client);

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: this.result || 'Make A Request',
    };
  },
  methods: {
    startStream() {
      if (this.streamClient) {
        this.closeStream();
      }

      this.streamClient = client.createStreamClient({
        onInit: () => {
          this.streamClient.open();
        },

        onOpen: () => {
          this.streamClient.startListening();

          setTimeout(() => {
            this.stop();
          }, 4000);
        },

        onClose: () => {

        },

        onStartListening: () => {
          this.error = '';
          this.speech = '';
          this.listening = true;
          this.event_count = 0;
        },

        onStopListening: () => {
          this.listening = false;
        },

        onResults: (arg) => {
          if ((arg) && (arg.result) && (arg.result.speech)) {
            this.result = arg.result.speech;
          }

          if ((arg) && (arg.result) && (arg.result.resolvedQuery)) {
            this.speech = arg.result.resolvedQuery;
          }

          this.closeStream();
        },

        onEvent: (code, message) => {
          this.event_count = this.event_count + 1;

          // this.blinkMic();
          return message;
        },

        onError: (code, message) => {
          this.closeStream();
          return message;
        },
      });
      this.streamClient.init();
    },

    stopStream() {
      if ((this.streamClient) && (this.listening)) {
        this.streamClient.onStopListening();
      }
    },

    closeStream() {
      if (this.streamClient) {
        if ((this.streamClient) && (this.listening)) {
          this.streamClient.stopListening();
        }
        this.streamClient.close();
        this.streamClient = null;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
