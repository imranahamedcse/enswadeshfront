<template>
  <div>
    <div v-if="!wishlist">
      <p class="title">My Wishlist</p>
      <div class="list-items-center">
        <div
          class="text-6xl w-32 h-32 mt-10 rounded-full bg-gray-3 text-gray-4 flex items-center justify-center"
        >
          <i class="ri-hearts-fill"></i>
        </div>
        <p class="h2 text-gray-4 mb-10">Your wishlist is empty</p>
      </div>
    </div>
    <div v-if="wishlist">
      <p class="title">My Wishlist (4)</p>
      <div class="bg-white p-4">
        <div v-for="(item, index) in items" :key="index">
          <div class="grid grid-cols-3 gap-4 items-center justify-center">
            <div class="pb-full relative">
              <img
                src="~/assets/img/products/default.png"
                alt="Image"
                class="absolute w-full h-full object-cover"
              />
            </div>
            <div>
              <p class="font-bold">Product name here</p>
              <p class="text-gray-2">Red</p>
              <p class="h3">1195 BDT</p>
              <div class="flex flex-col w-2/3">
                <button class="btn-border bg-green-3 focus:outline-none mt-4">
                  Buy now
                </button>
                <button class="btn-border focus:outline-none mt-4">
                  Add to bag
                </button>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <button class="focus:outline-none">
                <i class="ri-delete-bin-2-fill text-gray-4 text-2xl"></i>
              </button>
            </div>
          </div>
          <div class="divider my-4"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wishlists: {},
      wishlist: true,
      items: ['', '', '', ''],
    }
  },
  mounted() {
    this.wishList()
  },
  methods: {
    async wishList() {
      await this.$axios
        .get('api/wishlists')
        .then((response) => {
          this.wishlists = response.data.data
        })
        .catch((error) => {
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
  },
}
</script>
