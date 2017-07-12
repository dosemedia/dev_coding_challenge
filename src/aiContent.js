var accessToken = "2bddea0e3efa40198d172f01e2ed66f3";
var baseUrl = "https://api.api.ai/v1/";
		
$(document).ready(function() {
    $("#input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            send();
        }
    });
    $("#rec").click(function(event) {
        switchRecognition();
	});
});

var recognition;
function startRecognition() {
    recognition = new webkitSpeechRecognition();
    
    recognition.onstart = function(event) {
        $("#rec").toggleClass("listening");
	};
    
    recognition.onresult = function(event) {
        var text = "";
		
        for (var i = event.resultIndex; i < event.results.length; ++i) {
			 text += event.results[i][0].transcript;
        }
	    setInput(text);
        stopRecognition();
    };
	
    recognition.onend = function() {
        stopRecognition();
    };
			
    recognition.lang = "en-US";
    recognition.start();
}
	
function stopRecognition() {
    if (recognition) {
        recognition.stop();
        recognition = null;
        $("#rec").toggleClass("listening");
    }
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
    $("#input").val(text);
    send();
}
        
function send() {
    var text = $("#input").val();
    $.ajax({
        type: "POST",
		url: baseUrl + "query?v=20150910",
        contentType: "application/json; charset=utf-8",
		dataType: "json",
        headers: {
			"Authorization": "Bearer " + accessToken
        },
		data: JSON.stringify({ query: text, lang: "en", sessionId: "assistant" }),
        success: function(data) {
            console.log(data);
                    
            var responseText = data.result.fulfillment.speech;
            var tag = data.result.parameters.topic;
            var source = data.result.parameters.source;                
            var intentComplete = true;
            
            if(!source || !tag) {
                intentComplete = false;
            }
                    
			console.log("Response: " + responseText);
            console.log("Intent Complete: " + intentComplete);
            console.log("Searching for tag: " + tag);
                    
            setResponse(responseText);
                    
            if (intentComplete) {
                redirect(tag);
            }
		},
        error: function() {
            setResponse("Please type something. I cannot read minds.");
        }
	});
    setResponse("Hold on, I'm thinking...");
}

function setResponse(val) {
    $("#response").html(val);
    var msg = new SpeechSynthesisUtterance(val);
    msg.rate = 1.15;
    msg.pitch = 1;
    window.speechSynthesis.speak(msg);
}
        
function redirect(val) {
    window.open("https://dose.com/tagged/" + val);
    $("#input").val("");
    $("#response").html("Wanna see more? Just ask me!");
}