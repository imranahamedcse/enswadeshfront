<template>
  <div>
    <Header />
    <div class="bg-gray-5">
      <div class="max-w-screen-xl xl:px-10 px-2 m-auto">
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/Header.vue'
import Footer from '~/components/common/Footer.vue'

export default {
  components: {
    Header,
    Footer,
  },
}
</script>
