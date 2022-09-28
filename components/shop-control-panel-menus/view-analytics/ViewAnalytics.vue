<template>
    <div>
        <div class="grid grid-cols-4 gap-4">
            <div class="bg-white flex flex-col items-center justify-center py-8">
                <p class="text-yellow-2 h3">
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-fill"></i>
                    <i class="ri-star-half-fill"></i>
                    (4.5)
                </p>
                <p class='text-gray-4'>Shop ratings</p>
            </div>
            <div class="bg-white flex flex-col items-center justify-center py-8">
                <p class="h3">{{countSubscribe}}</p>
                <p class='text-gray-4'>Total subscribers</p>
            </div>
            <div class="bg-white flex flex-col items-center justify-center py-8">
                <p class="h3">{{ visitor }}</p>
                <p class='text-gray-4'>Today's visitors</p>
            </div>
        </div>
        <div class="mt-4 p-4 bg-white">
            <p class="h2">Filter by date</p>
            <div class="w-1/4 mt-4">
                <input type="text" class="input-field focus:outline-none" placeholder="3/12/2021">
            </div>
            <div class="mt-4">
                <p class="warning-alart text-center">Chart show hear</p>
            </div>
        </div>
        <div class="mt-4 flex justify-center">
            <button class="btn-border bg-green-3 focus:outline-none">Grow your business</button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      countSubscribe: 0,
      visitor: '00',
    }
  },

  mounted(){
    this.loadCountSubscribe();
    this.visit();
  },

  methods:{
    async loadCountSubscribe()
    {
        await this.$axios.get(`/api/subscribe-count-by-shop/${this.$route.params.id}`)
      .then((response) => {
        this.countSubscribe = response.data.data;
      })
      .catch((error) => {
        if (error.response.status == 404) {
          this.$nuxt.error({ statusCode: 404, message: 'err message' })
        }
      })
    },
    visit(){
      this.$axios
      .get('/api/shops/today-visitors/' + this.$route.params.id)
      .then((res) => {
        this.visitor = res.data;
        // console.log(res.data);
      })
    }
  }
}
</script>
