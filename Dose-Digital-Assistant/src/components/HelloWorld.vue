<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="startStream">Record</button>
  </div>
</template>

<script>
import { ApiAiClient } from 'api-ai-javascript';
// eslint-disable-next-line
const client = new ApiAiClient({
  accessToken: process.env.API_AI_KEY,
});

let recognition;
let query = '';

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Record Something',
    };
  },
  methods: {
    startStream() {
      if (!('webkitSpeechRecognition' in window)) {
        // eslint-disable-next-line
        this.$nextTick(() => {
          this.msg = 'Your Browser Doesn\'t support voice recognition. Please use Google Chrom for best results';
        })
      } else {
        // eslint-disable-next-line
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;

        recognition.onstart = () => {
          query = '';
        };
        recognition.onresult = (event) => {
          this.msg = '';
          for (let i = event.resultIndex; i < event.results.length; i += 1) {
            query += event.results[i][0].transcript;
          }
        };
        recognition.onerror = (event) => {
          // eslint-disable-next-line
          console.log(event);
        };
        recognition.onend = () => {
          client.textRequest(query)
                  .then((resp) => {
                    this.$nextTick(() => {
                      this.msg = resp.result.fulfillment.speech;
                    });
                    // eslint-disable-next-line
                    window.open(resp.result.fulfillment.messages[1].payload.doseUrl);
                  }).catch((err) => {
                    //eslint-disable-next-line
                    console.log(err);
                  });
        };
        recognition.lang = 'en-US';
      }

      recognition.start();

      setTimeout(() => {
        recognition.stop();
      }, 4000);
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
