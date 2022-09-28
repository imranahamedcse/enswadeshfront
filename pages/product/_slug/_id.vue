<template>
  <div>
    <!-- Breadcrumbs -->
    <!-- <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb> -->

    <!-- Product Details -->
    <div class="grid sm:grid-cols-7 lg:gap-12 md:gap-4 sm:gap-2 py-4">
      <div class="sm:col-span-2">
        <div class="relative pb-full">
          <img
            class="absolute h-full w-full object-cover"
            :src="
              getProduct.thumbnail
                ? basePath + '/storage/' + getProduct.thumbnail
                : require(`~/assets/img/products/default.png`)
            "
            alt="Image"
          />
        </div>

        <div class="grid grid-cols-4 gap-2 mt-2">
          <div
            class="relative pb-3/4"
            v-for="(photo, i) in getProduct.image"
            :key="i"
          >
            <img
              class="absolute h-full w-full object-cover"
              :src="
                photo.src
                  ? basePath + '/storage/' + photo.src
                  : require(`~/assets/img/products/default.png`)
              "
              alt=""
            />
          </div>
        </div>
      </div>
      <div class="sm:col-span-3 sm:mt-0 mt-4">
        <p class="font-bold md:text-2xl text-xl mb-2">{{ getProduct.name }}</p>
        <div class="flex items-center gap-8">
          <p class="bg-green-4 px-2 py-1 text-white inline">
            4.5<i class="ri-star-fill ml-2 text-yellow-2"></i>
          </p>
          <p @click="ratingModal" class="font-semibold text-blue-1 cursor-pointer">Rate this product</p>
        </div>
        <table class="w-full mt-4">
          <tbody>
            <tr>
              <td>Price:</td>
              <td
                v-if="sizePrice || weightPrice || getProduct.discount_price"
                class="font-semibold"
              >
                <span
                  >{{
                    sizePrice
                      ? sizePrice
                      : weightPrice
                      ? weightPrice
                      : getProduct.discount_price
                  }}
                  {{ getProduct.currency_type }}</span
                >
                <span
                  v-if="getProduct.discount"
                  class="text-gray-4 ml-4 line-through"
                  >{{ getProduct.price }} {{ getProduct.currency_type }}</span
                >
              </td>
              <td
                v-if="getProduct.lowsizeprice && !sizePrice"
                class="font-semibold"
              >
                <span>{{ getProduct.lowsizeprice.price }}</span>
                <span
                  v-if="getProduct.discount"
                  class="text-gray-4 ml-4 line-through"
                  >{{ getProduct.price }} {{ getProduct.currency_type }}</span
                >
              </td>
              <td
                v-if="getProduct.lowweightprice && !weightPrice"
                class="font-semibold"
              >
                <span>{{ getProduct.lowweightprice.price }}</span>
                <span
                  v-if="getProduct.discount"
                  class="text-gray-4 ml-4 line-through"
                  >{{ getProduct.price }} {{ getProduct.currency_type }}</span
                >
              </td>
            </tr>
            <tr v-if="getProduct.sizes ? getProduct.sizes.length : 0 > 0">
              <td>Stock:</td>
              <td
                v-if="getProduct.lowsizeprice.stocks > 0 || sizeStocks > 0"
                class="font-semibold"
              >
                Available
              </td>
              <td v-else class="text-red-500 font-semibold">Unavailable</td>
            </tr>
            <tr
              v-else-if="getProduct.weights ? getProduct.weights.length : 0 > 0"
            >
              <td>Stock:</td>
              <td
                v-if="
                  getProduct.lowweightprice
                    ? getProduct.lowweightprice.stocks
                    : 0 > 0 || weightStocks > 0
                "
                class="font-semibold"
              >
                Available
              </td>
              <td v-else class="text-red-500 font-semibold">Unavailable</td>
            </tr>
            <tr v-else>
              <td>Stock:</td>
              <td v-if="getProduct.stocks > 0" class="font-semibold">
                Available
              </td>
              <td v-else class="text-red-500 font-semibold">Unavailable</td>
            </tr>
            <tr>
              <td>Brand:</td>
              <td class="font-semibold">
                {{ getProduct.brand ? getProduct.brand.name : '' }}
              </td>
            </tr>
            <tr>
              <td>SKU:</td>
              <td class="font-semibold">{{ getProduct.sku }}</td>
            </tr>
            <tr
              class="my-3"
              v-if="getProduct.sizes ? getProduct.sizes.length : 0 > 0"
            >
              <td>Select Size:</td>
              <td>
                <span v-for="(size, k) in getProduct.sizes" :key="k">
                  <span
                    @click="selectSize(size)"
                    :class="size.size == selectedSize ? 'bg-green-3' : ''"
                    class="p-1 text-center cursor-pointer border mr-3"
                  >
                    {{ size.size }}
                  </span>
                </span>
              </td>
            </tr>
            <tr
              class="my-3"
              v-if="getProduct.weights ? getProduct.weights.length : 0 > 0"
            >
              <td>Select Weight:</td>
              <td>
                <span v-for="(weight, l) in getProduct.weights" :key="l">
                  <span
                    @click="selectWeight(weight)"
                    :class="weight.weight == selectedWeight ? 'bg-green-3' : ''"
                    class="p-1 text-center cursor-pointer border mr-3"
                  >
                    {{ weight.weight }}
                  </span>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="getProduct.offers">
          <p class="font-semibold mt-4">Available Offers</p>
          <ul>
            <li>
              <p>{{ getProduct.offers }}</p>
            </li>
          </ul>
        </div>
        <p class="font-semibold mt-4 mb-2">Quantity</p>

        <div class="grid grid-cols-2 gap-3 mb-3">
          <div
            class="grid grid-cols-4 rounded border border-gray-3 font-semibold"
          >
            <button
              @click="minus"
              class="focus:outline-none bg-gray-3 rounded-l text-xl flex items-center justify-center"
            >
              <i class="ri-subtract-line"></i>
            </button>
            <div class="col-span-2 text-center py-1">
              {{ quantity }}
            </div>
            <button
              @click="plus"
              class="focus:outline-none bg-gray-3 rounded-r text-xl flex items-center justify-center"
            >
              <i class="ri-add-fill"></i>
            </button>
          </div>
          <button
            v-if="getProduct.product_type === 'simple'"
            @click="addToBuy(getProduct, quantity)"
            class="border bg-green-3 border-gray-2 rounded py-1 w-full font-semibold text-center"
          >
            Buy now
          </button>
          <button
            v-if="getProduct.product_type === 'size_base'"
            @click="addToBuy(getProduct, quantity)"
            class="border bg-green-3 border-gray-2 rounded py-1 w-full font-semibold text-center"
          >
            Buy now
          </button>
          <button
            v-if="getProduct.product_type === 'weight_base'"
            @click="addToBuy(getProduct, quantity)"
            class="border bg-green-3 border-gray-2 rounded py-1 w-full font-semibold text-center"
          >
            Buy now
          </button>
        </div>
        <div class="flex gap-3 justify-between">
          <button
            v-if="getProduct.product_type === 'simple'"
            @click="addToBag(getProduct, quantity)"
            class="focus:outline-none border rounded border-gray-3 py-1 font-semibold w-full"
          >
            Add to bag
          </button>
          <button
            v-if="getProduct.product_type === 'size_base'"
            @click="addToBag(getProduct, quantity)"
            class="focus:outline-none border rounded border-gray-3 py-1 font-semibold w-full"
          >
            Add to bag
          </button>
          <button
            v-if="getProduct.product_type === 'weight_base'"
            @click="addToBag(getProduct, quantity)"
            class="focus:outline-none border rounded border-gray-3 py-1 font-semibold w-full"
          >
            Add to bag
          </button>
          <button
            v-if="getProduct.can_bargain"
            @click="bargainModal"
            class="focus:outline-none border rounded border-gray-3 py-1 font-semibold w-full"
          >
            Bargain
          </button>
          <a
            href="javascript:void(0);"
            @click="wishlistLogin"
            v-if="!$auth.loggedIn"
            class="focus:outline-none border rounded border-gray-3 py-1 font-bold px-2"
            ><i class="ri-heart-line"></i
          ></a>

          <button
            @click="requestWishlistProduct(getProduct.id)"
            v-if="$auth.loggedIn"
            :disabled="disable"
            :class="
              wishlistCheck == null
                ? ' focus:outline-none border rounded border-gray-3 py-1 font-bold px-2'
                : ' focus:outline-none border rounded border-gray-3 py-1 font-bold px-2 text-red-500'
            "
          >
            <i class="ri-heart-line"></i>
          </button>
        </div>
        <p class="font-semibold text-purple-2 mt-4">
            {{getProduct.delivery_offer ? getProduct.delivery_offer : ''}}
        </p>
      </div>
      <div class="sm:col-span-2 sm:mt-0 mt-4">
        <div v-if="getProduct.audio ? getProduct.audio.length : 0 > 0">
          <p class="font-bold">Audio Description</p>
          <div class="flex items-center">
            <i class="ri-play-circle-fill mr-2 text-orange-1 text-xl"></i>
            <audio controls>
              <source
                type="audio/mpeg"
                :src="basePath + '/storage/' + getProduct.audio[0].src"
              />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
        <div v-if="getProduct.video_url">
          <p class="font-bold mt-4">Video Description</p>
          <div class="border-2 border-green-4">
            <iframe
              width="300"
              height="250"
              :src="getProduct.video_url"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <button
          class="block font-semibold py-2 bg-blue-2 text-white rounded w-full mt-4 focus:outline-none"
        >
          <a class="flex items-center justify-center" :href="'https://www.facebook.com/sharer/sharer.php?u=https://www.project.projectswadesh.com/product/'+ getProduct.slug + '/' + getProduct.id + '&display=popup'" target="_blank">
            <i class="ri-facebook-fill mr-2"></i>
            Share on Facebook
          </a>
        </button>
        <button
          class="block font-semibold py-2 bg-blue-1 text-white rounded w-full mt-4 focus:outline-none"
        >
          <a class="flex items-center justify-center" :href="'https://twitter.com/intent/tweet?url=https://www.project.projectswadesh.com/product/'+ getProduct.slug + '/' + getProduct.id + '&text=' + getProduct.name" target="_blank">
            <i class="ri-twitter-fill mr-2"></i>
            Share on Twitter
          </a>
        </button>
      </div>
    </div>
    <div class="border-t text-gray-3 mb-4"></div>

    <!-- Tabs -->
    <tab :showTab="showTab" :tabs="tabs"></tab>

    <!-- Similar Product -->
    <similar-product></similar-product>

    <!-- Bargain modal -->
    <bargain v-if="bargain" v-on:bargainModal="bargainModal"></bargain>

    <!-- Rating modal -->
    <rating v-if="modal" v-on:ratingModal="ratingModal"></rating>
  </div>
</template>
<script>
import _ from 'lodash'
//import Breadcrumb from '~/components/common/Breadcrumb.vue'
import Tab from '~/components/common/Tab.vue'
import Bargain from '~/components/product-details/Bargain.vue'
import SimilarProduct from '~/components/product-details/Similar-product.vue'
import { mapActions, mapGetters } from 'vuex'
import Rating from '~/components/product-details/Rating.vue'

export default {
  components: {
    //Breadcrumb,
    Tab,
    Bargain,
    SimilarProduct,
    Rating,
  },
  data() {
    return {
      modal: false,
      basePath: this.$axios.defaults.baseURL,
      // getProduct: {},
      quantity: 1,
      wishlistCheck: null,
      disable: false,
      bargain: false,
      photos: ['img-6', 'img-1', 'img-2', 'img-3'],
      // breadCrumbs: [
      //   { title: 'Home', url: '/' },
      //   { title: '...', url: '' },
      //   { title: '', url: '' },
      //   { title: '', url: '' },
      // ],

      showTab: 'Information',
      tabs: [
        { name: 'Information', view: 'Information' },
        { name: 'Features', view: 'Features' },
        { name: 'Reviews', view: 'Reviews' },
      ],
      products: [
        { name: 'Product name gose here', color: 'Red', price: '1200' },
        { name: 'Product name gose here', color: 'Red', price: '1200' },
        { name: 'Product name gose here', color: 'Red', price: '1200' },
        { name: 'Product name gose here', color: 'Red', price: '1200' },
      ],
      selectedSize: null,
      selectedWeight: null,
      sizePrice: '',
      sizeStocks: '',
      weightPrice: '',
      weightStocks: '',
    }
  },

  mounted() {
    //this.getBreadCrumbItems()
    this.checkWishlist()
    this.getSingleProduct()
  },
  methods: {

    ratingModal(){
      this.modal = !this.modal;
    },


    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
      removeProduct: 'addtobag/removeProduct',
    }),

    requestWishlistProduct(id) {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        zIndex: 2000,
        opacity: 0.5,
      })
      this.$axios
        .get('api/wishlist-request/' + id)
        .then((response) => {
          this.checkWishlist()
          loader.hide()
          this.$toast.success('Add to wishlist!')
        })
        .catch((error) => {
          loader.hide()
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async checkWishlist() {
      let loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
        zIndex: 2000,
        opacity: 2,
      })
      // simulate AJAX

      await this.$axios
        .$get('/api/wishlist-check-by-product/' + this.$route.params.id)
        .then((res) => {
          this.wishlistCheck = res.data
          loader.hide()
          if (this.wishlistCheck != null) {
            this.disable = true
          }
        })
        .catch((error) => {
          loader.hide()
        })
    },
    wishlistLogin() {
      this.$router.push({ name: 'login' })
    },
    bargainModal() {
      this.bargain = !this.bargain
    },

    async getSingleProduct() {
      await this.$store.dispatch(
        'products/getSingleProduct',
        this.$route.params.id
      )
    },

    plus() {
      this.quantity++
    },
    minus() {
      if (this.quantity > 0) this.quantity--
    },
    selectSize(size) {
      this.selectedSize = size.size
      this.sizePrice = size.price
      this.sizeStocks = size.stocks
      // alert(size.size)
    },
    selectWeight(weight) {
      this.selectedWeight = weight.weight
      this.weightPrice = weight.price
      this.weightStocks = weight.stocks
    },

    // add to buy option
    addToBuy(item, qtn, size = null, weight = null) {
      var item = Object.assign(item, { qtn: qtn })
      if (item.product_type === 'simple') {
        if (qtn > 0) {
          this.addProduct({ item, qtn, size, weight })
          this.$router.push({ name: 'cart' })
          this.$toast.success('Product add to buy successfullay add!')
        } else {
          this.$toast.error('Please seleted quantity this product!')
        }
      }
      if (item.product_type === 'size_base') {
        var price = this.sizePrice
        var stocks = this.sizeStocks
        var item = Object.assign(item, {
          qtn: qtn,
          price: price,
          stocks: stocks,
        })
        if (this.selectedSize != null) {
          var size = this.selectedSize
          if (qtn > 0) {
            this.addProduct({ item, qtn, size, weight })
            this.$router.push({ name: 'cart' })
            this.$toast.success('Product add to buy successfullay add!')
          } else {
            this.$toast.error('Please seleted quantity this product!')
          }
        } else {
          this.$toast.error('Please seleted first Size!')
        }
      }
      if (item.product_type === 'weight_base') {
        var price = this.weightPrice
        var stocks = this.weightStocks
        var item = Object.assign(item, {
          qtn: qtn,
          price: price,
          stocks: stocks,
        })
        if (this.selectedWeight != null) {
          var weight = this.selectedWeight
          if (qtn > 0) {
            this.addProduct({ item, qtn, size, weight })
            this.$router.push({ name: 'cart' })
            this.$toast.success('Product add to buy successfullay add!')
          } else {
            this.$toast.error('Please seleted quantity this product!')
          }
        } else {
          this.$toast.error('Please seleted first Weight!')
        }
      }
    },

    // add to bag option
    addToBag(item, qtn, size = null, weight = null) {
      var item = Object.assign(item, { qtn: qtn })
      if (item.product_type === 'simple') {
        if (qtn > 0) {
          this.addProduct({ item, qtn, size, weight })
          this.$toast.success('Product add to bag successfullay add!')
        } else {
          this.$toast.error('Please seleted quantity this product!')
        }
      }
      if (item.product_type === 'size_base') {
        var price = this.sizePrice
        var stocks = this.sizeStocks
        var item = Object.assign(item, {
          qtn: qtn,
          price: price,
          stocks: stocks,
        })
        if (this.selectedSize != null) {
          var size = this.selectedSize
          if (qtn > 0) {
            this.addProduct({ item, qtn, size, weight })
            this.$toast.success('Product add to bag successfullay add!')
          } else {
            this.$toast.error('Please seleted quantity this product!')
          }
        } else {
          this.$toast.error('Please seleted first Size!')
        }
      }
      if (item.product_type === 'weight_base') {
        var price = this.weightPrice
        var stocks = this.weightStocks
        var item = Object.assign(item, {
          qtn: qtn,
          price: price,
          stocks: stocks,
        })
        if (this.selectedWeight != null) {
          var weight = this.selectedWeight
          if (qtn > 0) {
            this.addProduct({ item, qtn, size, weight })
            this.$toast.success('Product add to bag successfullay add!')
          } else {
            this.$toast.error('Please seleted quantity this product!')
          }
        } else {
          this.$toast.error('Please seleted first Weight!')
        }
      }
    },

    removeFromCart(item) {
      this.removeProduct(item)
    },

    removeProductAll(id) {
      this.allProductRemove(id)
    },

    // getBreadCrumbItems() {
    //   this.breadCrumbs[1].url = localStorage.getItem('market-url')
    //   this.breadCrumbs[2].title = localStorage.getItem('shop')
    //   this.breadCrumbs[2].url = localStorage.getItem('shop-url')
    //   this.breadCrumbs[3].title = localStorage.getItem('product')
    // },
  },
  computed: {
    ...mapGetters({
      getProduct: 'products/getProduct',
      addproducts: 'addtobag/addproducts',
    }),

    checkShop() {
      return this.addproducts.length > 0 ? this.addproducts[0].shop_id : null
    },

    totalCount() {
      let sum = 0
      _.each(this.addproducts, (p) => {
        sum += p.count
      })
      return sum
    },

    totalPrice() {
      let sum = 0
      _.each(this.addproducts, (p) => {
        sum += p.count * p.price
      })
      return sum
    },
  },
}
</script>
