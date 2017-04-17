<template>
  <div class="hello container">
    <h1>{{ msg }}</h1>
    <div class="row">
      <div class="col-sm-6">Column small 6</div>
      <div class="col-sm-6">Column 2 small 6</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to DOSE Digital Assistant'
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
