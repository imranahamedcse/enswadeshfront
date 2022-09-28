<template>
  <div>
    <div class="add_loader" v-if="isLoading">
      <div class="main-loader"><loader></loader></div>
    </div>

    <div class="min-h-screen">
      <!-- Breadcrumbs -->
      <breadcrumb :breadCrumbs="breadCrumbs"></breadcrumb>

      <div class="grid sm:grid-cols-2 sm:gap-8 py-4">
        <div class="">
          <p class="title">Contact Information</p>
          <div class="px-2 py-4">
            <label for="phone" class="font-semibold">Mobile phone number</label>
            <input
              id="phone"
              type="number"
              v-model="phone_number"
              class="input-field focus:outline-none mt-1 mb-4"
              placeholder="Type your mobile phone number"
            />
          </div>
          <!-- Shipping Billing Address Input -->
          <div>
            <p class="title">Shipping Address</p>
            <div class="px-2 py-4">
              <label for="name" class="font-semibold">Your name</label>
              <input
                id="name"
                type="text"
                v-model="shipping_name"
                class="input-field focus:outline-none mb-2 mt-1"
                placeholder="Type your name"
              />

              <label for="email" class="font-semibold">Your email</label>
              <input
                id="email"
                v-model="shipping_email"
                type="email"
                class="input-field focus:outline-none mb-2 mt-1"
                placeholder="Type your Email"
              />

              <label for="region" class="font-semibold">Region</label>
              <input
                id="region"
                v-model="region"
                type="text"
                class="input-field focus:outline-none mb-2 mt-1"
                placeholder="Type your Region"
              />
              <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                <option value="" selected disabled>Select your region</option>
                <option value="">...</option>
                <option value="">...</option>
                <option value="">...</option>
              </select> -->

              <label for="city" class="font-semibold">City</label>
              <input
                id="city"
                v-model="city"
                type="text"
                class="input-field focus:outline-none mb-2 mt-1"
                placeholder="Type your City"
              />
              <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                <option value="" selected disabled>Select your city</option>
                <option value="">...</option>
                <option value="">...</option>
                <option value="">...</option>
              </select> -->

              <label for="area" class="font-semibold">Area</label>
              <input
                id="area"
                v-model="area"
                type="text"
                class="input-field focus:outline-none mb-2 mt-1"
                placeholder="Type your Area"
              />
              <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                <option value="" selected disabled>Select your area</option>
                <option value="">...</option>
                <option value="">...</option>
                <option value="">...</option>
              </select> -->

              <label for="address" class="font-semibold">Address</label>
              <input
                id="address"
                type="text"
                v-model="address"
                class="border border-gray-3 rounded focus:outline-none px-2 py-1 mt-1 w-full"
                placeholder="Flat# 3B, Floor# 2nd, House#23, Road#1A"
              />
            </div>
            <p class="title">Billing Address</p>
            <div class="p-2 my-2">
              <div class="flex items-center">
                <input
                  @click="closeAnotherAddress"
                  class="mr-2 w-4 h-4"
                  type="radio"
                  name="bill"
                  id="shipping"
                  checked
                />
                <label for="shipping">Same as the shipping address</label>
              </div>
              <div class="flex items-center">
                <input
                  @click="anotherAddress"
                  class="mr-2 w-4 h-4"
                  type="radio"
                  name="bill"
                  id="another"
                />
                <label for="another">Bill to the another address</label>
              </div>
            </div>

            <div class="" v-if="billAddress">
              <div class="px-2 pb-4">
                <label for="name" class="font-semibold">Your name</label>
                <input
                  id="name"
                  type="text"
                  v-model="billing_name"
                  class="input-field focus:outline-none mb-2 mt-1"
                  placeholder="Type your name"
                />

                <label for="email" class="font-semibold">Your email</label>
                <input
                  id="email"
                  type="email"
                  v-model="billing_email"
                  class="input-field focus:outline-none mb-2 mt-1"
                  placeholder="Type your email"
                />

                <label for="region" class="font-semibold">Region</label>
                <input
                  id="region"
                  v-model="billing_region"
                  type="text"
                  class="input-field focus:outline-none mb-2 mt-1"
                  placeholder="Type your Region"
                />
                <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                  <option value="" selected disabled>Select your region</option>
                  <option value="">...</option>
                  <option value="">...</option>
                  <option value="">...</option>
                </select> -->

                <label for="region" class="font-semibold">City</label>
                <input
                  id="city"
                  v-model="billing_city"
                  type="text"
                  class="input-field focus:outline-none mb-2 mt-1"
                  placeholder="Type your City"
                />
                <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                  <option value="" selected disabled>Select your city</option>
                  <option value="">...</option>
                  <option value="">...</option>
                  <option value="">...</option>
                </select> -->

                <label for="area" class="font-semibold">Area</label>
                <input
                  id="area"
                  v-model="billing_area"
                  type="text"
                  class="input-field focus:outline-none mb-2 mt-1"
                  placeholder="Type your Area"
                />
                <!-- <select id="region" class="input-field focus:outline-none mb-2 mt-1">
                  <option value="" selected disabled>Select your area</option>
                  <option value="">...</option>
                  <option value="">...</option>
                  <option value="">...</option>
                </select> -->

                <label for="address" class="font-semibold">Address</label>
                <input
                  id="address"
                  v-model="billing_address"
                  type="text"
                  class="border border-gray-3 rounded focus:outline-none px-2 py-1 mt-1 w-full"
                  placeholder="Flat# 3B, Floor# 2nd, House#23, Road#1A"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <!-- Order summary -->
          <div>
            <p class="title">Order Summary</p>
            <div class="grid p-2">
              <div class="overflow-x-scroll">
                <table class="w-full">
                  <thead>
                    <tr class="font-semibold">
                      <td><div class="w-64">Product</div></td>
                      <td><div class="w-20">Quantity</div></td>
                      <td><div class="w-20">Price</div></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(product, i) in products"
                      :key="i"
                      class="border-t border-gray-3"
                    >
                      <td>
                        <div class="flex my-1">
                          <img
                            class="w-12 h-12 mr-2"
                            :src="
                              product.thumbnail
                                ? basePath + '/storage/' + product.thumbnail
                                : require(`~/assets/img/products/default.png`)
                            "
                            alt=""
                          />
                          <p>
                            <span class="font-semibold">{{
                              product.name
                            }}</span>
                          </p>
                        </div>
                      </td>
                      <td>
                        <p>{{ product.count }}</p>
                      </td>
                      <td>{{ product.price * product.count }}</td>
                    </tr>
                    <tr class="border-t border-gray-3">
                      <td colspan="2" class="text-gray-2">
                        <p class="mt-2">Subtotal ({{ totalCount }} items)</p>
                      </td>
                      <td>
                        <p class="mt-2">৳ {{ totalPrice }}</p>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="text-gray-2">
                        <p class="mb-2">Shipping Fee</p>
                      </td>
                      <td><p class="mb-2">৳ 50</p></td>
                    </tr>
                    <tr class="border-t border-b border-gray-3 font-semibold">
                      <td colspan="2"><p class="my-2">Total</p></td>
                      <td>
                        <p class="my-2">৳ {{ totalPrice + 50 }}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <p class="title">Select Payment Methods</p>
          <div class="p-2">
            <div class="flex items-center">
              <input
                class="mr-2 w-4 h-4"
                v-model="payment_gateway"
                value="cod"
                type="radio"
                name="payment_gateway"
                id="cash"
                checked
              />
              <label for="cash">Cash on delivery</label>
            </div>
            <!-- <div class="flex items-center">
              <input
                class="mr-2 w-4 h-4"
                type="radio"
                name="payment"
                id="bkash"
              />
              <label for="bkash">bKash</label>
            </div>
            <div class="flex items-center">
              <input
                class="mr-2 w-4 h-4"
                type="radio"
                name="payment"
                id="rocket"
              />
              <label for="rocket">Rocket</label>
            </div>
            <div class="flex items-center">
              <input
                class="mr-2 w-4 h-4"
                type="radio"
                name="payment"
                id="geteway"
              />
              <label for="geteway">Payment gateway</label>
            </div> -->
          </div>
          <!-- <n-link to="/order-complete" class="bg-green-3 btn block" >Place Order</n-link> -->
          <div class="flex justify-center mt-4">
            <button class="bg-green-3 btn block" @click="addOrder">
              Place Order
            </button>
          </div>
        </div>
      </div>

      <!-- Login Modal -->
      <!-- <login
      v-if="loginModal"
      v-on:closeLoginModal="closeLoginModal()"
      v-on:openRegistrationModal="openRegistrationModal()"
    ></login> -->

      <!-- Registration Modal -->
      <!-- <registration
      v-if="registrationModal"
      v-on:closeRegistrationModal="closeRegistrationModal()"
      v-on:openLoginModal="openLoginModal()"
    ></registration> -->
    </div>
  </div>
</template>
<script>
import Breadcrumb from '~/components/common/Breadcrumb.vue'
import Loader from '~/components/lib/Loader.vue'
// import Login from '~/components/auth/Login.vue'
// import Registration from '~/components/auth/Registration.vue'
// import OrderSummary from '../components/cart/Order-summary.vue'
// import ShippingBillingAddressInput from '../components/cart/Shipping-billing-address-input.vue'
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'

export default {
  middleware: ['auth'],

  data() {
    return {
      isLoading:false,
      basePath: null,
      qtn: 0,
      customer: '',
      loginModal: false,
      registrationModal: false,
      areas: '',
      cities: '',
      billAddress: false,
      shop_id: '',
      phone_number: '',
      shipping_fee: 50,
      shipping_name: '',
      shipping_email: '',
      region: '',
      city: '',
      area: '',
      address: '',
      billing_name: '',
      billing_email: '',
      billing_region: '',
      billing_city: '',
      billing_area: '',
      billing_address: '',
      payment_gateway: 'cod',

      breadCrumbs: [
        { title: 'Shopping bag', url: '/cart' },
        { title: 'Checkout', url: '' },
      ],
    }
  },
  components: {
    Breadcrumb,
    Loader
    // Login,
    // Registration,
    // OrderSummary,
    // ShippingBillingAddressInput,
  },
  mounted() {
    this.addToBuy()
    this.basePath = this.$axios.defaults.baseURL
    // this.loadShippingUser()
    this.loadArea()
    this.loadCities()
    ;(this.phone_number = this.$auth.user.phone_number),
      (this.shipping_name = this.$auth.user.name)
    this.shipping_email = this.$auth.user.email
    this.region = this.$auth.user.profile?.region
    this.city = this.$auth.user.profile?.city
    this.area = this.$auth.user.profile?.area
    this.address = this.$auth.user.profile?.address
  },
  methods: {
    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
      productRemove: 'addtobag/productRemove',
      cartRemove: 'addtobag/allProductRemoveCart',
    }),

    addToBuy() {
      var productsadd = localStorage.getItem('addproducts')
        ? JSON.parse(localStorage.getItem('addproducts'))
        : []
      for (let index = 0; index < productsadd.length; index++) {
        const item = productsadd[index]
        const qtn = productsadd[index].count
        const size = productsadd[index].size
        const weight = productsadd[index].weight
        this.addProduct({ item, qtn, size, weight })
      }
    },

    addItemQtn(item, qt, size, weight) {
      console.log(qt)
      const qtn = qt + 1
      this.addProduct({ item, qtn, size, weight })
    },
    removeItemQtn(item, qt, size, weight) {
      const qtn = qt - 1
      this.addProduct({ item, qtn, size, weight })
    },

    removeProduct(id) {
      this.productRemove(id)
    },

    // showLoginModal() {
    //   this.loginModal = true
    // },
    // closeLoginModal() {
    //   this.loginModal = false
    // },
    // openRegistrationModal() {
    //   this.loginModal = false
    //   this.registrationModal = true
    // },
    // closeRegistrationModal() {
    //   this.registrationModal = false
    // },
    // openLoginModal() {
    //   this.loginModal = true
    //   this.registrationModal = false
    // },
    // async loadShippingUser() {
    //   await this.$axios.$get('/api/orders/shipping-address').then((res) => {
    //     this.customer = res.data
    //     console.log(this.customer)
    //   })
    // },
    async loadArea() {
      await this.$axios.$get('/api/areas').then(
        function (response) {
          this.areas = response.data
        }.bind(this)
      )
    },
    async loadCities() {
      await this.$axios.$get('/api/cities').then(
        function (response) {
          this.cities = response.data
        }.bind(this)
      )
    },
    anotherAddress() {
      this.billAddress = true
    },
    closeAnotherAddress() {
      this.billAddress = false
    },

    async addOrder() {
      this.isLoading = true
      var formData = new FormData()

      formData.append('shop_id', this.shopId)
      formData.append('customer_id', this.$auth.user.id)
      formData.append('total_quantity', this.totalCount)
      formData.append('total_price', this.totalPrice + this.shipping_fee)
      formData.append('sub_total_price', this.totalPrice)
      formData.append('shipping_fee', this.shipping_fee)
      formData.append('shipping_email', this.shipping_email)
      formData.append('shipping_phone', this.phone_number)
      formData.append('shipping_name', this.shipping_name)
      formData.append('shipping_region', this.region)
      formData.append('shipping_city', this.city)
      formData.append('shipping_area', this.area)
      formData.append('shipping_address', this.address)
      formData.append('billing_email', this.billing_email)
      formData.append('billing_name', this.billing_name)
      formData.append('billing_region', this.billing_region)
      formData.append('billing_city', this.billing_city)
      formData.append('billing_area', this.billing_area)
      formData.append('billing_address', this.billing_address)
      formData.append('payment_gateway', this.payment_gateway)

      // prodcuts
      for (let i = 0; i < this.products.length; i++) {
        for (let key of Object.keys(this.products[i])) {
          formData.append(`products[${i}][${key}]`, this.products[i][key])
        }
      }

      await this.$axios
        .post('/api/orders/storeOrder', formData)
        .then((response) => {
          this.isLoading = false
          this.$toast.success('Order Placed Successfully !')
          this.cartRemove()
          this.$router.push('/order-complete')
        })
        .catch((error) => {
          if (error.response.status == 404) {
            this.$nuxt.error({ statusCode: 404, message: 'err message' })
          }
        })
    },
  },
  computed: {
    ...mapGetters({
      addproducts: 'addtobag/addproducts',
    }),

    products() {
      return this.addproducts
    },
    shopId() {
      return this.addproducts[0].shop_id
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
