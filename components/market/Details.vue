<template>
  <div>
    <div class="grid md:grid-cols-2">
      <div class="relative pb-1/2">
        <img
          class="absolute object-cover w-full h-full rounded-l-lg"
          :src="
            market.icon
              ? imagepath + '/storage/' + market.icon
              : require(`~/assets/img/default_market@2x.png`)
          "
          alt="Image"
        />
      </div>
      <div class="md:pl-3 w-full">
        <p class="lg:h2 h3">{{ market.name }}</p>
        <div class="flex justify-around gap-2 text-center font-semibold mt-4">
          <div class="bg-white rounded-md w-full p-2">
            <p>{{ market.shop_count }}</p>
            <p class="text-gray-2">Registered Shop</p>
          </div>
          <div class="bg-white rounded-md w-full p-2">
            <p>{{ market.total_floor }}</p>
            <p class="text-gray-2">Total floor</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['market', 'basePath'],
  data() {
    return {
      imagepath: this.$axios.defaults.baseURL,
    }
  },
}
</script>
