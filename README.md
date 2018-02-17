# DOSE Poll

> Polling app developed for DOSE full-stack developer challenge

![](https://i.imgur.com/jCYVfBh.png)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

You will need to locally install a recent version (^8.x.x) of [Node.js](https://nodejs.org/en/). If you wish to deploy to Firebase, you should set up a Firebase account. If you haven't installed the Firebase CLI tools, open a terminal and run

```bash
npm i -g firebase-tools
```

### Installing

In your desired directory, run:

```bash
git clone git@github.com:jameslave/dev_coding_challenge.git
cd dev_coding_challenge && npm i
npm start
```

The page should be visible at `http://localhost:8080`, with changes to code appearing live. Go ahead
and create an account, then create some polls!

## Deployment

Open the [Firebase console](https://console.firebase.google.com/u/0/) and create a new project. In the **Database** section, click **Try Firestore Beta**. Click **Enable**. Ensure the following is at the bottom of your HTML body:

```html
<script src="https://www.gstatic.com/firebasejs/4.10.0/firebase.js"></script>
    <script src="https://www.gstatic.com/firebasejs/4.9.1/firebase-firestore.js"></script>
<script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
  };
  firebase.initializeApp(config);
  const db = firebase.firestore();
</script>
```

You will also need to change `.firebaserc` to include:

```json
{
  "projects": {
    "default": "<PROJECT_ID>"
  }
}

```

`firebase.json` is already configured to serve the `/dist` directory and to handle `vue-router`'s history mode, so if all has gone well, you only need to run:

```bash
npm run build && firebase deploy
```

Your deployed app should be available at `https://<PROJECT_ID>.firebaseapp.com/auth`.

## Built With

* [Vue.js](https://vuejs.org/) - The progressive JavaScript framework
* [Bulma](https://bulma.io/) - Free and open source CSS framework based on Flexbox
* [Firebase](https://firebase.google.com/) - Google's mobile and web application development platform

## Authors

* **[James Lave](https://jameslave.com)** - Implementation
* **Aaron Blondeau** - Project requirements and inital commits

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

