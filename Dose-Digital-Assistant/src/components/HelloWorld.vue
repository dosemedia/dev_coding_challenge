<template>
  <div class="hello col-md-6 col-md-offset-3">
    <h1>{{ msg }}</h1>
    <VueButton @click.native="startStream" />
  </div>
</template>

<script>
import { ApiAiClient } from 'api-ai-javascript';
import VueButton from './VueButton';

const client = new ApiAiClient({
  accessToken: process.env.API_AI_KEY,
});

let recognition;
let query = '';

export default {
  name: 'HelloWorld',
  components: {
    VueButton,
  },
  data() {
    return {
      msg: 'Ask Dose',
    };
  },
  methods: {
    startStream() {
      if (!('webkitSpeechRecognition' in window)) {
        this.$nextTick(() => {
          this.msg = `Your Browser Doesn't support voice recognition.
                      Please use Google Chrome for best results`;
        });
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
                    this.$nextTick(() => {
                      this.msg = 'oops, something went wrong. Please Refresh the page and try again.';
                    });
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
