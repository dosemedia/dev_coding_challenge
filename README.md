# DOSE Digital Assistant Coding Challenge

A single page web application that takes a voice command such as "DOSE, show me music" or "DOSE, show me food". The application will then redirect the user to the appropriate tag page on dose.com.

Dosey, as I like to call it, is trained to understand and search a fairly large amount of "tags" or "topics".

Speech Recognition capabilities only supported by Chrome. Explained in more detail down below.

Demo: https://dose-digital-assistant.herokuapp.com/

## Built using:
 - HTML5/CSS3
 - Javascript
 - Node.js
 - Vue.js
 - Webpack
 - API.AI 
 - WebkitSpeechRecognition (tts and asr capabilities for ApiAiStreamClient on https://github.com/api-ai/apiai-javascript-client were discontinued 13 days ago. Thus voice commands only work in Chrome, however text command are able to be used in other browsers.)
 - SpeechSynthesis
 - Heroku

## Usage

Building and running are a piece of cake! Just download the repo, and run one of the commands below inside the root directory.

``` bash
# Serve at localhost:8080 in development mode.
npm run dev

# Build with HTML/CSS/JS minification.
npm run build
```

This was a lot of fun, thank you Dose!
