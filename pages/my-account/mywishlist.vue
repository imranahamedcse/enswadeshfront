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
      <p class="title">My Wishlist ({{ wishlists.length }})</p>
      <div class="bg-white p-4">
        <div v-for="(wishlist, i) in wishlists" :key="i">
          <div
            class="grid md:grid-cols-3 grid-cols-1 gap-4 items-center justify-center"
          >
            <div class="pb-full relative">
              <img
                :src="
                  wishList.product_of_wishlist &&
                  wishList.product_of_wishlist.thumbnail
                    ? basePath +
                      '/storage/' +
                      wishList.product_of_wishlist.thumbnail
                    : require(`~/assets/img/products/default.png`)
                "
                alt="Image"
                class="absolute w-full h-full object-cover"
              />
            </div>
            <div>
              <p class="font-bold">{{ wishlist.product_of_wishlist.name }}</p>
              <p class="h3">
                {{ wishlist.product_of_wishlist.price }}
                {{ wishlist.product_of_wishlist.currency_type }}
              </p>
              <div class="flex md:flex-col flex-row md:w-2/3">
                <button
                  class="btn-border bg-green-3 focus:outline-none mt-4 w-full md:mr-0 mr-2"
                >
                  Buy now
                </button>
                <button class="btn-border focus:outline-none mt-4 w-full">
                  Add to bag
                </button>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <button
                class="focus:outline-none"
                @click="removeWishlist(wishlist.user_id)"
              >
                <i class="ri-delete-bin-2-fill text-gray-4 text-2xl"></i>
              </button>
            </div>
          </div>
          <div class="divider my-4"></div>
        </div>
      </div>
    </div>
    <remove-wishlist
      v-if="remove"
      v-on:closeModal="closeModal()"
      v-on:yesRemove="yesRemove()"
    ></remove-wishlist>
  </div>
</template>
<script>
import RemoveWishlist from '~/components/my-account/modals/RemoveWishlist.vue'
export default {
  data() {
    return {
      wishlists: [],
      removeWishlistid: '',
      remove: false,
      confirmRemove: false,
      wishlist: true,
      image: '',
    }
  },
  mounted() {
    this.wishList()
  },
  components: {
    RemoveWishlist,
  },
  methods: {
    removeWishlist(id) {
      this.removeWishlistid = id
      if (this.confirmRemove == true) {
        this.$axios
          .get('api/wishlist/' + id)
          .then((response) => {
            this.$toast.success('Remove successfully !')
            this.removeWishlistid = ''
            this.confirmRemove = false
            this.wishList()
          })
          .catch((error) => {
            this.$toast.error('Oops..!-' + error.response.data.message)
          })
      } else this.remove = true
    },
    yesRemove() {
      this.confirmRemove = true
      this.removeWishlist(this.removeWishlistid)
      this.remove = false
    },
    closeModal() {
      this.remove = false
    },
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
