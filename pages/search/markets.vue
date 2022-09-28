<template>
  <div>
    <markets
      :cols="cols"
      :markets="markets.data"
      :isLoading="isLoading"
    ></markets>
  </div>
</template>
<script>
import Markets from '~/components/markets/Market.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      cols: 'lg:grid-cols-4',
    }
  },

  components: {
    Markets,
  },

  created() {
    this.loadSearch()
  },
  methods: {
    ...mapActions('search', ['loadSearch']),
  },

  computed: {
    ...mapGetters({
      markets: 'search/result',
      isLoading: 'search/isLoading',
    }),
  },
}
</script>
