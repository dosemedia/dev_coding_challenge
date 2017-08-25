/* eslint-disable quotes */
/* eslint-disable no-undef */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable new-cap */
/* eslint-disable prefer-template */
/* eslint-disable quote-props */
/* eslint-disable object-shorthand */
'use strict';

const accessToken = "8f1c40388431475ea9c952b56758ea03";
const baseUrl = "https://api.api.ai/v1/";
const messageRecording = "Recording...";
const messageRecordingEnd = "";
const messageCouldntHear = "I couldn't hear you, could you say that again?";
const messageInternalError = "Oh no, there has been an internal server error";
const messageSorry = "I'm sorry, I don't have the answer to that yet.";
const messageSuccess = "Ok, lets see what I can find.";

let $speechInput;
let $recBtn;
let recognition;

$(document).ready(function() {
  $speechInput = $("#speech");
  $recBtn = $("#rec");
  $speechInput.mousedown(function(event) {
    if (event.which == 13) {
      event.preventDefault();
      send();
    }
  });
  $recBtn.on("mousedown", function(event) {
    $speechInput.val('');
    switchRecognition();
  });
});

function startRecognition() {
  recognition = new webkitSpeechRecognition();

  recognition.onstart = function(event) {
    respond(messageRecording);
    updateRec();
  };
  recognition.onresult = function(event) {
    recognition.onend = null;

    let text = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      text += event.results[i][0].transcript;
    }
    setInput(text);
    stopRecognition();
  };
  recognition.onend = function() {
    respond(messageCouldntHear);
    stopRecognition();
  };
  recognition.lang = "en-US";
  recognition.start();
}

function stopRecognition() {
  respond(messageRecordingEnd);
  if (recognition) {
    recognition.stop();
    recognition = null;
  }
  updateRec();
}

function switchRecognition() {
  if (recognition) {
    stopRecognition();
  }
  else {
    startRecognition();
  }
}

function setInput(text) {
  $speechInput.val(text);
  send();
}

function updateRec() {
  if (recognition) {
    $recBtn.removeClass("notRecording");
    $recBtn.addClass("recording");
  }
  else if (!recognition) {
    $recBtn.removeClass("recording");
    $recBtn.addClass("notRecording");
  }
}

function send() {
  const text = $speechInput.val();

  $.ajax({
    type: "POST",
    url: baseUrl + "query?v=20150910",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    headers: {
      "Authorization": "Bearer " + accessToken
    },
    data: JSON.stringify({ query: text, lang: "en", sessionId: "digitalassistant" }),
    success: function(data) {
      prepareResponse(data);
    },
    error: function() {
      respond(messageInternalError);
    }
  });
}

function prepareResponse(val) {
  if (val.result.action === "navigate.to.music") {
    window.location = "https://dose.com/tagged/music";
    respond(messageSuccess);
  }

  else if (val.result.action === "navigate.to.food") {
    window.location = "https://dose.com/tagged/food";
    respond(messageSuccess);
  }

  else if (val) {
    respond(messageSorry);
  }
}

function respond(val) {
  if (val !== messageRecording) {
    const msg = new SpeechSynthesisUtterance();

    msg.voiceURI = "native";
    msg.text = val;
    msg.lang = "en-US";
    window.speechSynthesis.speak(msg);
  }
}
