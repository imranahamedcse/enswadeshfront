<template>
  <div>
    <div class="md:py-6 py-4">
      <p class="md:h1 h2">Here's what's in your bag.</p>
      <div class="grid md:grid-cols-3 md:gap-12 mb-8">
        <div v-if="products.length > 0" class="md:col-span-2 overflow-x-scroll">
          <table class="w-full mt-2">
            <thead class="font-bold">
              <tr>
                <th><div class="w-64">Product</div></th>
                <th><div class="w-20">Price</div></th>
                <th><div class="w-20">Quantity</div></th>
                <th>
                  <div class="w-40">
                    Subtotal <span class="text-gray-4">(vat inc.)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(product, i) in products"
                :key="i"
                class="border-t border-gray-3"
              >
                <td>
                  <div class="my-1">
                    <div class="flex md:flex-row flex-col">
                      <img
                        class="w-16 h-16 mr-2"
                        :src="
                          product.thumbnail
                            ? basePath + '/storage/' + product.thumbnail
                            : require(`~/assets/img/products/default.png`)
                        "
                        alt=""
                      />
                      <p>
                        <span class="">{{ product.name }}</span
                        ><br /><span class="text-gray-4"
                          >{{ product.count }} PCS</span
                        >
                        <br /><span v-if="product.size" class="text-gray-4"
                          >Size: {{ product.size }}</span
                        >
                        <br /><span v-if="product.weight" class="text-gray-4"
                          >Weight: {{ product.weight }}</span
                        >
                      </p>
                    </div>

                    <div class="flex gap-2 mb-2">
                      <button
                        @click="removeProduct(product.id)"
                        class="focus:outline-none border-2 rounded border-gray-3 py-1 px-2 font-medium"
                      >
                        Remove
                      </button>
                      <button
                        class="focus:outline-none border-2 rounded border-gray-3 py-1 px-2 font-medium"
                      >
                        <i class="ri-heart-line"></i>
                      </button>
                    </div>
                  </div>
                </td>
                <td class="font-semibold text-orange-1">
                  ৳ {{ product.price }}
                </td>
                <td>
                  <div
                    class="flex justify-between w-20 rounded border border-gray-3 mr-2 my-1"
                  >
                    <button
                      @click="
                        removeItemQtn(
                          product,
                          product.count,
                          product.size,
                          product.weight
                        )
                      "
                      class="focus:outline-none bg-gray-3 rounded-l flex items-center justify-center px-1"
                    >
                      <i class="ri-subtract-line"></i>
                    </button>
                    <p>{{ product.count }}</p>
                    <button
                      @click="
                        addItemQtn(
                          product,
                          product.count,
                          product.size,
                          product.weight
                        )
                      "
                      class="focus:outline-none bg-gray-3 rounded-r flex items-center justify-center px-1"
                    >
                      <i class="ri-add-fill"></i>
                    </button>
                  </div>
                </td>
                <td class="font-semibold text-orange-1">
                  ৳ {{ product.price * product.count }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="md:col-span-2">
          <img class="m-auto h-64" src="~/assets/img/empty.png" alt="Image" />
          <p class="font-bold text-center">
            Your shopping bag is currently empty
          </p>
        </div>
        <div class="mt-6">
          <p class="font-bold text-lg">Summary</p>
          <table class="w-full">
            <tr>
              <td class="text-gray-4 mt-2">Subtotal ({{ totalCount }})</td>
              <td class="text-right mt-2">৳ {{ totalPrice }}</td>
            </tr>
            <tr>
              <td class="text-gray-4 mt-2">Shipping Fee</td>
              <td class="text-right mt-2">৳ 50</td>
            </tr>
            <tr>
              <td>
                <input
                  class="input-field focus:outline-none mt-2"
                  type="text"
                  placeholder="Enter Coupon Code"
                />
              </td>
              <td class="text-right">
                <button class="bg-orange-1 rounded text-white py-1 px-3 mt-2">
                  Apply
                </button>
              </td>
            </tr>
            <tr>
              <td><p class="mt-2">Total</p></td>
              <td class="text-right mt-2">৳ {{ totalPrice + 50 }}</td>
            </tr>
          </table>

          <n-link
            to="/checkout"
            class="py-1 block text-center font-bold bg-green-3 border rounded my-4"
            >Checkout Securly</n-link
          >

          <n-link to="/shop" class="text-center font-bold text-blue-1 block"
            >Continue Shopping</n-link
          >

          <div class="border-t border-gray-4 my-3"></div>

          <div class="flex justify-between">
            <p class="font-bold">Payment Method</p>
            <div class="flex gap-1">
              <span class="w-8 h-6 bg-gray-3"></span>
              <span class="w-8 h-6 bg-gray-3"></span>
              <span class="w-8 h-6 bg-gray-3"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import _ from 'lodash'
import { mapActions, mapGetters } from 'vuex'
export default {
  middleware: ['auth'],
  data() {
    return {
      basePath: null,
      qtn: 0,
    }
  },

  mounted() {
    this.addToBuy()
    this.basePath = this.$axios.defaults.baseURL
  },

  methods: {
    // add to addtobag option
    ...mapActions({
      addProduct: 'addtobag/addProduct',
      productRemove: 'addtobag/productRemove',
    }),

    addToBuy() {
      var productsadd = localStorage.getItem('addproducts')
        ? JSON.parse(localStorage.getItem('addproducts'))
        : []
      for (let index = 0; index < this.addproducts.length; index++) {
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
  },

  computed: {
    ...mapGetters({
      addproducts: 'addtobag/addproducts',
    }),

    products() {
      return this.addproducts
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
