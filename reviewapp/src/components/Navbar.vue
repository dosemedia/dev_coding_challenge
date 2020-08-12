<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <img
          src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
          alt="Lightweight UI components for Vue.js based on Bulma"
        />
      </b-navbar-item>
    </template>
    <template class="is-primary" slot="start">
      <router-link class="navbar-item" to="/">Home</router-link>
      <router-link class="navbar-item" to="/about">About</router-link>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons">
          <a class="button is-primary">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light">Log in</a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<style lang="scss" scoped>
@import "../styles/_navigation.scss";
</style>