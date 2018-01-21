import Vue from 'vue'
import firebase from 'firebase'
import 'firebase/firestore'
import VueFire from 'vuefire'

Vue.use(VueFire)

const config = {
  apiKey: 'AIzaSyAEcyyW7NF7WwXHhJlVADs3cmCmSdTnPwI',
  authDomain: 'dose-project.firebaseapp.com',
  databaseURL: 'https://dose-project.firebaseio.com',
  projectId: 'dose-project',
  storageBucket: 'dose-project.appspot.com',
  messagingSenderId: '894111294879'
}

const firebaseApp = firebase.initializeApp(config)
// export configured app instance
export { firebaseApp }
// export db connection
export default firebaseApp.database()
