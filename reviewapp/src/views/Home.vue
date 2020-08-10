<template>
  <div class="home">
    <h2 class="title is-2">Amazon Alexa Review App</h2>
    <ReviewForm />
  </div>
</template>

<script>
// @ is an alias to /src
import ReviewForm from "@/components/ReviewForm.vue";

export default {
  name: "Home",
  components: {
    ReviewForm,
  },
};
</script>

<style lang="sass">
@import "../styles/index.scss"
</style>
