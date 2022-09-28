
<template>
  <div class="error-404 error-page">
      <h1> Page Not Found</h1>
      <p>The link you clicked on may be broken or no longer exist.</p>
      <nuxt-link class="text-indigo-700" to="/">Back To Home</nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'error-404',
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
};
</script>


