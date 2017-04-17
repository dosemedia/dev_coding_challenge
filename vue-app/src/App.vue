<template>
  <div id="app">
    <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
    <router-view></router-view>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
import jQuery from 'jquery'
global.jQuery = jQuery
var Bootstrap = require('bootstrap')

export default {
  name: 'app'
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

</style>
