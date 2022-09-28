<template>
    <div>
        <show :contribution="contribution" :isLoading="isLoading"></show>
    </div>
</template>
<script>
import Show from '~/components/contributions/Show.vue'
export default {
    components: {
      Show,
    },
    data() {
      return {
        contribution:{},
        isLoading: true,
      }
    },
    mounted(){
      this.loadContribution()
    },
    methods: {
      async loadContribution() {
        await this.$axios
          .get('/api/contribution/' + this.$route.params.id)
          .then((res) => {
            this.contribution = res.data.data
            this.isLoading = false;
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.$nuxt.error({ statusCode: 404, message: 'err message' })
              this.isLoading = false;
            }
          })
      },
  },

}
</script>
