<template>
  <div id="app">
    <div class="row icon">
      <div class="col-xs-12">
        <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
      </div>
    </div>
    <router-view></router-view>
    <div class="row">
      <div class="col-sm-4 col-xs-12">
        <button class="btnClass start" v-on:click="startStream">START</button>
      </div> 
      <div class="col-sm-4 col-xs-12">
        <button class="btnClass clear" v-on:click="clearWords">CLEAR</button>
      </div>
      <div class="col-sm-4 col-xs-12">
        <button class="btnClass stop" v-on:click="closeStream">STOP</button>
      </div>  
    </div>
    <div class="row conversation">
      <div class="row">
        <div class="response col-sm-offset-2 col-sm-10 col-xs-12">YOU: <span class="reactive" v-if="speech !== '' && speech !== undefined">"{{ speech }}"</span></div>
      </div>
      <div class="row">
        <div class="response col-sm-offset-2 col-sm-10 col-xs-12">DOSE: <span class="reactive" v-if="result !== '' && result !== undefined">"{{ result }}"</span></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import jQuery from 'jquery'
global.jQuery = jQuery
var Bootstrap = require('bootstrap')

import {ApiAiClient, ApiAiStreamClient} from 'api-ai-javascript'
const client = new ApiAiClient({accessToken: 'ab34fb00765b4b6f9e8c1084345d94da', streamClientClass: ApiAiStreamClient})

export default {
  name: 'app',
  data () {
    return {
      speech: this.speech,
      result: this.result
    }
  },
  methods: {
  startStream () {
    if (this.streamClient) {
      this.closeStream()
    }

    this.streamClient = client.createStreamClient({
      onInit: () => {
        this.streamClient.open()
      },
      onOpen: () => {
        this.streamClient.startListening()

        setTimeout(() => {
          this.stopStream()
        }, 4000)
      },
      onClose: () => {
      },
      onStartListening: () => {
        this.error = ''
        this.speech = ''
        this.listening = true
        this.event_count = 0
      },
      onStopListening: () => {
        this.listening = false
      },
      onResults: (arg) => {
        if ((arg) && (arg.result) && (arg.result.speech)) {
            this.result = arg.result.speech
        }
        if ((arg) && (arg.result) && (arg.result.resolvedQuery)) {
            this.speech = arg.result.resolvedQuery
        }
        if ((arg) && (arg.result) && (arg.result.action === 'Redirect') && (arg.result.parameters.tag !== undefined) && (arg.result.parameters.name === 'Dose')) {
            this.tag = arg.result.parameters.tag
            this.redirect()
            this.closeStream()
        }
      },

      onEvent: (code, message) => {
        this.event_count = this.event_count + 1
      },
      onError: (code, message) => {
        this.closeStream()
      }
    })
    this.streamClient.init()
    },

    redirect () {
      if (this.tag !== undefined && this.tag !== null && this.tag !== '') {
        var url = 'https://dose.com/tagged/' + this.tag
        setTimeout(() => {
          window.open(url, '_blank')
        }, 2000)
      }
    },

    stopStream () {
      if ((this.streamClient) && (this.listening)) {
        this.streamClient.stopListening()
      }
    },

    closeStream () {
      if (this.streamClient) {
        if ((this.streamClient) && (this.listening)) {
            this.streamClient.stopListening()
        }
        this.streamClient.close()
        this.streamClient = null
      }
    },
    clearWords () {
      this.speech = ''
      this.result = ''
    }
  },
  mounted () {
  }
}

</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
body {
  background-color: #021730;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #b7c0cd;
}

.btnClass {
  padding: 10px;
  margin-bottom: 10px;
  width: 80px;
  border: none;
  box-shadow: 0 6px 5px 0 rgba(0, 0, 0, 0.35);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 1px;
  outline: none;
}

.btnClass.start {
  background-color: #00897B;
}

.btnClass.clear {
  background-color: #1E88E5;
}

.btnClass.stop {
  background-color: #E53935; 
}

.row {
  margin: 20px 0;
}

.conversation {
  border: 1px solid #b7c0cd;
  margin: 10px 20px;
}

.response {
  text-align: left;
  font-size: 18px;
  font-weight: 600;
}

.reactive {
  font-weight: normal;
  font-size: 16px;
}

.icon {
  margin: 0 0 20px;
  padding: 50px 10px 25px;
  background-color: #1f2c3e;
  font-size: 50px;
  color: white;
}

</style>
