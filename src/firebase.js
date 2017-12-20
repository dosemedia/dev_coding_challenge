import Vue from 'vue'
import firebase from 'firebase'
import VueFire from 'vuefire'

Vue.use(VueFire)

var config = {
  apiKey: 'AIzaSyBYdUTOUMgtAI4HpbQQ5s5upGB-f85Xiz4',
  authDomain: 'dose-news-poll.firebaseapp.com',
  databaseURL: 'https://dose-news-poll.firebaseio.com',
  projectId: 'dose-news-poll',
  storageBucket: 'dose-news-poll.appspot.com',
  messagingSenderId: '1028886806802'
}

let app = firebase.initializeApp(config)
let db = app.database()

export default db
