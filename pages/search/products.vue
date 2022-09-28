<template>
  <div>
    <p class="text-2xl font-bold">Products search result</p>
    <div
      v-if="products.data ? products.data.length > 0 : 0"
      class="grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-3 pt-6 pb-12"
    >
      <div
        class="mb-8 cursor-pointer"
        v-for="(product, i) in products.data"
        :key="i"
      >
        <div @click="showModal(product)" class="cursor-pointer h-full mb-10">
          <div class="h-full">
            <div class="">
              <img
                class="h-52 w-full"
                :src="
                  product.thumbnail
                    ? basePath + '/storage/' + product.thumbnail
                    : require(`~/assets/img/products/default.png`)
                "
                alt="Image"
              />
            </div>
            <p class="font-bold pt-2">{{ product.name }}</p>
            <p class="">{{ product.color }}</p>
            <p class="font-bold">{{ product.price }} BDT</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1 class="text-3xl font-bold text-center text-red-400">
        No result found!
      </h1>
    </div>
    <!-- Product Details -->
    <product-details
      v-if="modal"
      :product="productm"
      :basePath="basePath"
      v-on:product-modal="closeModal($event)"
    ></product-details>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProductDetails from '~/components/product-details/Product-details.vue'
export default {
  components: {
    ProductDetails,
  },

  data() {
    return {
      productm: {},
      cols: 'lg:grid-cols-4',
      modal: false,
      imageUrl: this.$axios.imageURL,
      basePath: null,
    }
  },

  created() {
    this.loadSearch()
  },

  mounted() {
    this.basePath = this.$axios.defaults.baseURL
  },

  methods: {
    ...mapActions('search', ['loadSearch']),
    showModal(product) {
      this.productm = Object.assign({}, product)
      this.modal = true
    },
    closeModal(e) {
      this.modal = e
    },
  },

  computed: {
    ...mapGetters({
      products: 'search/result',
      isLoading: 'search/isLoading',
    }),
  },
}
</script>
