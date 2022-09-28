<template>
  <div>
    <!-- Breadcrumbs -->
    <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>

    <div class="lg:py-6 py-3 grid sm:grid-cols-2 gap-3">
      <!-- Shop thumbnail -->
      <shop-thumbnail :shop="shop" :basePath="basePath"></shop-thumbnail>
      <!-- Shop Details -->
      <shopDetails :shop="shop"></shopDetails>
    </div>
    <!-- Slider -->
    <slider
      :slider_images="slider_images"
      :basePath="basePath"
      class="my-4"
    ></slider>

    <div class="">
      <div class="py-5">
        <!-- Filter -->
        <!-- <dataFilter
          :filtersData="filtersCategory"
          :filterTitle="filterTitle"
          v-on:filterByData="loadProducts"
        /> -->
        <div class="">
          <!-- All Products -->
          <products
            :basePath="basePath"
            :products="products"
            :isLoading="isLoading"
          ></products>
          <!-- Paginate -->
          <div class="px-3 pb-8">
            <Paginate
              :totalPages="totalPages"
              :total="total"
              :currentPage="currentPage"
              :perPage="perPage"
              v-on:pagechanged="loadProductsPaginate"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import Slider from '~/components/shop/Slider.vue'
import ShopDetails from '~/components/shop/ShopDetails.vue'
import ShopThumbnail from '~/components/shop/ShopThumbnail.vue'
import DataFilter from '~/components/common/Filter.vue'
import Products from '~/components/shop/Products.vue'
import Paginate from '~/components/common/Paginate.vue'

export default {
  components: {
    Breadcrumb,
    Slider,
    ShopDetails,
    ShopThumbnail,
    DataFilter,
    Products,
    Paginate,
  },
  data() {
    return {
      basePath: this.$axios.defaults.baseURL,
      breadCrumbs: [
        { title: 'Home', url: '/' },
        { title: 'Go To Market', url: '/cities' },
        { title: '', url: '' },
        { title: '', url: '' },
        { title: '', url: '' },
        { title: '', url: '' },
      ],
      filterTitle: 'Categories',
      filtersCategory: [],
      shop: {},
      products: [],
      totalPages: 0,
      total: 0,
      currentPage: 0,
      perPage: 0,
      isLoading: true,
      slider_images: [],
    }
  },
  created() {
    this.loadCategory()
    this.loadProducts()
    this.loadProductsPaginate()
  },
  mounted() {
    // this.getBreadCrumbItems()
  },
  methods: {
    async loadCategory() {
      await this.$axios
        .get(
          this.$auth.isLoading ? '/api/categories/base' : '/api/base/categories'
        )
        .then((res) => {
          this.filtersCategory = res.data
        }),
        await this.$axios
          .get('/api/shops/' + this.$route.params.id)
          .then((res) => {
            this.shop = res.data.data
            this.slider_images = this.shop.shop_gallery
          })
    },

    async loadProducts(id, isLoading) {
      this.isLoading = isLoading
      await this.$axios
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
    async loadProductsPaginate(value) {
      await this.$axios
        .get(
          '/api/products-by-shop/' + this.$route.params.id + '?page=' + value
        )
        .then((res) => {
          this.products = res.data.data
          this.total = this.products.meta.total
          this.totalPages = this.products.meta.last_page
          this.currentPage = this.products.meta.current_page
          this.perPage = this.products.meta.per_page
          this.isLoading = false
        })
    },
    // getBreadCrumbItems() {
    //   this.breadCrumbs[2].title = localStorage.getItem('city')
    //   this.breadCrumbs[2].url = localStorage.getItem('city-url')
    //   this.breadCrumbs[3].title = localStorage.getItem('market')
    //   this.breadCrumbs[3].url = localStorage.getItem('market-url')
    //   this.breadCrumbs[4].title = localStorage.getItem('floor')
    //   this.breadCrumbs[4].url = localStorage.getItem('market-url')
    //   this.breadCrumbs[5].title = localStorage.getItem('shop')
    // },
  },
}
</script>
