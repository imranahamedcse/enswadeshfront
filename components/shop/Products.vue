<template>
  <div>
    <!-- All Products -->
    <div class="flex md:flex-row flex-col md:justify-between">
      <p class="h2">All Products</p>
      <div class="search mb-4 md:mb-0">
        <i class="search-icon ri-search-line mr-2"></i>
        <input
          class="search-input focus:outline-none w-full"
          type="text"
          @keyup="getProductsSearchResults"
          v-model="keyword"
          placeholder="Search Products"
        />
      </div>
      <div>
        <dataFilter
          :filtersData="filtersCategory"
          :filterTitle="filterTitle"
          v-on:filterByData="loadProducts"
        />
      </div>
    </div>
    <loader v-if="isLoading"></loader>
    <div
      v-else
      class="grid lg:grid-cols-5 grid-cols-2 lg:gap-6 gap-3 pt-6 pb-12"
    >
      <div class="target-area" v-for="(product, i) in products.data" :key="i">
        <!-- <NuxtLink to="/"> -->
        <div
          @click="showModal(product, product.name, product.slug, product.id)"
          class="cursor-pointer h-full mb-10"
        >
          <div class="relative pb-full h-52">
            <img
              class="absolute h-full w-full object-cover"
              :src="
                product.thumbnail
                  ? basePath + '/storage/' + product.thumbnail
                  : require(`~/assets/img/products/default.png`)
              "
              alt="Image"
            />
          </div>
          <p class="font-semibold pt-2">{{ product.name }}</p>
          <p class="">{{ product.color }}</p>

          <p v-if="product.sizes.length > 0" class="font-bold">
            <span
              >{{ product.lowsizeprice ? product.lowsizeprice.price : '' }} -
              {{ product.highsizeprice ? product.highsizeprice.price : '' }}
              {{ product.currency_type }}</span
            >
          </p>

          <p v-else-if="product.weights.length > 0" class="font-bold">
            <span
              >{{ product.lowweightprice ? product.lowweightprice.price : '' }}
              -
              {{ product.highweightprice ? product.highweightprice.price : '' }}
              {{ product.currency_type }}</span
            >
          </p>

          <p v-else class="font-bold">
            <span
              >{{ product.discount_price }} {{ product.currency_type }}</span
            >
            <span v-if="product.discount" class="text-gray-4 ml-4 line-through"
              >{{ product.price }} {{ product.currency_type }}</span
            >
          </p>
        </div>
        <!-- <div class="hover-area-btns left-0 bottom-0 right-0">
          <div class="flex justify-between">
            <button
              @click="addToBuy(product)"
              class="btn bg-green-3 focus:outline-none"
            >
              Buy Now
            </button>
            <button
              @click="addToBag(product)"
              class="btn border-orange-1 bg-white focus:outline-none"
            >
              Add to bag
            </button>
          </div>
        </div> -->
      </div>
    </div>
    <!-- Product Details -->
    <product-details
      v-if="modal"
      :product="product"
      :basePath="basePath"
      v-on:product-modal="closeModal($event)"
    ></product-details>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
import ProductDetails from '~/components/product-details/Product-details.vue'
import DataFilter from '~/components/common/Filter.vue'

export default {
  props: ['basePath', 'products', 'isLoading'],

  data() {
    return {
      modal: false,
      imageUrl: this.$axios.imageURL,
      keyword: null,
      product: {},
      filterTitle: 'Categories',
      filtersCategory: [],
      isLoading: true,
    }
  },

  components: {
    ProductDetails,
    DataFilter,
  },

  created() {
    this.loadCategory()
    this.loadProducts()
  },

  methods: {
    async loadCategory() {
      this.$axios
        .get(
          this.$auth.isLoading ? '/api/categories/base' : '/api/base/categories'
        )
        .then((res) => {
          this.filtersCategory = res.data
        })
    },
     loadProducts(id, isLoading) {
      this.isLoading = isLoading
      this.$axios
        .get(
          id
            ? '/api/products-by-shop/category/' +
                this.$route.params.id +
                '/' +
                id
            : '/api/products-by-shop/' + this.$route.params.id
        )
        .then((res) => {
          this.products = res.data.data
          this.isLoading = false
        })
    },



    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
    }),

    showModal(product, name, slug, id) {
      this.product = Object.assign({}, product)
      this.modal = true
      localStorage.setItem('product', name)
      localStorage.setItem('product-url', '/product/' + slug + '/' + id)
    },
    closeModal(e) {
      this.modal = e
    },
    getProductsSearchResults: _.debounce(function (e) {
      this.$axios
        .post('/api/search/products/', {
          params: { keyword: this.keyword, id: this.$route.params.id },
        })
        .then((res) => {
          this.products = res.data.data
          this.total = this.products.meta.total
          this.totalPages = this.products.meta.last_page
          this.currentPage = this.products.meta.current_page
          this.perPage = this.products.meta.per_page
        })
    }, 500),

    // add to buy now option
    addToBuy(item, qtn = 1) {
      var item = Object.assign(item, { qtn: qtn })
      if (qtn > 0) {
        this.addProduct({ item, qtn })
        this.$router.push({ name: 'cart' })
      } else {
        this.$toast.error('Please seleted quantity this product!')
      }
    },

    addToBag(item, qtn = 1) {
      var item = Object.assign(item, { qtn: qtn })
      if (qtn > 0) {
        this.addProduct({ item, qtn })
      } else {
        this.$toast.error('Please seleted quantity this product!')
      }
    },
  },
}
</script>
