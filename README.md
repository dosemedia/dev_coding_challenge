# dose-news-poll

This is a live opinion poll widget built with Vue.js with a Firebase backend. It is designed to be embedded within sites as an iframe. 

## Features
- Re-orderable list of options
-- Live update of re-order
- iframe embeddable
- Live update of poll results

## Installation
Install both the backend and frontend, respectively:

### Firebase
Create account at [Google Firebase](https://firebase.google.com/)

Create a project

Under Authentication > Sign-In Method, enable Email/Password

Under Database > Data, add an object called "Polls"

Under Database > Rules, change `".read"` to `true` and `".write"` to `true`

In the upper left corner, click "Web Setup" and copy everything within `var config` and paste this into `var config` in `/src/firebase.js`


### Build Setup

The following requires npm and Node.js. If you do not have those, find a guide for your OS.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
