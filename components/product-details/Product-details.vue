<template>
  <div>
    <div
      @click="closeModal"
      class="fixed inset-0 z-50 flex flex-col justify-center items-center py-12"
    >
      <div
        @click="wait"
        class="max-w-screen-sm shadow-lg bg-white overflow-auto"
      >
        <div class="grid sm:grid-cols-2 gap-6 md:p-6 p-2">
          <div class="sm:hidden w-full text-right">
            <button @click="closeModal" class="text-2xl focus:outline-none">
              <i class="ri-close-line"></i>
            </button>
          </div>
          <div class="">
            <div class="relative pb-full">
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
            <div class="grid grid-cols-4 gap-2 mt-2">
              <div
                class="relative pb-3/4"
                v-for="(photo, i) in product.image"
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
          <div class="">
            <div class="hidden sm:contents w-full text-right">
              <button @click="closeModal" class="text-2xl focus:outline-none">
                <i class="ri-close-line"></i>
              </button>
            </div>
            <p class="font-bold md:text-2xl text-xl mb-2">{{ product.name }}</p>
            <div class="flex items-center gap-8">
              <p class="bg-green-4 px-2 py-1 text-white inline">
                4.5<i class="ri-star-fill ml-2 text-yellow-2"></i>
              </p>
              <!-- <p class="font-semibold text-blue-1 cursor-pointer">Rate this product</p> -->
            </div>
            <table class="w-full mt-4">
              <tbody>
                <tr>
                  <td>Price:</td>
                  <td
                    v-if="sizePrice || weightPrice || product.discount_price"
                    class="font-semibold"
                  >
                    <span
                      >{{
                        sizePrice
                          ? sizePrice
                          : weightPrice
                          ? weightPrice
                          : product.discount_price
                      }}
                      {{ product.currency_type }}</span
                    >
                    <span
                      v-if="product.discount"
                      class="text-gray-4 ml-4 line-through"
                      >{{ product.price }} {{ product.currency_type }}</span
                    >
                  </td>
                  <td
                    v-if="product.lowsizeprice && !sizePrice"
                    class="font-semibold"
                  >
                    <span>{{ product.lowsizeprice.price }}</span>
                    <span
                      v-if="product.discount"
                      class="text-gray-4 ml-4 line-through"
                      >{{ product.price }} {{ product.currency_type }}</span
                    >
                  </td>
                  <td
                    v-if="product.lowweightprice && !weightPrice"
                    class="font-semibold"
                  >
                    <span>{{ product.lowweightprice.price }}</span>
                    <span
                      v-if="product.discount"
                      class="text-gray-4 ml-4 line-through"
                      >{{ product.price }} {{ product.currency_type }}</span
                    >
                  </td>
                </tr>
                <tr v-if="product.sizes ? product.sizes.length > 0 : 0">
                  <td>Stock:</td>
                  <td
                    v-if="product.lowsizeprice.stocks > 0 || sizeStocks > 0"
                    class="font-semibold"
                  >
                    Available
                  </td>
                  <td v-else class="text-red-500 font-semibold">Unavailable</td>
                </tr>
                <tr
                  v-else-if="product.weights ? product.weights.length > 0 : 0"
                >
                  <td>Stock:</td>
                  <td
                    v-if="product.lowweightprice.stocks > 0 || weightStocks > 0"
                    class="font-semibold"
                  >
                    Available
                  </td>
                  <td v-else class="text-red-500 font-semibold">Unavailable</td>
                </tr>
                <tr v-else>
                  <td>Stock:</td>
                  <td v-if="product.stocks > 0" class="font-semibold">
                    Available
                  </td>
                  <td v-else class="text-red-500 font-semibold">Unavailable</td>
                </tr>
                <tr>
                  <td>Brand:</td>
                  <td class="font-semibold">
                    {{ product.brand ? product.brand.name : '' }}
                  </td>
                </tr>
                <tr>
                  <td>SKU:</td>
                  <td class="font-semibold">{{ product.sku }}</td>
                </tr>
                <tr
                  class="my-3"
                  v-if="product.sizes ? product.sizes.length > 0 : 0"
                >
                  <td>Select Size:</td>
                  <td>
                    <span v-for="(size, k) in product.sizes" :key="k">
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
                  v-if="product.weights ? product.weights.length > 0 : 0"
                >
                  <td>Select Weight:</td>
                  <td>
                    <span v-for="(weight, l) in product.weights" :key="l">
                      <span
                        @click="selectWeight(weight)"
                        :class="
                          weight.weight == selectedWeight ? 'bg-green-3' : ''
                        "
                        class="p-1 text-center cursor-pointer border mr-3"
                      >
                        {{ weight.weight }}
                      </span>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-if="product.offers">
              <p class="font-semibold mt-4">Available Offers</p>
              <ul>
                <li>
                  <p>{{ product.offers }}</p>
                </li>
              </ul>
            </div>
            <p class="font-semibold mt-4 mb-2">Quantity</p>
            <div class="grid grid-cols-2 gap-2 mb-2">
              <div
                class="grid grid-cols-4 rounded border border-gray-3 font-bold"
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
                v-if="product.product_type === 'simple'"
                @click="addToBuy(product, quantity)"
                class="border bg-green-3 border-gray-2 rounded py-1 w-full font-bold text-center"
              >
                Buy now
              </button>
              <button
                v-if="product.product_type === 'size_base'"
                @click="addToBuy(product, quantity)"
                class="border bg-green-3 border-gray-2 rounded py-1 w-full font-bold text-center"
              >
                Buy now
              </button>
              <button
                v-if="product.product_type === 'weight_base'"
                @click="addToBuy(product, quantity)"
                class="border bg-green-3 border-gray-2 rounded py-1 w-full font-bold text-center"
              >
                Buy now
              </button>
            </div>
            <div class="flex gap-2 justify-between">
              <button
                v-if="product.product_type === 'simple'"
                @click="addToBag(product, quantity)"
                class="focus:outline-none border rounded border-gray-3 py-1 font-bold w-full"
              >
                Add to bag
              </button>
              <button
                v-if="product.product_type === 'size_base'"
                @click="addToBag(product, quantity)"
                class="focus:outline-none border rounded border-gray-3 py-1 font-bold w-full"
              >
                Add to bag
              </button>
              <button
                v-if="product.product_type === 'weight_base'"
                @click="addToBag(product, quantity)"
                class="focus:outline-none border rounded border-gray-3 py-1 font-bold w-full"
              >
                Add to bag
              </button>
              <button
                v-if="product.can_bargain"
                class="focus:outline-none border rounded border-gray-3 py-1 font-bold w-full"
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
                @click="requestWishlistProduct(product.id)"
                v-if="$auth.loggedIn"
                :disabled="proWishlist || wishlistCheck ? true : false"
                :class="
                  proWishlist == null && wishlistCheck == null
                    ? ' focus:outline-none border rounded border-gray-3 py-1 font-bold px-2'
                    : ' focus:outline-none border rounded border-gray-3 py-1 font-bold px-2 text-red-500'
                "
              >
                <i class="ri-heart-line"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="border-t text-gray-3 mt-4 mx-2 py-6 text-center">
          <n-link
            :to="{
              name: 'product-slug-id',
              params: { slug: product.slug, id: product.id },
            }"
            class="border rounded border-gray-3 py-1 font-bold text-green-4 p-8"
            >Show More Details</n-link
          >
        </div>
      </div>
    </div>
    <div
      @click="closeModal"
      class="opacity-50 fixed inset-0 z-40 bg-green-4"
    ></div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  data() {
    return {
      close_modal: 'closeModal',
      quantity: 1,
      selectedSize: null,
      selectedWeight: null,
      sizePrice: '',
      sizeStocks: '',
      weightPrice: '',
      weightStocks: '',
      wishlistCheck: null,
    }
  },
  props: ['basePath', 'product'],
  mounted() {
    this.checkWishlist()
  },
  methods: {
    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
      removeProduct: 'addtobag/removeProduct',
      wishlistProduct: 'wishlist/wishlistProduct',
    }),
    requestWishlistProduct(id) {
      this.$axios
        .get('api/wishlist-request/' + id)
        .then((response) => {
          this.wishlistProduct(this.product.id)
          loader.hide()
          this.$toast.success('Add to wishlist!')
        })
        .catch((error) => {
          loader.hide()
          this.$toast.error('Oops..!-' + error.response.data.message)
        })
    },
    async checkWishlist() {

      await this.$axios
        .$get('/api/wishlist-check-by-product/' + this.product.id)
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

    closeModal() {
      if (this.close_modal == 'closeModal') {
        this.$emit('product-modal', false)
      }
    },
    wait() {
      this.close_modal = 'wait'
      setTimeout(() => (this.close_modal = 'closeModal'), 500)
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
  },

  computed: {
    ...mapGetters({
      addproducts: 'addtobag/addproducts',
      productWishlist: 'wishlist/product',
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

    proWishlist() {
      return this.productWishlist
    },
  },
}
</script>
