<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-xs-12">
        <p>{{ directions }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to DOSE Digital Assistant',
      directions: 'Simply hit "START" and I will begin listening. Start each command with "Dose, show me ___" and the tagged page you would like to see. You can clear the conversation at any time with the "CLEAR" button, and I will stop listening if you press the "STOP" button. Go ahead, give me a shot!'
    }
  }
}
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
