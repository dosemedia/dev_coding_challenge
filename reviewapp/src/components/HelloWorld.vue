<template>
  <section class="wrapper">
    <b-field label="Simple">
      <b-slider v-model="value"></b-slider>
    </b-field>

    <b-field label="Disabled">
      <b-slider :value="30" disabled></b-slider>
    </b-field>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: 5,
    };
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/index.scss";
</style>
