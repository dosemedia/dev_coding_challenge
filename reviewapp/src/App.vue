<template>
  <div id="app">
    <Navbar id="nav" />
    <router-view v-on:submit-review="submit" :reviewItems="reviewItems" />
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";
import moment from "moment";
// Firebase Import
import Firebase from "firebase";
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
  authDomain: `${process.env.VUE_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.VUE_APP_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.VUE_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.VUE_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.VUE_APP_FIREBASE_SENDER_ID}`,
  appId: `${process.env.VUE_APP_FIREBASE_APP_ID}`,
};
// Initialize Firebase
let app = Firebase.initializeApp(firebaseConfig);
let db = app.database();
let reviewsRef = db.ref("reviews");

export default {
  name: "reviewApp",
  data() {
    return {
      reviewItems: [],
    };
  },
  mounted() {
    // Gets Review Data
    this.getData();
  },
  components: {
    Navbar,
  },
  methods: {
    submit: function(formData) {
      // Sends formData to Firebase Realtime Database
      reviewsRef.push({ ...formData, timestamp: moment().format() });
      // Reset Reviews Array
      this.reviewItems.length = 0;
      // Gets New Review Data
      this.getData();
    },
    getData: function() {
      // Retrieves reviews from Firebase
      reviewsRef.on("value", (reviews) => {
        reviews.forEach((review) => {
          this.reviewItems.push({
            deviceVariant: review.child("deviceVariant").val(),
            message: review.child("message").val(),
            name: review.child("name").val(),
            rating: review.child("rating").val(),
            timestamp: review.child("timestamp").val(),
          });
        });
      });
    },
  },
};
console.log;
</script>

<style lang="scss">
@import "./styles/_colors.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
}

#nav a.router-link-exact-active {
  color: $primary;
}
</style>
