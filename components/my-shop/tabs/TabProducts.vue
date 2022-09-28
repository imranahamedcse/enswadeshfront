<template>
  <div>
    <!-- Products Section -->
    <div class="my-5">
      <!-- Filter -->
      <!-- <dataFilter
        :filtersData="filtersData"
        :filterTitle="filterTitle"
        v-on:filterByData="loadProducts"
      /> -->

      <div class="">
        <!-- Product tables -->
        <div class="flex md:flex-row flex-col justify-between font-bold mb-4">
          <div>
            <dataFilter
              :filtersData="filtersData"
              :filterTitle="filterTitle"
              v-on:filterByData="loadProducts"
            />
          </div>
          <div class="search my-4 md:my-0">
            <i class="search-icon ri-search-line mr-2"></i>
            <input
              class="search-input bg-gray-5 focus:outline-none"
              type="text"
              @keyup="getProductsSearchResults"
              v-model="keyword"
              placeholder="Search products"
            />
          </div>
          <n-link
            :to="{
              name: 'shop-product-add-id',
              params: { id: $route.params.id },
            }"
            class="btn-add focus:outline-none"
            >Add Product {{ $router.params }}</n-link
          >
        </div>
        <loader v-if="isLoading"></loader>
        <table v-else class="w-full text-left mb-6">
          <thead>
            <tr class="bg-green-1 h-10">
              <th>#</th>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>Size : Price</th>
              <th>Size : Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in products.data" :key="i">
              <td>{{ currentPage * 4 - 4 + i + 1 }}</td>
              <td>
                <img
                  class="w-12 h-12"
                  :src="item.thumbnail != null ? basepath + '/storage/' + item.thumbnail : require(`~/assets/img/products/default.png`)"
                  alt="Image"
                />
              </td>
              <td>{{ item.name }}</td>
              <!-- <td>{{ item.category.name }}</td> -->
              <td>Category Name here</td>
              <!-- <td>{{ item.price }}</td> -->
              <td v-if="item.sizes.length == 0 && item.weights.length == 0">
                {{ item.price }}
              </td>
              <td v-else-if="item.sizes.length > 0">
                <p v-for="(size, k) in item.sizes" :key="k">
                  <span class="font-bold">{{ size.size }}:</span>  {{ size.price }}
                </p>
              </td>
              <td v-else-if="item.weights.length > 0">
                <p v-for="(weight, l) in item.weights" :key="l">
                  <span class="font-bold">{{ weight.weight }}:</span>  {{ weight.price }}
                </p>
              </td>
              <!-- <td>{{ item.stocks}}</td> -->
              <td v-if="item.sizes.length == 0 && item.weights.length == 0">
                {{ item.stocks }}
              </td>
              <td v-else-if="item.sizes.length > 0">
                <p v-for="(size, m) in item.sizes" :key="m">
                  <span class="font-bold">{{ size.size }}:</span>  {{ size.stocks }}
                </p>
              </td>
              <td v-else-if="item.weights.length > 0">
                <p v-for="(weight, n) in item.weights" :key="n">
                  <span class="font-bold">{{ weight.weight }}:</span>  {{ weight.stocks }}
                </p>
              </td>
              <td>
                <div class="dropdown">
                  <i
                    class="dropbtn border rounded p-2 ri-arrow-down-s-fill"
                  ></i>
                  <div class="dropdown-content font-semibold w-56">
                    <nuxt-link :to="`/shop/product/edit/${item.id}`"
                      ><p>Edit</p></nuxt-link
                    >
                    <p @click="moveTrash(item)">Move to trash</p>
                    <p @click="notify(item)">Notify to subscribers</p>
                    <p @click="flashSale(item)">Add to flash sales</p>
                    <p @click="addFestival(item)">Add to festival</p>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- End Product tables -->

        <move-trash
          :product="product"
          v-if="move"
          v-on:moveTrash="moveTrash()"
        ></move-trash>
        <notify :product="product" v-if="notification" v-on:notify="notify()"></notify>
        <flash-sale :product="product" v-if="flash" v-on:flashSale="flashSale()"></flash-sale>
        <festival :product="product" v-if="festival" v-on:addFestival="addFestival()"></festival>

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
        <!-- End Paginate -->
      </div>
    </div>
    <!-- End Products Section -->
  </div>
</template>
<script>
import _ from 'lodash'
import DataFilter from '~/components/common/Filter.vue'
import Paginate from '~/components/common/Paginate.vue'
import Loader from '~/components/lib/Loader.vue'
import MoveTrash from '~/components/my-shop/options/modals/MoveTrash.vue'
import Notify from '~/components/my-shop/options/modals/Notify.vue'
import FlashSale from '~/components/my-shop/options/modals/FlashSale.vue'
import Festival from '~/components/my-shop/options/modals/Festival.vue'

export default {
  components: {
    Paginate,
    DataFilter,
    Loader,
    MoveTrash,
    Notify,
    FlashSale,
    Festival,
  },
  data() {
    return {
      filterTitle: 'Categories',
      filtersData: [],
      totalPages: 0,
      total: 0,
      currentPage: 0,
      perPage: 0,
      products: [],
      keyword: '',
      isLoading: true,
      move: false,
      notification: false,
      flash: false,
      festival: false,
      product: '',
      basepath: this.$axios.defaults.baseURL,
    }
  },

  mounted() {
    this.loadCategories()
    this.loadProducts()
    this.loadProductsPaginate()
  },

  methods: {
    moveTrash(product) {
      this.product = product
      this.loadProducts()
      this.move = !this.move
    },
    notify(product) {
      this.product = product
      this.notification = !this.notification
    },
    flashSale(product) {
      this.product = product
      this.flash = !this.flash
    },
    addFestival(product) {
      this.product = product
      this.festival = !this.festival
    },

    async loadCategories() {
      await this.$axios
        .get(
          this.$auth.isLoading ? '/api/categories/base' : '/api/base/categories'
        )
        .then((res) => {
          this.filtersData = res.data
        })
        .catch((error) => {
          console.log(error)
        })
    },

    async loadProducts(id, isLoading) {
      this.isLoading = isLoading
      await this.$axios
        // .get(id ? '/api/products-by-shop/category/' + this.$route.params.id + '/' + id : '/api/products-by-shop/' + this.$route.params.id)
        .get('/api/products-by-shop/' + this.$route.params.id)
        .then((res) => {
          this.products = res.data.data
          // console.log(this.products);
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

    getProductsSearchResults: _.debounce(function (e) {
      this.isLoading = true
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
          this.isLoading = false
        })
    }, 500),
  },
}
</script>
