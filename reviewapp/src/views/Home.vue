<template>
  <div class="home">
    <h2 class="title is-2">Amazon Alexa Review App</h2>
    <ReviewForm />
    <Upload msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import Upload from "@/components/Upload.vue";
import ReviewForm from "@/components/ReviewForm.vue";

export default {
  name: "Home",
  components: {
    Upload,
    ReviewForm,
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/index.scss"
</style>
