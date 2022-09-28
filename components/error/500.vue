
<template>
  <div class="error-500 error-page">
      <h1> Opps Something Went Wrong</h1>
      <p>Our Team will fix this soon</p>
      <nuxt-link class="text-indigo-700" to="/">Back To Home</nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'error-500',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>


