import Vue from 'vue'
import App from './App.vue'

require("./aiContent.js");
require("css-loader!./main.css");

new Vue({
  el: '#app',
  render: h => h(App)
})