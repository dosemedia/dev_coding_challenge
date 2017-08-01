<template>
  <div id="app">
    <loader v-bind:loading="listening"/>
    <h1>
      {{ msg }}
    </h1>
    <div class="alert alert-warning alert-dismissible" role="alert" v-if="error">
      <button type="button" class="close" v-on:click="clearError"><span aria-hidden="true">&times;</span></button>
      <strong>Warning!</strong> {{this.error.msg}}
    </div>
    <mic-button
      v-bind:listen="listen"
      v-bind:listening="listening"
      v-bind:result="result"
      v-bind:search="search"
    />
    <br>
    <p>Click the microphone button to say a command or type one into the textbox. Commands should take the form "Dose, show me &lt;something&gt;..."</p>
    <p>Created for the <a href="https://github.com/dosemedia/dev_coding_challenge">Dose dev coding challenge</a></p>
  </div>
</template>

<script>
  import MicButton from './Button.vue';
  import Loader from './Loader.vue';
  import SpeechRecognition from './speechRecognition';

  const sr = new SpeechRecognition();

  export default {
    name: 'app',
    data () {
      return {
        msg: 'Dose Digital Assistant',
        listening: false,
        result: '',
        error: null
      }
    },
    components: {
      MicButton,
      Loader
    },
    methods: {
      listen () {
        this.listening = true;
        sr.startStream().then(data => {
          this.listening = false;
          this.result = data.result.resolvedQuery

          window.open(`http://dose.com/tagged/${data.result.parameters.tag}`, '_blank')
        })
        .catch(err => {
          this.listening = false;
          this.error = err
        })
      },
      search (val) {
        sr.searchByText(val).then(data => {
          console.log(data)
          this.result = data.result.resolvedQuery
          window.open(`http://dose.com/tagged/${data.result.parameters.tag}`, '_blank')
        }).catch(err => {
          this.error = err
        })
      },
      clearError() {
        this.error = null
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 628px;
  color: #2c3e50;
  margin: 60px auto 0;
}
h1 {
  font-weight: normal;
  margin-bottom: 1em;
}
p {
  font-size: 1em;
}
#mic-button {
  margin: 20px 0;
}


</style>
