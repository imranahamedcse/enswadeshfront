<template>
  <div>
    <!-- All Markets -->
    <p class="text-2xl font-bold">Markets search result</p>
    <div
      v-if="markets.length > 0"
      :class="cols"
      class="grid grid-cols-2 lg:gap-6 sm:gap-3 gap-2 pt-6 pb-12"
    >
      <loader v-if="isLoading"></loader>
      <template v-else>
        <div v-for="(market, i) of markets" :key="i">
          <NuxtLink
            :to="{
              name: 'market-slug-id',
              params: { slug: market.slug, id: market.id },
            }"
          >
            <div
              class="md:border-2 border md:border-r-8 border-r-4 md:border-b-8 border-b-4 border-green-4 rounded-xl"
            >
              <div class="rounded-t-xl relative">
                <div class="rounded-t-xl relative pb-2/3">
                  <img
                    class="absolute h-full w-full object-cover rounded-t-xl"
                    :src="
                      market.icon
                        ? basePath + '/storage/' + market.icon
                        : require(`~/assets/img/default_market.png`)
                    "
                    alt="Image"
                  />
                  <p
                    class="absolute bottom-0 md:mb-2 md:ml-2 mb-1 ml-1 text-white bg-green-5 md:px-3 px-2 md:py-1 inline"
                  >
                    {{ market.shop_count }} Shops
                  </p>
                </div>
                <p class="font-bold md:p-3 p-2">{{ market.name }}</p>
              </div>
            </div>
          </NuxtLink>
        </div>
      </template>
    </div>
    <div v-else>
      <h1 class="font-bold text-center text-red-400">No result found!</h1>
    </div>
    <!-- End All Markets -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      basePath: null,
    }
  },

  props: ['cols', 'markets', 'isLoading'],

  mounted() {
    this.basePath = this.$axios.defaults.baseURL
  },
}
</script>
