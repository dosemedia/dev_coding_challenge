<template>
    <div id="app">
        <div id="wrapper">
            <header id="header">
				<div class="content">
				    <div class="inner">
				        <h1>DOSE Digital Assistant</h1>
						<p>Start by using a voice command such as "DOSE, show me music" or "DOSE, show me food". The assistant will then redirect you to the appropriate page on dose.com. Try me on mobile too!!</p>
                        <div id="speecharea">
                            <p id="response" cols="40" rows="20"><b>Ask me something!</b></p>
                            <input id="input" type="text"> <button id="rec"><i class="fa fa-microphone" aria-hidden="true"></i></button>
                        </div>
				    </div>
				</div>
            </header>
            <a href="https://twitter.com/dose"><i class="fa fa-twitter" aria-hidden="true"></i></a>
            <a href="https://facebook.com/dose"><i class="fa fa-facebook" aria-hidden="true"></i></a>

        </div>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {
            msg: 'Welcome to Your DOSE Digital Assistant'
        }
    }
}
</script>