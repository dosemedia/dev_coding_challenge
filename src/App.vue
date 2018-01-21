<template>
  <div id="app">
    <div class="container">
      <navbar />
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  name: 'App',
  components: { Navbar }
}
</script>

<style>
</style>
