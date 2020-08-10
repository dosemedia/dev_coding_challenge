<template>
  <section class="form">
    <b-field label="Name">
      <b-input v-model="formData.name" placeholder="Enter your name..."></b-input>
    </b-field>
    <b-field label="Select Device Variation">
      <b-select v-model="formData.deviceVariant" placeholder="Select a Device Variation" expanded>
        <option v-for="device in options" v-bind:key="device" :value="device">{{device}}</option>
      </b-select>
    </b-field>
    <b-field label="Message">
      <b-input
        v-model="formData.message"
        maxlength="500"
        type="textarea"
        placeholder="Write Review..."
      ></b-input>
    </b-field>
    <div class="block">
      <h3 class="title">Rating:</h3>
      <div class="starContainer">
        <div
          class="star"
          :id="`star_${star}`"
          v-on:click="rate"
          v-for="star in stars"
          v-bind:key="star"
        >
          <b-radio-button
            class="check"
            type="radio"
            :native-value="star"
            v-model="formData.rating"
            v-bind:star="star"
          />
          <label :for="star">
            <b-icon icon="star" size="is-large"></b-icon>
          </label>
        </div>
      </div>
    </div>
    <!-- <Upload /> -->
    <b-button
      v-on:click="submit"
      icon-left="check"
      size="is-medium"
      type="is-primary"
      expanded
    >Submit</b-button>
  </section>
</template>

<script>
// import Upload from "@/components/Upload.vue";
export default {
  components: {
    // Upload,
  },
  data() {
    return {
      stars: [5, 4, 3, 2, 1],
      formData: {
        name: "",
        deviceVariant: "",
        message: "",
        rating: "",
      },
      options: [
        "Charcoal Fabric",
        "Sandstone Fabric",
        "Black",
        "White",
        "Walnut Finish",
        "Heather Gray Fabric",
        "Oak Finish",
      ],
    };
  },
  methods: {
    submit() {
      console.log(this.formData);
    },
    rate(e) {
      // Variable Initialization
      const value = e.target.firstElementChild.value;
      let stars = [...document.getElementsByClassName("star")];
      let rating = document.getElementById(`star_${value}`);

      // Toggle rating selected class
      rating.classList.toggle("selected");

      // Check if other ratings have already been selected and remove selected class
      stars.forEach((element) => {
        if (element.className === "star selected" && element !== rating) {
          element.classList.remove("selected");
        }
      });
    },
  },
};
</script>