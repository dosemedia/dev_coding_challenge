import { ApiAiClient } from 'api-ai-javascript';

const client = new ApiAiClient({
  accessToken: 'f5b3df71337b4b8d83b3cea01e4ebba9'
})

export default class SpeechRecognition {
  constructor() {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser currently does not support Speech Recognition')
    } else {
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'en-US';
      this.recognition.interimResults = false;
      this.recognition.maxAlternatives = 5;

    }

  }

  startStream() {
    return new Promise((resolve, reject) => {
      this.recognition.start();
      this.recognition.onresult = function(event) {
        client.textRequest(event.results[0][0].transcript)
          .then((response) => {
            if(response.result.metadata.intentName === 'show') resolve(response)
            else reject({msg:'Command not available. Try "Dose, show me music"'})
          })
          .catch(err => {
            reject(err)
          })
      };
      this.recognition.onend = function() {
        reject({msg: 'Sorry, I did\'t catch that.'})
      }
    })
  }

  searchByText(text) {
    return new Promise((resolve, reject) => {
      client.textRequest(text)
        .then((response) => {
          if(response.result.metadata.intentName === 'show') resolve(response)
          else reject({msg:'Command not available. Try "Dose, show me music"'})
        })
        .catch(err => {
          reject(err)
        })
    })
  }

}
