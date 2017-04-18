<template>
  <div id="app">
    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
    <router-view></router-view>
    <div class="row">
      <div class="col-xs-12">
        <button v-on:click="startStream">Add 1</button>
      </div>  
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button v-on:click="closeStream">Add 1</button>
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

const streamClient = client.createStreamClient({
  onInit: () => {
    console.log('on init function')
    streamClient.open()
  }
})

// streamClient.init()
// streamClient.startListening()
// streamClient.stopListening()

export default {
  name: 'app',
  methods: {
  startStream () {
    if (this.streamClient) {
      this.closeStream()
    }

    this.streamClient = client.createStreamClient({
      onInit: () => {
        console.log('onInit')
        this.streamClient.open()
      },
      onOpen: () => {
        console.log('onOpen')
        this.streamClient.startListening()

        setTimeout(() => {
          this.stopStream()
        }, 4000)
      },
      onClose: () => {
        console.log('onClose')
      },
      onStartListening: () => {
        console.log('onStartListening')
        this.error = ''
        this.speech = ''
        this.listening = true
        this.event_count = 0
      },
      onStopListening: () => {
        console.log('onStopListening')
        this.listening = false
      },
      onResults: (arg) => {
        console.log('onResults', arg)
        if ((arg) && (arg.result) && (arg.result.speech)) {
            this.result = arg.result.speech
        }
        if ((arg) && (arg.result) && (arg.result.resolvedQuery)) {
            this.speech = arg.result.resolvedQuery
        }
        this.closeStream()
      },
      onEvent: (code, message) => {
        console.log('onEvent : ' + code + ' - ', message)
        this.event_count = this.event_count + 1

        // this.blinkMic()
      },
      onError: (code, message) => {
        console.log('onEvent : ' + code + ' - ', message)
        this.closeStream()
      }
    })
    this.streamClient.init()
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
    }
  }
}

</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.row {
  margin: 20px 0;
}

</style>
