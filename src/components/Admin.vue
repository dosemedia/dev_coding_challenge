<template>
  <div>
    <Polls />
    <hr>
    <SignOut />
  </div>
</template>

<script>
import Polls from './Polls'
import SignOut from './SignOut'
export default {
  name: 'Admin',
  components: {
    Polls,
    SignOut
  }
}
</script>

<style>
</style>
